(function () {
'use strict';

angular.module('ttt', ['ui.router', 'ngMaterial'])
.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
	$stateProvider
		.state('players', {
			url: "/players",
			templateUrl: "players/players.html",
			controller: "PlayersController"
		})
		.state('roundrobins', {
			url: "/roundrobins",
			templateUrl: "roundrobins/roundrobins.html",
			controller: "RoundrobinsController"
		})
		.state('brackets', {
			url: "/brackets",
			templateUrl: "brackets/brackets.html",
			controller: "BracketsController"
		})
  $urlRouterProvider.when('', '/players');
  $urlRouterProvider.otherwise('/players');
  
  $mdThemingProvider.theme('default')
  .accentPalette('orange', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
  })
  .primaryPalette('blue', {
    'default': '800', // by default use shade 400 from the pink palette for primary intentions
  })
})
})();
