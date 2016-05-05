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
    
    // assume the ship is facing up
    console.log("tie direction: " + this.direction);
    
    // assume we're moving straight and up, so x doesnt change
    var x = this.x;
    var y = this.y - this.height - moveTemplate.config.height;
    
    // TODO: actually handle directions and other move templates
    
    // move the tie
    this.move(x, y);
}

TieFighter.prototype.turn = function(degrees) {
    console.log("turn()");
    this.rotation += degrees;
    $('#tieDiv').rotate(this.rotation);
}
