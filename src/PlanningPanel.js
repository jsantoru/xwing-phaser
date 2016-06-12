var PlanningPanel = function() {
    var _this = this;
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        
        var dial = window.game.selectedShip.dial;
        
        dial.direction = $('#selectedDirection').text();
        dial.distance = $('#selectedDistance').text();
        
        if(dial.distance && dial.direction) {
            _this.addTemplateToBoard();
        }
    });
}

PlanningPanel.prototype.addTemplateToBoard = function() {
    var selectedShip = window.game.selectedShip;
    var moveTemplateVal = selectedShip.dial.buildMoveTemplateId();
    
    console.log("templateVal: " + moveTemplateVal);
        
    // if there's already a template out there, remove it
    if(window.game.moveTemplate != null) {
        window.game.moveTemplate.removeFromBoard();
        window.game.moveTemplate = null;
    }
        
    window.game.moveTemplate = new MoveTemplate(moveTemplateVal);
    window.game.moveTemplate.addToBoard(selectedShip);
}

PlanningPanel.prototype.setup = function(dial, isShipSelected) {
    var _this = this;

    _this.clearDropdowns();
        
    // set the label values if the ship already had a dial set
    // this will be used when moving is not executed directly after setting the dial
    $('#selectedDirection').text(dial.direction);
    $('#selectedDistance').text(dial.distance);
        
    // populate directions dropdown
    $.each(dial.getDirections(), function(index, element) {
        $("#directionBS .dropdown-menu").append("<li><a href=\"#\">" + element + "</a></li>")
    });
        
    // when a direction is selected handler
    $('#directionBS li').on('click', function(){
        var direction = $(this).text()
        console.log("selected: " + direction);
        // update the value
        $('#selectedDirection').text(direction);
            
        // clear out existing distances
        $("#dialDistanceBS .dropdown-menu").empty();
            
        // populate distances based on which direction is set
        var distances = dial.getDistances(direction);
        $.each(distances, function(index, element) {
            $("#dialDistanceBS .dropdown-menu").append("<li><a href=\"#\">" + element + "</a></li>")
        });
            
        // when a distance is selected
        $('#dialDistanceBS li').on('click', function(){
            console.log("selected: " + $(this).text());
            // update the value
            $('#selectedDistance').text($(this).text());
        });
    });
        
    // enable the dropdowns
    _this.enableDropdowns();
}

PlanningPanel.prototype.tearDown = function() {
    this.clearDropdowns();
    this.clearSelectedValues();
        
    // disable the dropdowns
    this.disableDropdowns();
}

// helpers

PlanningPanel.prototype.enableDropdowns = function() {
    this.enableDisableDropdowns(false);
}

PlanningPanel.prototype.disableDropdowns = function() {
    this.enableDisableDropdowns(true);
}

PlanningPanel.prototype.enableDisableDropdowns = function(isDisabled) {
    $("#directionBS > button, #dialDistanceBS > button").prop("disabled", isDisabled);
}

PlanningPanel.prototype.clearDropdowns = function() {
    // clear the dial direction dropdown options
    $("#directionBS .dropdown-menu").empty();

    // clear the dialDistance dropdown options
    $("#dialDistanceBS .dropdown-menu").empty();
}

PlanningPanel.prototype.clearSelectedValues = function() {
    // clear the selected values
    $('#selectedDirection').text("");
    $('#selectedDistance').text("");
    
    window.game.selectedShip.dial.direction = "";
    window.game.selectedShip.dial.distance = "";
}
