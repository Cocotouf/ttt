(function(){
'use strict';

angular.module('ttt')
.controller('AppController', AppController);

function AppController($window) {
	$window.onbeforeunload = function() {
		//return "";
	}
}

AppController.$inject = ['$window'];
})();
