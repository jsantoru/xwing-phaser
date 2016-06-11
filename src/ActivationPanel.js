var ActivationPanel = function() {

    // move handler
    $('#moveOK').on('click', function(){
        console.log("moveOK");
        window.game.selectedShip.moveWithTemplate(window.game.moveTemplate);
        
        // after moving the ship it should no longer be selected
        window.game.selectedShip.toggleSelect();
    });
}
