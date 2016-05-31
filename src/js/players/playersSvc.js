(function(){
'use strict';

angular.module('ttt')
.service('PlayersService', PlayersService);

function PlayersService($timeout, $window) {
	var players = angular.fromJson($window.localStorage.getItem('ttt.players'));
	if (players === null) {
		players = [];
	}
	var removeTimeout;
	
	function save() {
		$window.localStorage.setItem('ttt.players', angular.toJson(players));
	}
	
	return {
		getPlayers: function() {
			return players;
		},
		getCount: function() {
			return players.length;
		},
		addPlayer: function(player) {
			players.push(player);
			save();
		},
		removePlayer: function(player) {
			player.removed = true;
			removeTimeout = $timeout(function() {
				players.splice(players.indexOf(player), 1);
				save();
			}, 2000);
		},
		cancelRemovePlayer: function(player) {
			if ($timeout.cancel(removeTimeout)) {
				delete player.removed;
			}
			
		}
	}
}

PlayersService.$inject = ['$timeout', '$window'];
})();
