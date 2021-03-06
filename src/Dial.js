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

Dial.prototype.buildMoveTemplateId = function() {
    return this.direction + "-" + this.distance
}
