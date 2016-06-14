var FiringArc = function() {
    
}

FiringArc.prototype.render = function($ship) {
    $ship.append('<div class="firing-arc arc-wrapper"><div class="range3"><div class="range2"><div class="range1"></div></div></div></div>');
}

FiringArc.prototype.remove = function() {
    $('.firing-arc').remove();
}
