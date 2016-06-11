// global Game object
var game;

// start the game
$( document ).ready(function() {
    console.log( "ready!" );
    
    game = new Game();
    game.start();
});

/** 
 * Create a new Game.
 */
var Game = function() {
    var _this = this;
    
    this.ships = []
    
    this.moveTemplate = null;
    
    this.selectedShip;
    
    this.phases = new Phases();
    this.activationPanel = new ActivationPanel();
    
    // listeners
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        
        // TODO: should set these values on the dial object
        if($('#selectedDirection').text() && $('#selectedDistance').text()) {
            _this.addTemplateToBoard();
        }
    });
    
    $('#rotate').on('click', function(){
        console.log("rotate");
        _this.selectedShip.turn(90);
    });
}

Game.prototype.start = function() {
    console.log("start");
    this.initialize();
}

Game.prototype.initialize = function() {
    console.log("initialize");
    
    // add the xwing to the board, facing down
    var xwing1 = new Ship("t70-xwing", "xwing1");
    xwing1.addToBoard(475, 100);
    xwing1.turn(180);
    this.ships.push(xwing1);
    
    // add the ties to the board
    var tie1 = new Ship("tie-fo-fighter", "tie1");
    tie1.addToBoard(435, 760);
    this.ships.push(tie1);   
    
    var tie2 = new Ship("tie-fo-fighter", "tie2");
    tie2.addToBoard(500, 750);
    this.ships.push(tie2);
    
    var tie3 = new Ship("tie-fo-fighter", "tie3");
    tie3.addToBoard(445, 820);
    this.ships.push(tie3);
    
    var tie4 = new Ship("tie-fo-fighter", "tie4");
    tie4.addToBoard(510, 810);
    this.ships.push(tie4);
}

Game.prototype.addTemplateToBoard = function() {
    var _this = this;
    
    // TODO: these should be set on the dial on the ship object
    var movementTemplateVal = $('#selectedDirection').text() + "-" + $('#selectedDistance').text();
    console.log("templateVal: " + movementTemplateVal);
        
    // if there's already a template out there, remove it
    if(_this.moveTemplate != null) {
        _this.moveTemplate.removeFromBoard();
        _this.moveTemplate = null;
    }
        
    _this.moveTemplate = new MoveTemplate(movementTemplateVal);
    _this.moveTemplate.addToBoard(_this.selectedShip);
}
