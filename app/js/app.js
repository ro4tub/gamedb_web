'use strict';

/* App Module */

var gamedbApp = angular.module('gamedbApp', [
  'ngRoute',
  'ngSanitize',
  'btford.markdown',
  'gamedbControllers',
  'gamedbFilters',
  'gamedbServices'
]);

gamedbApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/homepage.html',
        controller: 'HomepageCtrl'
      }).
      when('/search/:keyword', {
        templateUrl: 'partials/game-search.html',
        controller: 'GameSearchCtrl'
      }).
      when('/search', {
        templateUrl: 'partials/game-search.html',
        controller: 'GameSearchCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
