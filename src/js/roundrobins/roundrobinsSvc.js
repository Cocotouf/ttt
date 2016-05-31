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
		generateRoundrobins: function(players) {
			roundrobins = [];
			if (players.length % 3 === 0) {
				var rrn = players.length / 3;
				for (var i = 0; i < rrn; ++i) {
					roundrobins.push(new Roundrobin(i + 1, [players[i].id, players[2*rrn-i-1].id, players[2*rrn+i].id]));
				}
				console.log(roundrobins)
			}
			
			
		}
	}
}

RoundrobinsService.$inject = ['$window', 'RoundrobinFactory'];
})();
