(function(){
'use strict';

angular.module('ttt')
.directive('round', Round);

function Round(RoundrobinsSvc) {
	return {
		restrict: 'E',
		scope: {
		  roundId: '='
		},
		templateUrl: 'roundrobins/round.html',
		link: function(scope, elem, attrs) {
		  scope.round = RoundrobinsSvc.getRoundrobin(scope.roundId);
		  console.log(scope.roundId);
		}
	}
}

Round.$inject = ['RoundrobinsService'];
})();
