'use strict';

/* Services */

var gamedbServices = angular.module('gamedbServices', ['ngResource']);

gamedbServices.factory('Game', ['$resource',
  function($resource){
    //return $resource('http://localhost:8080/gamedbapi/game/:gameId', {}, {
    var res= $resource('http://huangyaoshi.me:8080/gamedbapi/game/:gameId', {}, {
      // query: {method:'GET', params:{gameId:'games'}, isArray:true}
    });
    return res;
  }]);

gamedbServices.factory('GameSearch', ['$resource',
  function($resource){
    //return $resource('http://localhost:8080/gamedbapi/search?v=:keyword&p=:platform&g=:genre', {}, {
    var res = $resource('http://huangyaoshi.me:8080/gamedbapi/search?v=:keyword&p=:platform&g=:genre', {}, {});
    return res;
  }]);

gamedbServices.factory('Homepage', ['$resource',
  function($resource){
    //return $resource('http://localhost:8080/gamedbapi/search?v=:keyword&p=:platform&g=:genre', {}, {
    var res = $resource('http://huangyaoshi.me:8080/gamedbapi/search?v=:keyword&p=:platform&g=:genre', {}, {});
    return res;
  }]);