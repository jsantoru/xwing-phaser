var PlanningPanel = function() {
    var _this = this;
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        
        // TODO: should set these values on the dial object
        if($('#selectedDirection').text() && $('#selectedDistance').text()) {
            _this.addTemplateToBoard();
        }
    });
}

PlanningPanel.prototype.addTemplateToBoard = function() {
    // TODO: these should be set on the dial on the ship object
    var movementTemplateVal = $('#selectedDirection').text() + "-" + $('#selectedDistance').text();
    console.log("templateVal: " + movementTemplateVal);
        
    var game = window.game;
    
    game.selectedShip.dial.direction = $('#selectedDirection').text();
    game.selectedShip.dial.direction = $('#selectedDistance').text();
    
    // if there's already a template out there, remove it
    if(game.moveTemplate != null) {
        game.moveTemplate.removeFromBoard();
        game.moveTemplate = null;
    }
        
    game.moveTemplate = new MoveTemplate(movementTemplateVal);
    game.moveTemplate.addToBoard(game.selectedShip);
}
