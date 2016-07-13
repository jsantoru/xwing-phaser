var CombatPanel = function() {
    this.init();
    
    $('.combatStep').click( function() {
        if(window.game.phases.selectedPhase == "Combat") {
            
            // TODO: logic around when it's valid to move to the next step
            
            $('.combatStep').removeClass("active");
            $(this).addClass("active");
        }
    });
}

CombatPanel.prototype.init = function() {
    $('#combatStep').each( function(index) {
        this.removeClass("active");    
    });
}   
