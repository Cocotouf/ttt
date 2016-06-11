(function(){
'use strict';

angular.module('ttt')
.component('roundRobins',{
	templateUrl: 'roundRobins/roundRobins.html',
	controller: RoundRobinsController,
	controllerAs: '$roundRobins'
});

function RoundRobinsController(RoundRobinsSvc) {
  this.roundRobins = RoundRobinsSvc.getRoundRobins();
}

RoundRobinsController.$inject = ['RoundRobinsService'];
})();
