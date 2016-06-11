var Dial = function(dialConfig) {
    this.config = dialConfig;
    this.direction = "";
    this.distance = "";
}

Dial.prototype.getDirections = function() {
    var directionsList = [];
    $.each(this.config, function(index, element) {
        directionsList.push(element.direction);
    });

    return $.unique(directionsList);
}

Dial.prototype.getDistances = function(direction) {
    var distanceList = []
    $.each(this.config, function(index, element) {
        if (element.direction == direction) {
            distanceList.push(element.distance);
        }
    });

    return distanceList;
}

Dial.prototype.setupDial = function(isShipSelected) {
    var _this = this;
    
    // if the ship is selected, set the dial values and listeners
    if (isShipSelected) {
        _this.clearDropdowns();
        
        // populate directions dropdown
        $.each(this.getDirections(), function(index, element) {
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
            var distances = _this.getDistances(direction);
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
    // ship is not selected, empty out the values
    else {
        _this.clearDropdowns();
        _this.clearSelectedValues();
        
        // disable the dropdowns
        _this.disableDropdowns();
    }
}

Dial.prototype.enableDropdowns = function() {
    this.enableDisableDropdowns(false);
}

Dial.prototype.disableDropdowns = function() {
    this.enableDisableDropdowns(true);
}

Dial.prototype.enableDisableDropdowns = function(isDisabled) {
    $("#directionBS > button, #dialDistanceBS > button").prop("disabled", isDisabled);
}

Dial.prototype.clearDropdowns = function() {
    // clear the dial direction dropdown options
    $("#directionBS .dropdown-menu").empty();

    // clear the dialDistance dropdown options
    $("#dialDistanceBS .dropdown-menu").empty();
}

Dial.prototype.clearSelectedValues = function() {
    // clear the selected values
    $('#selectedDirection').text("");
    $('#selectedDistance').text("");
}
