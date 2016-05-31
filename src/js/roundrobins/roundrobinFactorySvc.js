(function(){
'use strict';

angular.module('ttt')
.factory('RoundrobinFactory', RoundrobinFactory);

function RoundrobinFactory(PlayersSvc) {
	function Roundrobin(id, playersIds) {
		this.id = id;
		this.players = [];
		for (var i = 0; i < playersIds.length; ++i) {
			this.players.push(PlayersSvc.getPlayer(playersIds[i]));
		}
	}
	
	return Roundrobin;
}

RoundrobinFactory.$inject = ['PlayersService'];
})();
