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

	RoundRobin.prototype.getSetsWon = function(playerId) {
	  var setsWon = 0;
	  this.matches.forEach(function(match) {
	    if (match.player1Id === playerId) {setsWon += match.score.player1;}
	    else if (match.player2Id === playerId) {setsWon += match.score.player2;}
	  });
	  return setsWon;
	};

  RoundRobin.prototype.getSetsLost = function(playerId) {
    var setsLost = 0;
    this.matches.forEach(function(match) {
      if (match.player1Id === playerId) {setsLost += match.score.player2;}
      else if (match.player2Id === playerId) {setsLost += match.score.player1;}
    });
    return setsLost;
  };

  RoundRobin.prototype.getSetsDiff = function(playerId) {
    var setsDiff = 0;
    this.matches.forEach(function(match) {
      if (match.player1Id === playerId) {setsDiff += match.score.player1 - match.score.player2;}
      else if (match.player2Id === playerId) {setsDiff += match.score.player2 - match.score.player1;}
    });
    return setsDiff;
  };

  RoundRobin.prototype.getVictories = function(playerId) {
    var victories = 0;
    this.matches.forEach(function(match) {
      if (match.player1Id === playerId && match.score.player1 === 3) {victories++}
      else if (match.player2Id === playerId && match.score.player2 === 3) {victories++}
    });
    return victories;
  };

  RoundRobin.prototype.getPlayer = function(playerId) {
    for (var i = 0; i < this.players.length; ++i) {
      if (this.players[i].id === playerId) {
        return this.players[i];
      }
    }
    return false;
  };
  
  function sortPlayersByVictories(player1, player2) {
    //By victories
    var player1v = this.getVictories(player1.id),
        player2v = this.getVictories(player2.id);
    if (player1v > player2v) {
      return -1;
    } else if (player2v > player1v) {
      return 1;
    }
    //By set difference
    var player1sd = this.getSetsDiff(player1.id),
        player2sd = this.getSetsDiff(player2.id);
    if (player1sd > player2sd) {
      return -1;
    } else if (player2sd > player1sd) {
      return 1;
    }
    //By set best scorer
    var player1sw = this.getSetsWon(player1.id),
        player2sw = this.getSetsWon(player2.id);
    if (player1sw > player2sw) {
      return -1;
    } else if (player2sw > player1sw) {
      return 1;
    }
    //By name
    return (player1.lastname+player1.firstname > player2.lastname+player2.firstname ? 1 : -1);
  }
  
  RoundRobin.prototype.getPlayersByVictories = function() {
    return this.players.sort(sortPlayersByVictories.bind(this));
  };
	
	return RoundRobin;
}

RoundRobinFactory.$inject = ['PlayersService'];
})();
