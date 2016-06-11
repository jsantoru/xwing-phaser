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
    
    // listeners
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        
        // TODO: should set these values on the dial object
        if($('#selectedDirection').text() && $('#selectedDistance').text()) {
            _this.addTemplateToBoard();
        }
    });
    
    $('#moveOK').on('click', function(){
        console.log("moveOK");
        _this.moveTieWithTemplate();
        
        // after moving the ship it should no longer be selected
        _this.selectedShip.toggleSelect();
    });
    
    $('#rotate').on('click', function(){
        console.log("rotate");
        _this._selectedShip.turn(90);
    });
}

Game.prototype.start = function() {
    console.log("start");
    this.initialize();
}

Game.prototype.initialize = function() {
    console.log("initialize");
    
    // setup the Phases component
    new Phases();
    
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
    
    // determine the selected ship
    // TODO: better time to set selected? any way to do it when the ship is actually selected?
    $.each(_this.ships, function(index, element) {
        if(element.isSelected) {
            _this.selectedShip = element;
            //alert("SELECTED: " + _this.selectedShip.shipName);
        }
    });
    
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

Game.prototype.moveTieWithTemplate = function() {
    var _this = this;
    //alert("selected: " + _this.selectedShip.shipName);
    // move the selectedShip
    _this.selectedShip.moveWithTemplate(_this.moveTemplate);
    
    // clear the dial badges and remove the template
    _this.selectedShip.dial.clearSelectedValues();
    _this.moveTemplate.removeFromBoard();
    _this.moveTemplate = null;
}
