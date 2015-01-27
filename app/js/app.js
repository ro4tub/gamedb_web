'use strict';

/* App Module */

var gamedbApp = angular.module('gamedbApp', [
  'ngRoute',
  'ngSanitize',
  'btford.markdown',
  'gamedbAnimations',

  'gamedbControllers',
  'gamedbFilters',
  'gamedbServices'
]);

gamedbApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/game-search.html',
        controller: 'GameSearchCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);
