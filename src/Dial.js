var Dial = function(dialConfig) {
    this.config = dialConfig;
}

Dial.prototype.getDirections = function() {
    var directionsList = [];
    $.each(this.config, function(key, element) {
        directionsList.push(key);
    });
    
    return directionsList;
}

Dial.prototype.getDistances = function(direction) {
    var $values = $(this.config[direction]);
    var distanceList = []
    // iterate through the value objects and return a list of ints
    $values.each( function(index) {
        var val = this;
        distanceList.push(val.distance);
    });
    
    return distanceList;
}
