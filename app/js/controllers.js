'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('GameSearchCtrl', ['$scope', '$rootScope', 'GameSearch',
  function($scope, $rootScope, GameSearch) {
	  $scope.games = [];
	  $scope.text = "天天";  
	  $scope.submit = function () {
		  if($scope.text) {
		  	 // rest查询
		     $scope.games = GameSearch.query({keyword: $scope.text});
		  }
	  }
	  $rootScope.pageTitle = "Welcome"
  }]);

gamedbControllers.controller('GameDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Game',
  function($scope, $rootScope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
	  	$scope.markdown = game.DetailDesc
		$rootScope.pageTitle = game.Name
    });
  }]);
