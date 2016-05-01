var TieFighter = function() {
    this.height = 10;
    this.weight = 10;

    this.imagePath = "img/base-tie.png";
}

TieFighter.prototype.addToBoard = function() {
    console.log("addToBoard()");
    $('#board').prepend('<img id="tie" src="img/ships/base-tie.png" />');
}

TieFighter.prototype.onOver = function(sprite, pointer) {
    console.log("ON OVER");

    this.sprite.tint = 0xFF0000;
    this.sprite.angle += 90;
    this.sprite.turn = true;
    console.log("turn: " + this.sprite.turn);
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
