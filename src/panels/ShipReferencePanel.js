var ShipReferencePanel = function() {
    // constructor
}

ShipReferencePanel.prototype.setup = function(ship) {
    // setup the shipRef
    $('#refCardImg').attr('src', ship.refcardImagePath);
    $('#refCardImg').show();

    $('#shipRefAttackVal').text(ship.stats.attack);
    $('#shipRefAgilityVal').text(ship.stats.agility);
    $('#shipRefHullVal').text(ship.stats.hull);
    $('#shipRefShieldVal').text(ship.stats.shield);
    $('#stats').show();
    
    $.each(ship.actions, function(index, element) {
        $('#actions').append("<h4><span class=\"label label-default\">" + element + "</span></h4>")
    });
    $('#actions').show();
}

ShipReferencePanel.prototype.tearDown = function() {
    $('#refCardImg').hide();
    $('#refCardImg').attr('src', '');

    $('#shipRefAttackVal').text("");
    $('#shipRefAgilityVal').text("");
    $('#shipRefHullVal').text("");
    $('#shipRefShieldVal').text("");
    $('#stats').hide();

    $('#actions').empty();
    $('#actions').hide();
}
