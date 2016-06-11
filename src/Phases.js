var Phases = function() {
    
    var selectedPhase = "";
    
    this.init();
    
    $('.phase').click( function() {
        $('.phase').removeClass("active");
        $(this).addClass("active");
        
        selectedPhase = $(this).text();
    });
}

Phases.prototype.init = function() {
    var $planningPhase = $('#planningPhase');
    $planningPhase.addClass("active");
    this.selectedPhase = $planningPhase.text();
}
