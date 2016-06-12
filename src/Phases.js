var Phases = function() {
    var _this = this;
    this.selectedPhase = "";
    
    this.init();
    
    $('.phase').click( function() {
        $('.phase').removeClass("active");
        $(this).addClass("active");
        
        _this.selectedPhase = $(this).text();
    });
}

Phases.prototype.init = function() {
    var $planningPhase = $('#planningPhase');
    $planningPhase.addClass("active");
    this.selectedPhase = $planningPhase.text();
}
