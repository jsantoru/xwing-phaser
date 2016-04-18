var TieFighter = function(game) {
    // constructor
    this.sprite = game.add.sprite(300, 750, 'img-base-tie');
    this.sprite.height = 50;
    this.sprite.width = 50;
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.anchor.setTo(0.5, 0);
    
    //tieFighter.events.onInputOver.add(onOver, this);
    //tieFighter.events.onInputOut.add(onOut, this);
    //tieFighter.events.onDragStart.add(onOut, this);
    this.sprite.events.onDragStop.add(this.onOut, this);
    //tieFighter.turn = false;
    
    this.sprite.tint = 0xcd0937;
    this.tint = 0xcd0937;

}
//TieFighter.prototype.constructor = TieFighter;

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
