var TieFighter = function() {
    this.x = 0;
    this.y = 0;

    this.imagePath = "img/ships/base-tie.png";
    
    this.rotation = 0;
    
    this.direction = "up";
    
    // TODO: this is needed when calculating move target.
    // TODO: should be in one place, not in css and here
    this.height = 50;
    this.width = 50;
}

TieFighter.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    // TODO: should this be an html template?
    $('#board').prepend('<div id="tieDiv" class="tieDiv"><img id="tie" class="tie" src="' + this.imagePath + '"/></img>');
    
    this.move(x, y);
}

TieFighter.prototype.move = function(x, y) {
    console.log("move()");
    
    this.x = x;
    this.y = y;
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    $('#tieDiv').css("top", yPixels);
    $('#tieDiv').css("left", xPixels);
}

TieFighter.prototype.moveWithTemplate = function(moveTemplate) {
    console.log("moveWithTemplate");
    console.log("tie direction: " + this.direction);
    
    var x; 
    var y;
    
    // the offset for the template to be in the middle of the ship base
    var offset = this.width/4;
    
    if(this.direction == "up") {
        if(moveTemplate.config.direction == "straight") {
            x = this.x;
            y = this.y - moveTemplate.config.height - this.height;
        } 
        else if(moveTemplate.config.direction == "right") {
            x = this.x + moveTemplate.config.width + offset;
            y = this.y - moveTemplate.config.height - offset;
        } 
        else if(moveTemplate.config.direction == "left") {
            x = this.x - moveTemplate.config.width - offset;
            y = this.y - moveTemplate.config.height - offset;
        }
    }
    else if(this.direction == "down") {
        if(moveTemplate.config.direction == "straight") {
            x = this.x;
            y = this.y + moveTemplate.config.height + this.height;
        }
        else if(moveTemplate.config.direction == "right") {
            x = this.x - moveTemplate.config.width - offset;
            y = this.y + moveTemplate.config.height + offset;
        }
        else if(moveTemplate.config.direction == "left") {
            x = this.x + moveTemplate.config.width + offset;
            y = this.y + moveTemplate.config.height + offset;
        }
    }
    else if(this.direction == "right") {
        if(moveTemplate.config.direction == "straight") {
            x = this.x + moveTemplate.config.height + this.height;
            y = this.y;
        }
        else if(moveTemplate.config.direction == "right") {
            x = this.x + moveTemplate.config.height + offset;
            y = this.y + moveTemplate.config.width + offset;
        }
        else if(moveTemplate.config.direction == "left") {
            x = this.x + moveTemplate.config.height + offset;
            y = this.y - moveTemplate.config.width - offset;
        }
    }
    else if(this.direction == "left") {
        if(moveTemplate.config.direction == "straight") {
            x = this.x - moveTemplate.config.height - this.height;
            y = this.y;
        }
        else if(moveTemplate.config.direction == "right") {
            x = this.x - moveTemplate.config.height - offset;
            y = this.y - moveTemplate.config.height - offset;
        }
        else if(moveTemplate.config.direction == "left") {
            x = this.x - moveTemplate.config.height - offset;
            y = this.y + moveTemplate.config.height + offset;
        }
    }
    
    // move the tie
    this.move(x, y);
    
    // turn the ship (if necessary -- rotation will be 0 for straight moves)
    this.turn(moveTemplate.config.endRotation);
}

TieFighter.prototype.turn = function(degrees) {
    console.log("turn()");
    this.rotation += degrees;
    
    if(this.rotation >= 360) {
        this.rotation = this.rotation - 360;
    }
    console.log("rotation: " + this.rotation);
    $('#tieDiv').rotate(this.rotation);
    
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
