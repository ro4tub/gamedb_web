'use strict';

/* App Module */

var gamedbApp = angular.module('gamedbApp', [
  'ngRoute',
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
        controller: 'PhoneListCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);
