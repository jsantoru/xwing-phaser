var MoveTemplate = function() {
    // constructor
    this.x = 0;
    this.y = 0;
    
    this.imagePath = "img/move-templates/straight-2.png";
    
    // TODO: data object of move template configs
    // - template image
    // - height
    // - width
}

MoveTemplate.prototype.addToBoard = function(x, y) {
    console.log("MoveTemplate.addToBoard()");
    $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv"><img id="moveTemplate" class="moveTemplate" src="' + this.imagePath + '"/></img>');

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
