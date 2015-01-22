'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('PhoneListCtrl', ['$scope', 'Game',
  function($scope, Game) {
    $scope.games = Game.query();
  }]);

gamedbControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', 'Game',
  function($scope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
      $scope.mainImageUrl = game.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
