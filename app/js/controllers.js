'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('HomepageCtrl', ['$scope', '$rootScope', '$routeParams', 'Homepage',
  function($scope, $rootScope, $routeParams, Homepage) {
	  $scope.text = "Hello world!";
	  $scope.topfree = Homepage.query({keyword: 'Test Drive Le Mans'});
	  $scope.toppaid = Homepage.query({keyword: 'Final Fantasy'});
	  $scope.topgrossing = Homepage.query({keyword: '天天'});
  }]);

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
        window.location = "#/search/" + $scope.text;
      }
    }

      if($scope.text) {
        // rest查询
        $scope.games = GameSearch.query({keyword: $scope.text});
        $rootScope.pageTitle = "Search result(s) of \""+$scope.text+"\"";
      }	
	
	$scope.GetRandomPlatform = function (g) {
	  var platforms=new Array('pc'
		, 'dreamcast', 'saturn', 'segacd ', 'genesis'
		, 'ouya'
		, 'ngage'
		, 'mac'
		, 'xbox', 'xboxone', 'xbox360'
		, 'ps', 'ps2', 'ps3', 'ps4', 'psp', 'vita'
		, 'snes', 'ds3', 'ds', 'gameboy', 'gamecube', 'gba', 'gbc', 'n64', 'wii', 'wii-u'
		, 'iphone', 'mobile');
		var c=Math.floor(Math.random()*platforms.length);
		g.Platform = platforms[c];
		return g.Platform;		
	}
	$scope.GetRandomGenre = function (g) {
	  var genres=new Array('Action'
		, 'Adventure', 'RPG', 'Casual ', 'Strategy'
		, 'Puzzle', 'Racing', 'Simulation', 'Sports', 'Music' );
		var c=Math.floor(Math.random()*genres.length);
		g.Genre = genres[c];		
		return g.Genre;
	}	
	$scope.GetRandomTAGs = function (g) {
		g.TAGs = 'tag1 tag2 tag3';
		return g.TAGs;
	}
	$scope.GetRandomReleaseDate = function (g) {
		g.ReleaseDate = '1900-01-01';
		return g.ReleaseDate;
	}
	$rootScope.getEncoding = function(s) {
		// http://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
		// /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
		//   -------------_____________-------------_____________-------------_____________
		//    Punctuation   Hiragana     Katakana    Full-width       CJK      CJK Ext. A
		//                                             Roman/      (Common &      (Rare)    
		//                                           Half-width    Uncommon)
		//                                            Katakana	
		if (s.match(/[\u4e00-\u9faf]/)) {
			return "CJK";
		} else if (s.match(/[\u3040-\u30ff]/)) {
			return "Japanese";
		} else {
			return "Regular";
		}
	}	
  }]);

gamedbControllers.controller('GameDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Game',
  function($scope, $rootScope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
	  	$scope.markdown = game.DetailDesc
		$rootScope.pageTitle = game.Name
		if (!game.TAGs) {
			game.TAGs = $scope.GetRandomTAGs(game);
		}
		if (!game.Platform) {
			game.Platform = $scope.GetRandomPlatform(game);
		}
		if (!game.Genre) {
			game.Genre = $scope.GetRandomGenre(game);
		}
		if (!game.ReleaseDate) {
			game.ReleaseDate = $scope.GetRandomReleaseDate(game);
		}
		
		game.Encoding = $rootScope.getEncoding(game.Name);
    });
	
	$scope.GetRandomPlatform = function (g) {
	  var platforms=new Array('pc'
		, 'dreamcast', 'saturn', 'segacd ', 'genesis'
		, 'ouya'
		, 'ngage'
		, 'mac'
		, 'xbox', 'xboxone', 'xbox360'
		, 'ps', 'ps2', 'ps3', 'ps4', 'psp', 'vita'
		, 'snes', 'ds3', 'ds', 'gameboy', 'gamecube', 'gba', 'gbc', 'n64', 'wii', 'wii-u'
		, 'iphone', 'mobile');
		var c=Math.floor(Math.random()*platforms.length);
		g.Platform = platforms[c];
		return g.Platform;		
	}
	$scope.GetRandomGenre = function (g) {
	  var genres=new Array('Action'
		, 'Adventure', 'RPG', 'Casual ', 'Strategy'
		, 'Puzzle', 'Racing', 'Simulation', 'Sports', 'Music' );
		var c=Math.floor(Math.random()*genres.length);
		g.Genre = genres[c];		
		return g.Genre;
	}	
	$scope.GetRandomTAGs = function (g) {
		g.TAGs = 'tag1 tag2 tag3';
		return g.TAGs;
	}
	$scope.GetRandomReleaseDate = function (g) {
		g.ReleaseDate = '1900-01-01';
		return g.ReleaseDate;
	}
	$rootScope.getEncoding = function(s) {
		// http://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
		// /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
		//   -------------_____________-------------_____________-------------_____________
		//    Punctuation   Hiragana     Katakana    Full-width       CJK      CJK Ext. A
		//                                             Roman/      (Common &      (Rare)    
		//                                           Half-width    Uncommon)
		//                                            Katakana	
		if (s.match(/[\u4e00-\u9faf]/)) {
			return "CJK";
		} else if (s.match(/[\u3040-\u30ff]/)) {
			return "Japanese";
		} else {
			return "Regular";
		}
	}		
  }]);
  
