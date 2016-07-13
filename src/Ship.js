var Ship = function(shipType, shipName) {
    // constructor
    console.log("Ship.constructor(), shipType: " + shipType + ", shipName: " + shipName);
    
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
    
    this.firingArc = new FiringArc();
    
    /*
     * instance specific config
     */
    this.pilot;
    this.pilotSkill;
    this.upgradeCards;
    
    this.shipName = shipName;
    this.shipType = shipType;
    
    /* 
     * state
     */
    this.isSelected = false;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.direction = "up";
    
    this.movedThisRound = false;
    this.attackedThisRound = false;
    this.shieldRemaining = config.stats.shield;
    this.hullRemaining = config.stats.hull;
    this.numFocusTokens = 0;
    this.numStressTokens = 0;
    this.numEvadeTokens = 0;
    this.outgoingTargetLocks = [];
    this.incomingTargetLocks = [];
}

Ship.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    var _this = this;
    
    $('#board').prepend('<div id="shipDiv-' + _this.shipName + '" class="shipDiv"><img id="ship" class="ship" src="' + this.imagePath + '"/></img>');
    $('#shipDiv-' + _this.shipName).height(this.height).width(this.width);
    this.move(x, y);
    
    // add the click handler when the ship is added to the board
    $('#shipDiv-' + _this.shipName).click(function() {
        console.log("selected phase: " + window.game.phases.selectedPhase);
        console.log("selected ship: " + window.game.selectedShip);
        
        // handle selecting a target
        if(window.game.phases.selectedPhase == "Combat" && window.game.selectedShip != null && window.game.selectedShip != _this) {
            console.log("TARGET SELECTED");
            _this.toggleTargetSelect();
        }
        // else its a normal select
        else {
            _this.toggleSelect();
        }
    });
}

Ship.prototype.toggleTargetSelect = function() {
    var $ship = $('#shipDiv-' + this.shipName);
    $ship.toggleClass("targetShipSelected");
    
    if ($ship.hasClass("targetShipSelected")) {
        window.game.selectedTargetShip = this;
    }
    // target is unselected
    else {
        window.game.selectedTargetShip = null;
    }
}

Ship.prototype.toggleSelect = function() {
    var $ship = $('#shipDiv-' + this.shipName);
    $ship.toggleClass("shipSelected");
    
    console.log("PHASE: " + window.game.phases.selectedPhase);

    // populate panels and change whats rendered based on if the ship is selected
    if ($ship.hasClass("shipSelected")) {
        this.shipSelected($ship);
    }
    // ship is not selected, clear out and remove stuff
    else {
        this.shipUnselected();
    }
}

Ship.prototype.shipSelected = function($ship) {
    var _this = this;
    
    // set this ship as selected
    this.isSelected = true;
    window.game.selectedShip = this;
    console.log("SELECTED: " + this.shipName);
    
    window.game.shipReferencePanel.setup(this);
    window.game.shipInfoPanel.setup(this);
    
    // if it's planning, setup the planning panel
    if(window.game.phases.selectedPhase == "Planning") {
        window.game.planningPanel.setup(this.dial);
    }
    // if it's activation, render a move template if one's set
    // TODO: setup the activation panel
    else if(window.game.phases.selectedPhase == "Activation") {
        this.activationOnSelect();
    }
    // if it's combat, render the firing arc
    // TODO: setup the combat panel
    else if (window.game.phases.selectedPhase == "Combat") {
        this.firingArc.render($ship);
        
        var thisShipDivId = "shipDiv-" + _this.shipName;
        
        // move all other ships to the top so that they can be clicked as targets
        $(".shipDiv").each( function(index) {
            if(this.id != thisShipDivId) {
                $(this).parent().append($(this));
            }
        });
    }
}

Ship.prototype.activationOnSelect = function() {
    var moveTemplateId = this.dial.buildMoveTemplateId();
    if(moveTemplateId != "-") {
        window.game.moveTemplate = new MoveTemplate(moveTemplateId);
        window.game.moveTemplate.addToBoard(this);
    }
}

Ship.prototype.shipUnselected = function() {
    this.isSelected = false;
    
    window.game.planningPanel.tearDown();
    window.game.shipInfoPanel.tearDown();
    window.game.shipReferencePanel.tearDown();
    
    if(window.game.moveTemplate) {
        window.game.moveTemplate.removeFromBoard();
    }
    
    this.firingArc.remove();
    
    window.game.selectedShip = null;
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
