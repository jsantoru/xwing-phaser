var Ship = function(shipId) {
    // constructor
    console.log("Ship.constructor(), shipId: " + shipId);
    
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
    var config = new Config().ships[shipId];

    this.imagePath = config.imagePath;
    this.height = config.height;
    this.width = config.width;
    
    this.refcardImagePath = config.refcardImagePath;
    this.dial = new Dial(config.dial);
    this.actions = config.dial;
    this.pilot;
    this.upgradeCards;
    
    console.log("Tie directions: " + this.dial.getDirections());
    console.log("Tie straight distances: " + this.dial.getDistances("straight"));
}

Ship.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    
    var _this = this;
    
    // TODO: should this be an html template?
    $('#board').prepend('<div id="shipDiv" class="shipDiv"><img id="ship" class="ship" src="' + this.imagePath + '"/></img>');
    $('#shipDiv').height(this.height).width(this.width);
    this.move(x, y);
    
    // add the click handler when the ship is added to the board
    $('#shipDiv').click(function() {
        var $ship = $(this);
        $ship.toggleClass("shipSelected");
    });
}

Ship.prototype.move = function(x, y) {
    console.log("move()");
    
    this.x = x;
    this.y = y;
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    $('#shipDiv').css("top", yPixels);
    $('#shipDiv').css("left", xPixels);
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
    $('#shipDiv').rotate(this.rotation);
    
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
