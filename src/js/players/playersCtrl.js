(function(){
'use strict';

angular.module('ttt')
.controller('PlayersController', PlayersController);

function PlayersController($scope, PlayersSvc, RoundrobinsSvc) {
	//FIXME getPlayers
	$scope.players = PlayersSvc.getPlayersByPoints;
	$scope.newPlayer = {
		lastname: '',
		firstname: '',
		points: 500
	};
	
	$scope.addPlayer = function() {
		PlayersSvc.addPlayer(angular.copy($scope.newPlayer));
		$scope.newPlayer = {
			lastname: '',
			firstname: '',
			points: 500
		};
		$scope.newPlayerForm.$setUntouched()
	};
	
	$scope.removePlayer = PlayersSvc.removePlayer;
	$scope.cancelRemovePlayer = PlayersSvc.cancelRemovePlayer;
	$scope.generateRoundrobins = RoundrobinsSvc.generateRoundrobins;
}

PlayersController.$inject = ['$scope', 'PlayersService', 'RoundrobinsService'];
})();
