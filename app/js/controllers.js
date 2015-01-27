'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('GameSearchCtrl', ['$scope', 'GameSearch',
  function($scope, GameSearch) {
	  $scope.games = [];
	  $scope.submit = function () {
		  if($scope.text) {
		  	 // rest查询
		     $scope.games = GameSearch.query({keyword: $scope.text});
		  }
	  }	
  }]);

gamedbControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', 'Game',
  function($scope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
	  	$scope.markdown = game.DetailDesc
    });
  }]);
