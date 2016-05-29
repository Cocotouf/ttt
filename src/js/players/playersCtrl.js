(function(){
'use strict';

angular.module('ttt')
.controller('PlayersController', PlayersController);

function PlayersController($scope, Players) {
	$scope.players = Players.getPlayers;
	$scope.newPlayer = {
		lastname: '',
		firstname: '',
		points: 500
	};
	
	$scope.addPlayer = function() {
		Players.addPlayer(angular.copy($scope.newPlayer));
		$scope.newPlayer = {
			lastname: '',
			firstname: '',
			points: 500
		};
		$scope.newPlayerForm.$setUntouched()
	};
	
	$scope.removePlayer = Players.removePlayer;
	$scope.cancelRemovePlayer = Players.cancelRemovePlayer;
}

PlayersController.$inject = ['$scope', 'PlayersService'];
})();
