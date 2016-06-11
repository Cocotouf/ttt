(function(){
'use strict';

angular.module('ttt')
.component('round', {
	templateUrl: 'roundRobins/round.html',
	controller: Round,
  controllerAs: '$round',
	bindings: {
		roundId: '@'
	}
});

function Round(RoundRobinsSvc) {
	this.round = RoundRobinsSvc.getRoundRobin(this.roundId);
	
	this.onchange = function() {
	  RoundRobinsSvc.save();
	};
	
}

Round.$inject = ['RoundRobinsService'];
})();
