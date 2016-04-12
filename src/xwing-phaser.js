// cosntructor
var GameState = function(game) {
    // sprites
    this.playmat;
    this.tieFighter;
    this.tieFighterBorder;

    this.zoneBottom;
    this.zoneTop;

    // other

    this.currentTemplate;
    this.templateStraight2;
    this.dragPosition;

    this.movementTemplateVal;

    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;
};

GameState.prototype.preload = function() {
    var _this = this;

    //Here you can preload images, audio, spritesheets and so on.
    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('playmat', 'img/playmats/playmat-bespin.jpg');
    game.load.image('img-tie-fighter', 'img/ships/tie-fo-fighter.png');
    game.load.image('img-tie-fighter-border', 'img/ships/tie-fo-fighter-border.png');
    game.load.image('zone', 'img/translucent.png');
    game.load.image('template-straight-2', 'img/move-templates/straight-2.png');

    // TODO: when both dropdowns change, display the correct template
    // handlers
    $("#movementTemplate").change(function() {
        _this.movementTemplateVal = $("#movementTemplate").val();
    });

    $("#dialTie").click(function() {
        $("#movementTemplate").val("straight-2");
        _this.setTemplate("straight-2");

        _this.tieFighterBorder.x = _this.tieFighter.x;
        _this.tieFighterBorder.y = _this.tieFighter.y;
        _this.tieFighterBorder.visible = true;

        _this.templateStraight2.x = _this.tieFighterBorder.x;
        _this.templateStraight2.y = _this.tieFighterBorder.y - 100;
    });

};

GameState.prototype.create = function() {
    //This is called immediately after preloading.
    console.log("CREATE");
    //var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    //logo.anchor.setTo(0.5, 0.5);
    var _this = this;
    
    _this.playmat = game.add.sprite(0, 0, 'playmat');
    _this.playmat.height = 800;
    _this.playmat.width = 800;

    _this.zoneBottom = game.add.sprite(0, 700, 'zone');
    _this.zoneBottom.width = 800;
    _this.zoneBottom.height = 100;

    _this.zoneTop = game.add.sprite(0, 0, 'zone');
    _this.zoneTop.width = 800;
    _this.zoneTop.height = 100;

    _this.templateStraight2 = game.add.sprite(0, 500, 'template-straight-2');
    _this.templateStraight2.width = 25;
    _this.templateStraight2.height = 100;
    _this.templateStraight2.anchor.setTo(0.5, 0);
    _this.templateStraight2.visible = false;

    _this.tieFighterBorder = game.add.sprite(300, 750, 'img-tie-fighter-border');
    _this.tieFighterBorder.height = 50;
    _this.tieFighterBorder.width = 50;
    _this.tieFighterBorder.anchor.setTo(0.5, 0)
    _this.tieFighterBorder.visible = false;
    
    var tieFighterObject = new TieFighter(game);
    _this.tieFighter = tieFighterObject.sprite;

    _this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    _this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    _this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    _this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

GameState.prototype.update = function() {
    //This method is called every frame.
    var _this = this;
    
    if (_this.upKey.isDown) {
        _this.tieFighter.y--;
    }
    else if (_this.downKey.isDown) {
        _this.tieFighter.y++;
    }

    if (_this.leftKey.isDown) {
        _this.tieFighter.x--;
    }
    else if (_this.rightKey.isDown) {
        _this.tieFighter.x++;
    }
}

GameState.prototype.setTemplate = function(templateId) {
    var _this = this;
    
    if (templateId == "straight-2") {
        _this.templateStraight2.visible = true;
    }
}

//This line instantiates a new Phaser Game and adds GameState as the default state.
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'canvasDiv');
game.state.add('game', GameState, true);
