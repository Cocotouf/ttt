(function(){
'use strict';

angular.module('ttt')
.service('PlayersService', PlayersService);

function PlayersService($timeout) {
	var players = [{lastname: 'Fenet', firstname: 'Christophe', points: 1174}, {lastname: 'Riot', firstname: 'Philippe', points: 612}, {lastname: 'Fenet', firstname: 'Régis', points: 500}];
	var removeTimeout;
	
	return {
		getPlayers: function() {
			return players;
		},
		getCount: function() {
			return players.length;
		},
		addPlayer: function(player) {
			players.push(player);
		},
		removePlayer: function(player) {
			player.removed = true;
			removeTimeout = $timeout(function() {
				players.splice(players.indexOf(player), 1);
			}, 2000);
		},
		cancelRemovePlayer: function(player) {
			if ($timeout.cancel(removeTimeout)) {
				delete player.removed;
			}
			
		}
	}
}

PlayersService.$inject = ['$timeout'];
})();
