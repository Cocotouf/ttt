(function(){
'use strict';

angular.module('ttt')
.component('players',{
	templateUrl: 'players/players.html',
	controller: PlayersController,
	controllerAs: '$players'
});

function PlayersController($scope, PlayersSvc, RoundRobinsSvc) {
	//FIXME getPlayers
	this.players = PlayersSvc.getPlayersByPoints;
	this.newPlayer = {
		lastname: '',
		firstname: '',
		points: 500
	};
	
	this.addPlayer = function() {
		PlayersSvc.addPlayer(angular.copy(this.newPlayer));
		this.newPlayer = {
			lastname: '',
			firstname: '',
			points: 500
		};
		$scope.newPlayerForm.$setUntouched()
	};
	
	this.removePlayer = PlayersSvc.removePlayer;
	this.cancelRemovePlayer = PlayersSvc.cancelRemovePlayer;
	this.generateRoundRobins = RoundRobinsSvc.generateRoundRobins;
}

PlayersController.$inject = ['$scope', 'PlayersService', 'RoundRobinsService'];
})();
