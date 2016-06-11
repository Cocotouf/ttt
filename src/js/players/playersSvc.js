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
  function generatePlayerId() {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 16; ++i) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }
	
	return {
		getPlayers: function() {
			return players;
		},
		getPlayersByPoints: function() {
			return players.sort(function(a,b){return b.points - a.points});
		},
		getPlayer: function(playerId) {
			for (var i = 0; i < players.length; ++i) {
				if (players[i].id === playerId) {
					return players[i];
				}
			}
			return false;
		},
		getCount: function() {
			return players.length;
		},
		addPlayer: function(player) {
			player.id = generatePlayerId();
			player.lastname = player.lastname.toUpperCase();
			players.push(player);
			save();
		},
		removePlayer: function(player) {
			player.removed = true;
			removeTimeout = $timeout(function() {
			  for (var i = 0; i < players.length; ++i) {
			    if (players[i].id === player.id) {
		        players.splice(i, 1);
		        break;
			    }
			  }
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
