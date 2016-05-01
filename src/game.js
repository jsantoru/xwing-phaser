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
}
