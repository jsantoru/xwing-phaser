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
    var tie1 = new TieFighter();
    tie1.addToBoard();
}
