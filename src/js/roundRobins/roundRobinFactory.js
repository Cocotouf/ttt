(function(){
'use strict';

angular.module('ttt')
.factory('RoundRobinFactory', RoundRobinFactory);

function RoundRobinFactory(PlayersSvc) {
	function RoundRobin(id, playersIds, matches) {
		this.id = id;
		this.players = [];
		for (var i = 0; i < playersIds.length; ++i) {
			this.players.push(PlayersSvc.getPlayer(playersIds[i]));
		}
		
		if (matches !== undefined) {
		  this.matches = matches;
		} else {
  		if (this.players.length === 3) {
  		  this.matches = [
          {
            player1Id: this.players[0].id,
            player2Id: this.players[2].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[1].id,
            player2Id: this.players[2].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[0].id,
            player2Id: this.players[1].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
        ];
  		} else if (this.players.length === 4) {
        this.matches = [
          {
            player1Id: this.players[0].id,
            player2Id: this.players[3].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[1].id,
            player2Id: this.players[2].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[0].id,
            player2Id: this.players[2].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[1].id,
            player2Id: this.players[3].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[0].id,
            player2Id: this.players[1].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
          {
            player1Id: this.players[2].id,
            player2Id: this.players[3].id,
            score: {
              player1: 0,
              player2: 0
            }
          },
        ];
  		}
		}
	}

	RoundRobin.prototype.getSetsWon = function(player) {
	  var setsWon = 0;
	  this.matches.forEach(function(match) {
	    if (match.player1Id === player.id) {setsWon += match.score.player1;}
	    else if (match.player2Id === player.id) {setsWon += match.score.player2;}
	  });
	  return setsWon;
	};

  RoundRobin.prototype.getSetsLost = function(player) {
    var setsLost = 0;
    this.matches.forEach(function(match) {
      if (match.player1Id === player.id) {setsLost += match.score.player2;}
      else if (match.player2Id === player.id) {setsLost += match.score.player1;}
    });
    return setsLost;
  };

  RoundRobin.prototype.getSetsDiff = function(player) {
    var setsDiff = 0;
    this.matches.forEach(function(match) {
      if (match.player1Id === player.id) {setsDiff += match.score.player1 - match.score.player2;}
      else if (match.player2Id === player.id) {setsDiff += match.score.player2 - match.score.player1;}
    });
    return setsDiff;
  };
	
	return RoundRobin;
}

RoundRobinFactory.$inject = ['PlayersService'];
})();
