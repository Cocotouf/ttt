(function(){
'use strict';

angular.module('ttt')
.component('round', {
	templateUrl: 'roundRobins/round.html',
	controller: Round,
	bindings: {
		roundId: '@'
	}
});

function Round(RoundRobinsSvc) {
	this.round = RoundRobinsSvc.getRoundrobin(this.roundId);
}

Round.$inject = ['RoundRobinsService'];
})();
