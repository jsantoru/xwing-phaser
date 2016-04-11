    window.onload = function() {

        var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
        
        // sprites
        var playmat;
        var tieFighter;
        var tieFighterBorder;
        
        var zoneBottom;
        var zoneTop;
        
        // other

        var currentTemplate;
        var templateStraight1;
        var dragPosition;

        var movementTemplateVal;
        var _this = this;

        var upKey;
        var downKey;
        var leftKey;
        var rightKey;

        // handlers
        $( "#movementTemplate" ).change(function() {
            _this.movementTemplateVal = $("#movementTemplate").val();
        });
        
        $( "#dialTie").click(function() {
           $("#movementTemplate").val("straight-1");
           setTemplate("straight-1");
           
           tieFighterBorder.x = tieFighter.x;
           tieFighterBorder.y = tieFighter.y;
           tieFighterBorder.visible = true;
           
           templateStraight1.x = tieFighterBorder.x;
           templateStraight1.y = tieFighterBorder.y - 50;
        });

        // phaser functions

        function preload () {
            //game.load.baseURL = 'http://examples.phaser.io/assets/';
            game.load.crossOrigin = 'anonymous';
            game.load.image('playmat', 'img/playmat-bespin.jpg');
            game.load.image('img-tie-fighter', 'img/Tie-Fighter-icon.png');
            game.load.image('img-tie-fighter-border', 'img/Tie-Fighter-icon-border.png');
            game.load.image('zone', 'img/translucent.png');
            game.load.image('template-straight-1', 'img/move-templates/straight-1.png');
        }

        function create () {
            console.log("CREATE");
            //var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            //logo.anchor.setTo(0.5, 0.5);
            
            playmat = game.add.sprite(0,0, 'playmat');
            playmat.height = 600;
            playmat.width = 600;
            
            zoneBottom = game.add.sprite(0, 500, 'zone');
            zoneBottom.width = 600;
            zoneBottom.height = 100;
            
            zoneTop = game.add.sprite(0, 0, 'zone');
            zoneTop.width = 600;
            zoneTop.height = 100;
            
            templateStraight1 = game.add.sprite(0, 500, 'template-straight-1');
            templateStraight1.width = 25;
            templateStraight1.height = 50;
            templateStraight1.anchor.setTo(0.5, 0);
            templateStraight1.visible = false;
            
            tieFighterBorder = game.add.sprite(300, 550, 'img-tie-fighter-border');
            tieFighterBorder.height = 50;
            tieFighterBorder.width = 50;
            tieFighterBorder.anchor.setTo(0.5, 0)
            tieFighterBorder.visible = false;
            
            tieFighter = game.add.sprite(300, 550, 'img-tie-fighter');
            tieFighter.height = 50;
            tieFighter.width = 50;
        
            tieFighter.inputEnabled = true;
            tieFighter.input.enableDrag();
            
            tieFighter.anchor.setTo(0.5, 0);
            //tieFighter.events.onInputOver.add(onOver, this);
            //tieFighter.events.onInputOut.add(onOut, this);
            //tieFighter.events.onDragStart.add(onOut, this);
            tieFighter.events.onDragStop.add(onOut, this);
            tieFighter.turn = false;
            
            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        }

        function setTemplate(templateId) {
            if(templateId == "straight-1") {
                 templateStraight1.visible = true; 
            }
        }

        function onOver(sprite, pointer) {
            console.log("ON OVER");
            tieFighter.tint = 0xFF0000;
            tieFighter.angle += 90;
            tieFighter.turn = true;
            console.log("turn: " + tieFighter.turn);
        
        }
        
        function onOut(sprite, pointer) {
            //_this.tieFighter.tint = Math.random() * 0xffffff;
            
            console.log("movementTemplate: " + _this.movementTemplateVal);
            
            if(_this.movementTemplateVal === "right") {
                console.log("IN RIGHT");
                tieFighter.angle += 90;
            }
            else if(_this.movementTemplateVal === "left") {
                tieFighter.angle += 270;
            }
            else if(_this.movementTemplateVal == "k-turn") {
                tieFighter.angle += 180
            }
        
        }
        
        function update() {
        
            if (upKey.isDown)
            {
                tieFighter.y--;
            }
            else if (downKey.isDown)
            {
                tieFighter.y++;
            }
        
            if (leftKey.isDown)
            {
                tieFighter.x--;
            }
            else if (rightKey.isDown)
            {
                tieFighter.x++;
            }
        
        }
    
        function render () {
        
        }
        
    };