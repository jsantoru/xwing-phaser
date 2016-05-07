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
            rotation: 0
        },
        "straight-3" : {
            imagePath: "img/move-templates/straight-3.png",
            height: 150,
            width: 25,
            direction: "straight",
            rotation: 0
        },
        "straight-4" : {
            imagePath: "img/move-templates/straight-4.png",
            height: 200,
            width: 25,
            direction: "straight",
            rotation: 0
        },
        "straight-5" : {
            imagePath: "img/move-templates/straight-5.png",
            height: 250,
            width: 25,
            direction: "straight",
            rotation: 0
        }
        // TODO: the other templates...
    }
    
    // set the template config
    this.config = this.templateConfig[templateId];
    console.log("templateConfig: " + JSON.stringify(this.config));
    
    this.x = 0;
    this.y = 0;
}

// TODO: move some of this logic to the constructor (templateId at least)
MoveTemplate.prototype.addToBoard = function(x, y) {
    console.log("MoveTemplate.addToBoard(): x: " + x + ", y: " + y);
    
    // create the image from the config
    if(this.config) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv">' + 
            '<img id="moveTemplate" class="moveTemplate" src="' + this.config.imagePath + '"/></img>');
        $('#moveTemplateDiv').height(this.config.height).width(this.config.width);
        
        // move this template to the correct location 
        // relative to the location of the ship and the template size
        var adjustedXY = this.determineAdjustedXY("up", this.config, x, y)

        this.move(adjustedXY.x, adjustedXY.y);
    }
}

MoveTemplate.prototype.determineAdjustedXY = function(direction, templateConfig, x, y) {
    var adjustedX = x + templateConfig.width/2;
    var adjustedY = y - templateConfig.height;
    
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
