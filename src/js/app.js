(function () {
'use strict';

angular.module('ttt', ['ui.router', 'ngMaterial'])
.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$compileProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $compileProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
	$stateProvider
		.state('players', {
			url: "/players",
		})
		.state('roundrobins', {
			url: "/roundrobins",
		})
		.state('brackets', {
			url: "/brackets",
		})
  $urlRouterProvider.when('', '/players');
  $urlRouterProvider.otherwise('/players');
  
  $mdThemingProvider.theme('default')
  .accentPalette('orange', {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
  })
  .primaryPalette('blue', {
    'default': '800', // by default use shade 400 from the pink palette for primary intentions
  });
  
  $compileProvider.debugInfoEnabled(false)
}])
})();
