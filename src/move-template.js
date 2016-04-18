var MoveTemplate = function(game, templateId, x, y) {
    // constructor
    this.game = game;
    this.templateId = templateId;
    this.sprite = game.add.sprite(x, y, 'img-template-' + templateId)
}

MoveTemplate.prototype.doSomething = function() {
    
}
