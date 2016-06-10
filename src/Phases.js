var Phases = function() {
    
    $('.phase').click( function() {
        $('.phase').removeClass("active");
        $(this).addClass("active");
    });
}
