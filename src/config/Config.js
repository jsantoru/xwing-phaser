var Config = function() {
    
    this.ships = {
        "tie-fo-fighter": {
            type: "Tie/Fo Fighter",
            imagePath: "img/ships/base-tie-fo-fighter.png",
            height: 50,
            width: 50,
            actions: ["focus", "target-lock", "barrel-roll", "evade"],
            stats : { attack: 2, agility: 3, hull: 3, shield: 1 },
            dial: [
                {direction:"straight", distance:2, color:"green"},
                {direction:"straight", distance:3, color:"green"},
                {direction:"straight", distance:4, color:"white"},
                {direction:"straight", distance:5, color:"white"},
                {direction:"left", distance:1, color:"white"},
                {direction:"left", distance:2, color:"green"},
                {direction:"left", distance:3, color:"white"},
                {direction:"right", distance:1, color:"white"},
                {direction:"right", distance:2, color:"green"},
                {direction:"right", distance:3, color:"white"}
            ],
            refcardImagePath: "img/refcards/refcard-tie-fo-fighter.png"
        }
    }
    
    this.templates = {
        "straight-2": {
            imagePath: "img/move-templates/straight-2.png",
            height: 100,
            width: 25,
            type: "straight",
            distance: 2,
            endRotation: 0
        },
        "straight-3": {
            imagePath: "img/move-templates/straight-3.png",
            height: 150,
            width: 25,
            type: "straight",
            distance: 3,
            endRotation: 0
        },
        "straight-4": {
            imagePath: "img/move-templates/straight-4.png",
            height: 200,
            width: 25,
            type: "straight",
            distance: 4,
            endRotation: 0
        },
        "straight-5": {
            imagePath: "img/move-templates/straight-5.png",
            height: 250,
            width: 25,
            type: "straight",
            distance: 5,
            endRotation: 0
        },
        "right-1": {
            imagePath: "img/move-templates/turn-1-right.png",
            height: 50,
            width: 50,
            type: "right",
            distance: 1,
            endRotation: 90
        },
        "left-1": {
            imagePath: "img/move-templates/turn-1-left.png",
            height: 50,
            width: 50,
            type: "left",
            distance: 1,
            endRotation: 270
        },
        "right-2": {
            imagePath: "img/move-templates/turn-2-right.png",
            height: 75,
            width: 75,
            type: "right",
            distance: 2,
            endRotation: 90
        },
        "left-2": {
            imagePath: "img/move-templates/turn-2-left.png",
            height: 75,
            width: 75,
            type: "left",
            distance: 2,
            endRotation: 270
        },
        "right-3": {
            imagePath: "img/move-templates/turn-3-right.png",
            height: 100,
            width: 100,
            type: "right",
            distance: 3,
            endRotation: 90
        },
        "left-3": {
            imagePath: "img/move-templates/turn-3-left.png",
            height: 100,
            width: 100,
            type: "left",
            distance: 3,
            endRotation: 270
        }
        // TODO: the other templates...
    }

}
