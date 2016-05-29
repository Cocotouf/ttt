(function(){
'use strict';

angular.module('ttt')
.controller('PlayersController', PlayersController);

function PlayersController($scope) {
  $scope.test = 'toto';
}

PlayersController.$inject = ['$scope'];
})();
