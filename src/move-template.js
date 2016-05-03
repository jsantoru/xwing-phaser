var MoveTemplate = function() {
    // constructor
    this.x = 0;
    this.y = 0;
    
    this.imagePath = "img/move-templates/straight-2.png";
    
    // TODO: data object of move template configs
    // - template image
    // - height
    // - width
    // - rotation (for k turns)
    
    this.templateConfig = {
        "straight-2" : {
            imagePath: "img/move-templates/straight-2.png",
            height: 100,
            width: 25
        }
        // TODO: the other templates...
    }
    
}

MoveTemplate.prototype.addToBoard = function(templateId, x, y) {
    console.log("MoveTemplate.addToBoard()");
    
    // get the template config
    var templateConfig = this.templateConfig[templateId];
    console.log("templateConfig: " + JSON.stringify(templateConfig));
    
    if(templateConfig) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv"><img id="moveTemplate" class="moveTemplate" src="' + templateConfig.imagePath + '"/></img>');
    }
    this.move(x, y);
}

MoveTemplate.prototype.removeFromBoard = function() {
    console.log("MoveTemplate.removeFromBoard()");
    $("#moveTemplateDiv").remove();
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
