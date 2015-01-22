'use strict';

/* Services */

var gamedbServices = angular.module('gamedbServices', ['ngResource']);

gamedbServices.factory('Game', ['$resource',
  function($resource){
    return $resource('games/:gameId.json', {}, {
      query: {method:'GET', params:{gameId:'games'}, isArray:true}
    });
  }]);
