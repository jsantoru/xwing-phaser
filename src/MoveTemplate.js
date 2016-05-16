// TODO: initialize with templateId and x and y
var MoveTemplate = function(templateId) {
    // constructor
    console.log("MoveTemplate.constructor(), templateId: " + templateId);
    
    // set the template config
    var config = new Config().templates[templateId]
    console.log("templateConfig: " + JSON.stringify(config));
    
    this.imagePath = config.imagePath;
    this.height = config.height;
    this.width = config.width;
    this.type = config.type;
    this.distance = config.distance;
    this.endRotation = config.endRotation;
    
    this.x = 0;
    this.y = 0;
    
    this.rotation = 0;
    //this.direction = "up";
}

// TODO: move some of this logic to the constructor (templateId at least)
MoveTemplate.prototype.addToBoard = function(ship) { //(direction, x, y) {
    console.log("MoveTemplate.addToBoard(): direction: " + ship.direction + ", x: " + ship.x + ", y: " + ship.y);
    
    // create the image from the config
    if(this.imagePath) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv">' + 
            '<img id="moveTemplate" class="moveTemplate" src="' + this.imagePath + '"/></img>');
        $('#moveTemplateDiv').height(this.height).width(this.width);
        
        // move this template to the correct location 
        // relative to the location of the ship and the template size
        var adjustedXY = this.determineAdjustedXY(ship.width, ship.direction, ship.x, ship.y)

        this.move(adjustedXY.x, adjustedXY.y);
    }
}

MoveTemplate.prototype.determineAdjustedXY = function(shipWidth, shipDirection, x, y) {
    var adjustedX;
    var adjustedY;
    
    // the offset to position the template in the middle of the ship base
    var offset = shipWidth/4;
    
    if(shipDirection == "up") {
        if(this.type == "left") {
            adjustedX = x + offset - (this.width - 25);
            adjustedY = y - this.height;
        }
        else {
            adjustedX = x + offset;
            adjustedY = y - this.height; 
        }
    }
    else if(shipDirection == "down") {
        if(this.type == "left") {
            adjustedX = x + offset + this.width;
            adjustedY = y + this.height + shipWidth;
        } else {
            adjustedX = x + offset + 25;
            adjustedY = y + this.height + shipWidth;
        }
        this.turn(180);
    }
    else if(shipDirection == "right") {
        if(this.type == "left") {
            adjustedX = x + this.height + shipWidth;
            adjustedY = y + offset - (this.width - 25);
        } else {
            adjustedX = x + this.height + shipWidth;
            adjustedY = y + offset;
        }
        this.turn(90);
    }
    else if(shipDirection == "left") {
        if(this.type == "left") {
            adjustedX = x - this.height;
            adjustedY = y + offset + this.height;
        }
        else {
            adjustedX = x - this.height;
            adjustedY = y + offset + 25;
        }
        
        this.turn(270);
    }
    
    return {
        x: adjustedX,
        y: adjustedY
    }
}

MoveTemplate.prototype.removeFromBoard = function() {
    console.log("MoveTemplate.removeFromBoard()");
    $("#moveTemplateDiv").remove();
    this.selectedTemplateConfig = null;
}

MoveTemplate.prototype.move = function(x, y) {
    console.log("move()");
    
    this.x = x;
    this.y = y;
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    $('#moveTemplateDiv').css("top", yPixels);
    $('#moveTemplateDiv').css("left", xPixels);
}

MoveTemplate.prototype.turn = function(degrees) {
    console.log("MoveTemplate.turn()");
    this.rotation += degrees;
    
    if(this.rotation == 360) {
        this.rotation = 0;
    }
    
    console.log("rotation: " + this.rotation);
    $('#moveTemplateDiv').rotate(this.rotation);
    
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
