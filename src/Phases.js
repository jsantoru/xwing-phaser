var Phases = function() {
    
    var selectedPhase = "";
    
    $('.phase').click( function() {
        $('.phase').removeClass("active");
        $(this).addClass("active");
        
        selectedPhase = $(this).text();
    });
}
