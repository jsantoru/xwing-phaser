$( document ).ready(function() {
    console.log( "ready!" );
    var game = new Game();
    game.start();
});

var Game = function() {
    // constructor
}

Game.prototype.start = function() {
    console.log("start");
    this.initialize();
}

Game.prototype.initialize = function() {
    console.log("initialize");
    
    // TODO: add the dial to the board, instead of in html?
    // TODO: have the tie have a dial?
    
    // add the first tie to the board
    var tie1 = new TieFighter();
    tie1.addToBoard();
}
