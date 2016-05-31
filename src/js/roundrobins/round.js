(function(){
'use strict';

angular.module('ttt')
.directive('round', Round);

function Round() {
	return {
		restrict: 'E',
		templateUrl: 'roundrobins/round.html',
		link: function($scope, elem, attrs) {

		}
	}
}

Round.$inject = [];
})();
