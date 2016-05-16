var TieFighter = function(shipId) {
    var config = new Config().ships[shipId];

    this.imagePath = config.imagePath;
    this.height = config.height;
    this.width = config.width;
    
    this.x = 0;
    this.y = 0;

    this.rotation = 0;
    this.direction = "up";
}

TieFighter.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    // TODO: should this be an html template?
    $('#board').prepend('<div id="tieDiv" class="tieDiv"><img id="tie" class="tie" src="' + this.imagePath + '"/></img>');
    $('#tieDiv').height(this.height).width(this.width);
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
    
    // move the tie
    this.move(x, y);
    
    // turn the ship (if necessary -- rotation will be 0 for straight moves)
    this.turn(moveTemplate.endRotation);
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
