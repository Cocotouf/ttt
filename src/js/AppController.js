(function(){
'use strict';

angular.module('ttt')
.controller('AppController', AppController);

function AppController($scope, $state) {
	$scope.isStateActive = $state.is;
}

AppController.$inject = ['$scope', '$state'];
})();
