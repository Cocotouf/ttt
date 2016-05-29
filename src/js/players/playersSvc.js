(function(){
'use strict';

angular.module('ttt')
.service('PlayersService', PlayersService);

function PlayersService() {
	var players = [{lastname: 'Fenet', firstname: 'Christophe', points: 1174}, {lastname: 'Riot', firstname: 'Philippe', points: 612}, {lastname: 'Fenet', firstname: 'Régis', points: 500}];
	
	return {
		addPlayer: function(player) {
			players.push(player);
		},
		removePlayer: function(player) {
			players.splice(players.indexOf(player, 1));
		},
		getPlayers: function() {
			return players;
		}
	}
}

PlayersService.$inject = [];
})();
