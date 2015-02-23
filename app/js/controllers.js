'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('GameSearchCtrl', ['$scope', '$rootScope', '$routeParams', 'GameSearch',
  function($scope, $rootScope, $routeParams, GameSearch) {
    $scope.games = [];
    
	if ( $routeParams.keyword) {
      $scope.text = $routeParams.keyword;  
      $rootScope.pageTitle = "Search \""+$scope.text+"\"";
    } else {
      $scope.text = "天天";  //default value
      $rootScope.pageTitle = "Welcome"
    }
    
	$scope.submit = function () {
      if($scope.text) {
        // rest查询
        $scope.games = GameSearch.query({keyword: $scope.text});
        $rootScope.pageTitle = "Search result of \""+$scope.text+"\"";
      }
    }
  }]);

gamedbControllers.controller('GameDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Game',
  function($scope, $rootScope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
	  	$scope.markdown = game.DetailDesc
		$rootScope.pageTitle = game.Name
		game.TAGs = "tag1;tag2;tag3"
		game.Platform = "iphone"
		game.Genre = "Action"
		game.ReleaseDate = "1998-10-01"
    });
	//console.dir($scope.game);
  }]);
