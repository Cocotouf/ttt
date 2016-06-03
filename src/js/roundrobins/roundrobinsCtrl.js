(function(){
'use strict';

angular.module('ttt')
.controller('RoundrobinsController', RoundrobinsController);

function RoundrobinsController($scope, RoundrobinsSvc) {
  $scope.roundrobins = RoundrobinsSvc.getRoundrobins();
}

RoundrobinsController.$inject = ['$scope', 'RoundrobinsService'];
})();
