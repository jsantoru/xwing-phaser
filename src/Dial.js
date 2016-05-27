var Dial = function(dialConfig) {
    this.config = dialConfig;
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

Dial.prototype.setDialValues = function(isShipSelected) {
    var _this = this;
    
    // if the ship is selected, set the dial values and listeners
    if (isShipSelected) {
        // set the dial direction dropdown options
        $("#directionBS .dropdown-menu").empty();

        // set the dialDistance dropdown options
        $("#dialDistanceBS .dropdown-menu").empty();

        // populate directions
        $.each(this.getDirections(), function(index, element) {
            $("#directionBS .dropdown-menu").append("<li><a href=\"#\">" + element + "</a></li>")
        });
        
        // populate distances based on which direction is set
        $('#directionBS li').on('click', function(){
            var direction = $(this).text()
            console.log("selected: " + direction);
            // update the value
            $('#selectedDirection').text(direction);
            
            // clear out existing distances
            $("#dialDistanceBS .dropdown-menu").empty();
            
            // populate the distances
            var distances = _this.getDistances(direction);
            $.each(distances, function(index, element) {
                $("#dialDistanceBS .dropdown-menu").append("<li><a href=\"#\">" + element + "</a></li>")
            });
            
            // now setup the distance listener
            $('#dialDistanceBS li').on('click', function(){
                console.log("selected: " + $(this).text());
                // update the value
                $('#selectedDistance').text($(this).text());
            });
        });
    }
    // ship is not selected, empty out the values
    else {
        // set the dial direction dropdown options
        $("#directionBS .dropdown-menu").empty();

        // set the dialDistance dropdown options
        $("#dialDistanceBS .dropdown-menu").empty();
    }
}
