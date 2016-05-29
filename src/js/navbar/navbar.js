(function(){
'use strict';

angular.module('ttt')
.directive('navbar', Navbar);

function Navbar($state) {
	return {
    restrict: 'E',
    templateUrl: 'navbar/navbar.html',
    link: function($scope, element, attrs) {
    	$scope.isStateActive = $state.is;
    }
	}
}

Navbar.$inject = ['$state'];
})();
