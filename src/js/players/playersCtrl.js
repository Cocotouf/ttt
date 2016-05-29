(function(){
'use strict';

angular.module('ttt')
.controller('PlayersController', PlayersController);

function PlayersController($scope, Players, $timeout) {
	$scope.players = Players.getPlayers;
}

PlayersController.$inject = ['$scope', 'PlayersService', '$timeout'];
})();
