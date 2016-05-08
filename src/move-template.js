// TODO: initialize with templateId and x and y
var MoveTemplate = function(templateId) {
    // constructor
    console.log("MoveTemplate.constructor(), templateId: " + templateId);
    
    // TODO: externalize this
    this.templateConfig = {
        "straight-2" : {
            imagePath: "img/move-templates/straight-2.png",
            height: 100,
            width: 25,
            direction: "straight",
            endRotation: 0
        },
        "straight-3" : {
            imagePath: "img/move-templates/straight-3.png",
            height: 150,
            width: 25,
            direction: "straight",
            endRotation: 0
        },
        "straight-4" : {
            imagePath: "img/move-templates/straight-4.png",
            height: 200,
            width: 25,
            direction: "straight",
            endRotation: 0
        },
        "straight-5" : {
            imagePath: "img/move-templates/straight-5.png",
            height: 250,
            width: 25,
            direction: "straight",
            endRotation: 0
        },
        "right-1" : {
            imagePath: "img/move-templates/turn-1-right.png",
            height: 50,
            width: 50,
            direction: "right",
            endRotation: 90
        },
        "left-1" : {
            imagePath: "img/move-templates/turn-1-left.png",
            height: 50,
            width: 50,
            direction: "left",
            endRotation: 270
        }
        // TODO: the other templates...
    }
    
    // set the template config
    this.config = this.templateConfig[templateId];
    console.log("templateConfig: " + JSON.stringify(this.config));
    
    this.x = 0;
    this.y = 0;
    
    this.rotation = 0;
    this.direction = "up";
}

// TODO: move some of this logic to the constructor (templateId at least)
MoveTemplate.prototype.addToBoard = function(direction, x, y) {
    console.log("MoveTemplate.addToBoard(): direction: " + direction + ", x: " + x + ", y: " + y);
    
    // create the image from the config
    if(this.config) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv">' + 
            '<img id="moveTemplate" class="moveTemplate" src="' + this.config.imagePath + '"/></img>');
        $('#moveTemplateDiv').height(this.config.height).width(this.config.width);
        
        // move this template to the correct location 
        // relative to the location of the ship and the template size
        var adjustedXY = this.determineAdjustedXY(direction, this.config, x, y)

        this.move(adjustedXY.x, adjustedXY.y);
    }
}

MoveTemplate.prototype.determineAdjustedXY = function(shipDirection, templateConfig, x, y) {
    var adjustedX;
    var adjustedY;
    
    if(shipDirection == "up") {
        if(templateConfig.direction == "left") {
            adjustedX = x + 25/2 - 25;
            adjustedY = y - templateConfig.height;
        }
        else {
            adjustedX = x + 25/2;
            adjustedY = y - templateConfig.height; 
        }
    }
    else if(shipDirection == "down") {
        adjustedX = x + 25 + 25/2;
        adjustedY = y + templateConfig.height + 50;
        
        // also rotate this template
        this.turn(180);
    }
    else if(shipDirection == "right") {
        adjustedX = x + templateConfig.height + 50;
        adjustedY = y + 25/2
        
        this.turn(90);
    }
    else if(shipDirection == "left") {
        adjustedX = x - templateConfig.height;
        adjustedY = y + 25 + 25/2;
        
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
