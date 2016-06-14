var UtilityPanel = function() {
    $('#rotate').on('click', function(){
        console.log("rotate");
        window.game.selectedShip.turn(90);
    });
}
