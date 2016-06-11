var Phases = function() {
    
    var selectedPhase = "";
    
    this.setDefaultPhase();
    
    $('.phase').click( function() {
        $('.phase').removeClass("active");
        $(this).addClass("active");
        
        selectedPhase = $(this).text();
    });
}

Phases.prototype.setDefaultPhase = function() {
    var $planningPhase = $('#planningPhase');
    $planningPhase.addClass("active");
    this.selectedPhase = $planningPhase.text();
}
