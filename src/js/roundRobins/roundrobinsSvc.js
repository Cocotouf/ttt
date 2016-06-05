(function(){
'use strict';

angular.module('ttt')
.service('RoundRobinsService', RoundRobinsService);

function RoundRobinsService($window, Roundrobin) {
	var roundRobins = angular.fromJson($window.localStorage.getItem('ttt.roundRobins'));
	if (roundRobins === null) {
		roundRobins = [];
	}
	
	function save() {
		$window.localStorage.setItem('ttt.roundRobins', angular.toJson(roundRobins));
	}

	return {
		getRoundRobins: function() {return roundRobins;},
    getRoundrobin: function(roundId) {
      for (var i = 0; i < roundRobins.length; ++i) {
      	//roundId is a string
        if (roundRobins[i].id == roundId) {
          return roundRobins[i];
        }
      }
      return false;
    },
		generateRoundRobins: function(players) {
			roundRobins = [];
			if (players.length % 3 === 0) {
				var rrn = players.length / 3;
				for (var i = 0; i < rrn; ++i) {
					roundRobins.push(new Roundrobin(i + 1, [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id]));
				}
			} else if (players.length % 3 === 1) {
				var rrn = (players.length-1) / 3;
				for (var i = 0; i < rrn; ++i) {
					var playersIds = [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id];
					if (i === rrn-1) {
						playersIds.push(players[players.length-1].id);
					}
					roundRobins.push(new Roundrobin(i + 1, playersIds));
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
					roundRobins.push(new Roundrobin(i + 1, playersIds));
				}
			}
			
			save();
		}
	}
}

RoundRobinsService.$inject = ['$window', 'RoundrobinFactory'];
})();
