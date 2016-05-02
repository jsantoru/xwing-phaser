var TieFighter = function() {
    this.x = 10;
    this.y = 10;

    this.imagePath = "img/ships/base-tie.png";
    
    this.turnDegrees = 0;
}

TieFighter.prototype.addToBoard = function(x, y) {
    console.log("addToBoard()");
    // TODO: should this be an html template?
    $('#board').prepend('<div id="tieDiv" class="tieDiv"><img id="tie" class="tie" src="' + this.imagePath + '"/></tieDiv>');
    
    this.move(x, y);
}

TieFighter.prototype.move = function(x, y) {
    console.log("move()");
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    $('#tieDiv').css("top", yPixels);
    $('#tieDiv').css("left", xPixels);
}

TieFighter.prototype.turn = function(degrees) {
    console.log("turn()");
    this.turnDegrees += degrees;
    $('#tieDiv').rotate(this.turnDegrees);
}

TieFighter.prototype.onOut = function(sprite, pointer) {
    //_this.tieFighter.tint = Math.random() * 0xffffff;
    var movementTemplateVal = $("#movementTemplate").val();
    console.log("movementTemplate: " + movementTemplateVal);

    if (movementTemplateVal === "right") {
        console.log("IN RIGHT");
        this.sprite.angle += 90;
    }
    else if (movementTemplateVal === "left") {
        this.sprite.angle += 270;
    }
    else if (movementTemplateVal === "k-turn") {
        this.sprite.angle += 180;
    }
}
