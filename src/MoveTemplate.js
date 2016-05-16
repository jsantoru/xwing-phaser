// TODO: initialize with templateId and x and y
var MoveTemplate = function(templateId) {
    // constructor
    console.log("MoveTemplate.constructor(), templateId: " + templateId);
    
    // set the template config
    this.config = new Config().templates[templateId]
    console.log("templateConfig: " + JSON.stringify(this.config));
    
    this.x = 0;
    this.y = 0;
    
    this.rotation = 0;
    this.direction = "up";
}

// TODO: move some of this logic to the constructor (templateId at least)
MoveTemplate.prototype.addToBoard = function(ship) { //(direction, x, y) {
    console.log("MoveTemplate.addToBoard(): direction: " + ship.direction + ", x: " + ship.x + ", y: " + ship.y);
    
    // create the image from the config
    if(this.config) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv">' + 
            '<img id="moveTemplate" class="moveTemplate" src="' + this.config.imagePath + '"/></img>');
        $('#moveTemplateDiv').height(this.config.height).width(this.config.width);
        
        // move this template to the correct location 
        // relative to the location of the ship and the template size
        var adjustedXY = this.determineAdjustedXY(ship.width, ship.direction, this.config, ship.x, ship.y)

        this.move(adjustedXY.x, adjustedXY.y);
    }
}

MoveTemplate.prototype.determineAdjustedXY = function(shipWidth, shipDirection, templateConfig, x, y) {
    var adjustedX;
    var adjustedY;
    
    // the offset to position the template in the middle of the ship base
    var offset = shipWidth/4;
    
    if(shipDirection == "up") {
        if(templateConfig.direction == "left") {
            adjustedX = x + offset - (templateConfig.width - 25);
            adjustedY = y - templateConfig.height;
        }
        else {
            adjustedX = x + offset;
            adjustedY = y - templateConfig.height; 
        }
    }
    else if(shipDirection == "down") {
        if(templateConfig.direction == "left") {
            adjustedX = x + offset + templateConfig.width;
            adjustedY = y + templateConfig.height + shipWidth;
        } else {
            adjustedX = x + offset + 25;
            adjustedY = y + templateConfig.height + shipWidth;
        }
        this.turn(180);
    }
    else if(shipDirection == "right") {
        if(templateConfig.direction == "left") {
            adjustedX = x + templateConfig.height + shipWidth;
            adjustedY = y + offset - (templateConfig.width - 25);
        } else {
            adjustedX = x + templateConfig.height + shipWidth;
            adjustedY = y + offset;
        }
        this.turn(90);
    }
    else if(shipDirection == "left") {
        if(templateConfig.direction == "left") {
            adjustedX = x - templateConfig.height;
            adjustedY = y + offset + templateConfig.height;
        }
        else {
            adjustedX = x - templateConfig.height;
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
