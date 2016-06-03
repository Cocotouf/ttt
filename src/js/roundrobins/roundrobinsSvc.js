(function(){
'use strict';

angular.module('ttt')
.service('RoundrobinsService', RoundrobinsService);

function RoundrobinsService($window, Roundrobin) {
	var roundrobins = angular.fromJson($window.localStorage.getItem('ttt.roundrobins'));
	if (roundrobins === null) {
		roundrobins = [];
	}
	
	function save() {
		$window.localStorage.setItem('ttt.roundrobins', angular.toJson(roundrobins));
	}

	return {
		getRoundrobins: function() {return roundrobins;},
    getRoundrobin: function(roundId) {
      for (var i = 0; i < roundrobins.length; ++i) {
        if (roundrobins[i].id === roundId) {
          return roundrobins[i];
        }
      }
      return false;
    },
		generateRoundrobins: function(players) {
			roundrobins = [];
			if (players.length % 3 === 0) {
				var rrn = players.length / 3;
				for (var i = 0; i < rrn; ++i) {
					roundrobins.push(new Roundrobin(i + 1, [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id]));
				}
			} else if (players.length % 3 === 1) {
				var rrn = (players.length-1) / 3;
				for (var i = 0; i < rrn; ++i) {
					var playersIds = [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id];
					if (i === rrn-1) {
						playersIds.push(players[players.length-1].id);
					}
					roundrobins.push(new Roundrobin(i + 1, playersIds));
				}
			} else if (players.length % 3 === 2) {
				var rrn = (players.length-2) / 3;
				for (var i = 0; i < rrn; ++i) {
					var playersIds = [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id];
					if (i === rrn-1) {
						playersIds.push(players[players.length-2].id);
					} else if (i === rrn-2) {
						playersIds.push(players[players.length-1].id);
					}
					roundrobins.push(new Roundrobin(i + 1, playersIds));
				}
			}
			
			save();
		}
	}
}

RoundrobinsService.$inject = ['$window', 'RoundrobinFactory'];
})();
