'use strict';

/* Services */

var gamedbServices = angular.module('gamedbServices', ['ngResource']);

gamedbServices.factory('Game', ['$resource',
  function($resource){
    return $resource('http://localhost:8080/gamedbapi/game/:gameId', {}, {
      // query: {method:'GET', params:{gameId:'games'}, isArray:true}
    });
  }]);

gamedbServices.factory('GameSearch', ['$resource',
  function($resource){
    return $resource('http://localhost:8080/gamedbapi/search?v=:keyword', {}, {
    });
  }]);

gamedbServices.factory('Homepage', ['$resource',
  function($resource){
    return $resource('http://localhost:8080/gamedbapi/search?v=:keyword', {}, {
    });
  }]);