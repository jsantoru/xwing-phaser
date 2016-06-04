var Ship = function(shipType, shipName) {
    // constructor
    console.log("Ship.constructor(), shipType: " + shipType);
    
    // TODO: assign uuid to this ship and add to div id as well
    
    /* 
     * state
     */
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.direction = "up";
    
    /*
     * config
     */
    var config = new Config().ships[shipType];

    this.imagePath = config.imagePath;
    this.height = config.height;
    this.width = config.width;
    
    this.refcardImagePath = config.refcardImagePath;
    this.dial = new Dial(config.dial);
    this.stats = config.stats;
    this.actions = config.actions;
    
    /*
     * instance specific config
     */
    this.pilot;
    this.upgradeCards;
    
    this.isSelected = false;
    this.shipName = shipName;
}

Ship.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    var _this = this;
    
    // TODO: should this be an html template?
    $('#board').prepend('<div id="shipDiv-' + _this.shipName + '" class="shipDiv"><img id="ship" class="ship" src="' + this.imagePath + '"/></img>');
    $('#shipDiv-' + _this.shipName).height(this.height).width(this.width);
    this.move(x, y);
    
    // add the click handler when the ship is added to the board
    $('#shipDiv-' + _this.shipName).click(function() {
        _this.toggleSelect();
    });
}

Ship.prototype.toggleSelect = function() {
    var _this = this;   
    var $ship = $('#shipDiv-' + _this.shipName)
    $ship.toggleClass("shipSelected");
        
        // setup the dial now that this ship is selected
        _this.dial.setupDial($ship.hasClass("shipSelected"));
        
        // set ship ref
        if($ship.hasClass("shipSelected")) {
            // set this ship as selected
            _this.isSelected = true;
            console.log("SELECTED: " + _this.shipName);
            
            // setup the shipRef
            $('#refCardImg').attr('src', _this.refcardImagePath);
            $('#refCardImg').show();
            
            $('#shipRefAttackVal').text(_this.stats.attack);
            $('#shipRefAgilityVal').text(_this.stats.agility);
            $('#shipRefHullVal').text(_this.stats.hull);
            $('#shipRefShieldVal').text(_this.stats.shield);
            $('#stats').show();
            
            $.each(_this.actions, function(index, element) {
                $('#actions').append("<h4><span class=\"label label-default\">" + element + "</span></h4>")
            });
            $('#actions').show();
            
        } 
        // ship is not selected, clear out the ship ref
        else {
            _this.isSelected = false;
            
            $('#refCardImg').hide();
            $('#refCardImg').attr('src', '');
            
            $('#shipRefAttackVal').text("");
            $('#shipRefAgilityVal').text("");
            $('#shipRefHullVal').text("");
            $('#shipRefShieldVal').text("");
            $('#stats').hide();
            
            $('#actions').empty();
            $('#actions').hide();
        }
}

Ship.prototype.buildActionsValue = function(value, actionsList) {
    if($.inArray(value, actionsList) !== -1) {
        return "Yes";
    }
    return "No";
}

Ship.prototype.move = function(x, y) {
    console.log("move()");
    var _this = this;
    
    _this.x = x;
    _this.y = y;
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    // TODO: need to create the ships with the id
    $('#shipDiv-' + _this.shipName).css("top", yPixels);
    $('#shipDiv-' + _this.shipName).css("left", xPixels);
}

Ship.prototype.moveWithTemplate = function(moveTemplate) {
    console.log("moveWithTemplate");
    console.log("ship direction: " + this.direction);
    
    var x; 
    var y;
    
    // the offset for the template to be in the middle of the ship base
    var offset = this.width/4;
    
    if(this.direction == "up") {
        if(moveTemplate.type == "straight") {
            x = this.x;
            y = this.y - moveTemplate.height - this.height;
        } 
        else if(moveTemplate.type == "right") {
            x = this.x + moveTemplate.width + offset;
            y = this.y - moveTemplate.height - offset;
        } 
        else if(moveTemplate.type == "left") {
            x = this.x - moveTemplate.width - offset;
            y = this.y - moveTemplate.height - offset;
        }
    }
    else if(this.direction == "down") {
        if(moveTemplate.type == "straight") {
            x = this.x;
            y = this.y + moveTemplate.height + this.height;
        }
        else if(moveTemplate.type == "right") {
            x = this.x - moveTemplate.width - offset;
            y = this.y + moveTemplate.height + offset;
        }
        else if(moveTemplate.type == "left") {
            x = this.x + moveTemplate.width + offset;
            y = this.y + moveTemplate.height + offset;
        }
    }
    else if(this.direction == "right") {
        if(moveTemplate.type == "straight") {
            x = this.x + moveTemplate.height + this.height;
            y = this.y;
        }
        else if(moveTemplate.type == "right") {
            x = this.x + moveTemplate.height + offset;
            y = this.y + moveTemplate.width + offset;
        }
        else if(moveTemplate.type == "left") {
            x = this.x + moveTemplate.height + offset;
            y = this.y - moveTemplate.width - offset;
        }
    }
    else if(this.direction == "left") {
        if(moveTemplate.type == "straight") {
            x = this.x - moveTemplate.height - this.height;
            y = this.y;
        }
        else if(moveTemplate.type == "right") {
            x = this.x - moveTemplate.height - offset;
            y = this.y - moveTemplate.height - offset;
        }
        else if(moveTemplate.type == "left") {
            x = this.x - moveTemplate.height - offset;
            y = this.y + moveTemplate.height + offset;
        }
    }
    
    // move the ship
    this.move(x, y);
    
    // turn the ship (if necessary -- rotation will be 0 for straight moves)
    this.turn(moveTemplate.endRotation);
}

Ship.prototype.turn = function(degrees) {
    console.log("turn()");
    this.rotation += degrees;
    
    if(this.rotation >= 360) {
        this.rotation = this.rotation - 360;
    }
    console.log("rotation: " + this.rotation);
    $('#shipDiv-' + this.shipName).rotate(this.rotation);
    
    // set the direction based on the rotation
    if(this.rotation == 0) {
        this.direction = "up";
    } 
    else if(this.rotation == 90) {
        this.direction = "right";
    }
    else if(this.rotation == 180) {
        this.direction = "down";
    }
    else if(this.rotation == 270) {
        this.direction = "left";
    }
}
