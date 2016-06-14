var ShipInfoPanel = function() {
}

ShipInfoPanel.prototype.setup = function(ship) {
    $('#shipInfoIdVal').text(ship.shipName);
    $('#shipInfoTypeVal').text(ship.shipType);
    
    $('#shipInfoMovedThisRoundVal').text(ship.movedThisRound);
    $('#shipInfoAttackedThisRoundVal').text(ship.attackedThisRound);
    
    $('#shipInfoShieldRemainingVal').text(ship.shieldRemaining);
    $('#shipInfoHullRemainingVal').text(ship.hullRemaining);
    
    $('#shipInfoFocusTokensVal').text(ship.numFocusTokens);
    $('#shipInfoStressTokensVal').text(ship.numStressTokens);
    $('#shipInfoEvadeTokensVal').text(ship.numEvadeTokens);
    
    $('#shipInfoOutTargetLocksVal').text(ship.outgoingTargetLocks.length);
    $('#shipInfoInTargetLocksVal').text(ship.incomingTargetLocks.length);
    
    $('#shipInfoCollapse').show();
}

ShipInfoPanel.prototype.tearDown = function() {
    $('#shipInfoIdVal').text('');
    $('#shipInfoTypeVal').text('');
    
    $('#shipInfoMovedThisRoundVal').text('');
    $('#shipInfoAttackedThisRoundVal').text('');
    
    $('#shipInfoShieldRemainingVal').text('');
    $('#shipInfoHullRemainingVal').text('');
    
    $('#shipInfoFocusTokensVal').text('');
    $('#shipInfoStressTokensVal').text('');
    $('#shipInfoEvadeTokensVal').text('');
    
    $('#shipInfoOutTargetLocksVal').text('');
    $('#shipInfoInTargetLocksVal').text('');
    
    $('#shipInfoCollapse').hide();
}
