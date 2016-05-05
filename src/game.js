$( document ).ready(function() {
    console.log( "ready!" );
    
    // helper function for rotation
    // TODO: move out
    jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };
    
    var game = new Game();
    game.start();
});

/** 
 * Create a new Game.
 */
var Game = function() {
    var _this = this;
    this.tieFighter1;
    this.moveTemplate = null;
    
    // TODO: move out? they still need access to the tie in order to turn it
    // listeners
    $("#movementTemplate").change(function() {
        var movementTemplateVal = $("#movementTemplate").val() + "-" + $("#dialDistance").val();
        console.log("templateVal: " + movementTemplateVal);
        
        //_this.tieFighter1.turn(90);
        
        if(_this.moveTemplate != null) {
            _this.moveTemplate.removeFromBoard();
            _this.moveTemplate = null;
        }
        
        _this.moveTemplate = new MoveTemplate();
        _this.moveTemplate.addToBoard(movementTemplateVal, _this.tieFighter1.x, _this.tieFighter1.y);
    });

    $("#dialDistance").change(function() {
        var movementTemplateVal = $("#movementTemplate").val() + "-" + $("#dialDistance").val();
        console.log("templateVal: " + movementTemplateVal);
        
        _this.tieFighter1.turn(90);
    });
    
    // new listeners for bootstrap button dropdowns
    $('#directionBS li').on('click', function(){
        console.log("selected: " + $(this).text());
        // update the value
        $('#directionBadge').text($(this).text());
        
        // add a template to the board based on what's selected
        _this.addTemplateToBoard();
    });
    
    $('#dialDistanceBS li').on('click', function(){
        console.log("selected: " + $(this).text());
        // update the value
        $('#dialDistanceBadge').text($(this).text());
        
        // add a template to the board based on what's selected
        _this.addTemplateToBoard();
        
        //_this.tieFighter1.turn(90);
    });
    
    $('#moveOK').on('click', function(){
        console.log("moveOK()");
        _this.moveTieWithTemplate();
    });
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
    tie1.addToBoard(500, 500);
    
    this.tieFighter1 = tie1;
}

Game.prototype.addTemplateToBoard = function() {
    var _this = this;
    // TODO: should these values just be properties on this class?
    var movementTemplateVal = $('#directionBadge').text() + "-" + $('#dialDistanceBadge').text();
    console.log("templateVal: " + movementTemplateVal);
        
    // if there's already a template out there, remove it
    if(_this.moveTemplate != null) {
       _this.moveTemplate.removeFromBoard();
        _this.moveTemplate = null;
    }
        
    _this.moveTemplate = new MoveTemplate();
    _this.moveTemplate.addToBoard(movementTemplateVal, _this.tieFighter1.x, _this.tieFighter1.y);
}

Game.prototype.moveTieWithTemplate = function() {
    var _this = this;
 
    //_this.moveTemplate.config
    
    // assume the ship is facing up
    console.log("tie direction: " + _this.tieFighter1.direction);
    
    // assume we're moving straight and up, so x doesnt change
    var x = _this.tieFighter1
    var y = _this.tieFighter1.y - _this.tieFighter1.height - _this.moveTemplate.config.height;
    
    _this.tieFighter1.move(x, y);
}
