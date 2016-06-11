var PlanningPanel = function() {
    var _this = this;
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        
        var dial = window.game.selectedShip.dial;
        
        dial.direction = $('#selectedDirection').text();
        dial.distance = $('#selectedDistance').text();
        
        if(dial.distance && dial.direction) {
            _this.addTemplateToBoard();
        }
    });
}

PlanningPanel.prototype.addTemplateToBoard = function() {
    var game = window.game;
    var dial = game.selectedShip.dial;
    var moveTemplateVal = dial.direction + "-" + dial.distance;
    
    console.log("templateVal: " + moveTemplateVal);
        
    // if there's already a template out there, remove it
    if(game.moveTemplate != null) {
        game.moveTemplate.removeFromBoard();
        game.moveTemplate = null;
    }
        
    game.moveTemplate = new MoveTemplate(moveTemplateVal);
    game.moveTemplate.addToBoard(game.selectedShip);
}
