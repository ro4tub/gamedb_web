'use strict';

/* Controllers */

var gamedbControllers = angular.module('gamedbControllers', []);

gamedbControllers.controller('HomepageCtrl', ['$scope', '$rootScope', '$routeParams', 'Homepage',
  function($scope, $rootScope, $routeParams, Homepage) {
	  $scope.text = "Hello world!";
	  $scope.topgrossing = Homepage.get({keyword: 'Final Fantasy', platform: 'ps2'});
	  $scope.topfree = Homepage.get({keyword: 'Final Fantasy', platform: 'ps3'});
	  $scope.toppaid = Homepage.get({keyword: 'Zelda', platform: 'gamecube'});

	$scope.submit = function () {
      //if($scope.keywordInput)
	  {
        window.location = "#/search/v=" + $scope.keywordInput;
      }
    }
  }]);

gamedbControllers.controller('GameSearchCtrl', ['$scope', '$rootScope', '$routeParams', 'GameSearch',
  function($scope, $rootScope, $routeParams, GameSearch) {
    $scope.games = [];
	
    $scope.keywordInput = "腾讯";  //default value
	$scope.tagInput = "VR";
	$scope.platformInput = "0";
	$scope.yearInput = "0"; // at any time
	$scope.genreInput = "0";
	if ( $routeParams.keyword) {
		var vars = [], hash;
		var hashes = $routeParams.keyword.slice($routeParams.keyword.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		//console.log(vars);
	
      $scope.keywordInput	= (vars["v"] != undefined ? vars["v"] : "腾讯");// $routeParams.keyword;  
	  $scope.platformInput	= (vars["p"] != undefined ? vars["p"] : "0");
	  $scope.yearInput		= (vars["y"] != undefined ? vars["y"] : "0");
	  $scope.genreInput		= (vars["g"] != undefined ? vars["g"] : "0");
	  
      $rootScope.pageTitle = "Search \""+$scope.keywordInput+"\"";
    } else {
      $rootScope.pageTitle = "Welcome"
    }
	
	$scope.submit = function () {
      //if($scope.keywordInput)
	  {
        window.location = "#/search/v=" + $scope.keywordInput +
								($scope.platformInput != "0" ? "&p=" + $scope.platformInput : "") +
								($scope.genreInput != "0" ? "&g=" + $scope.genreInput : "") +
								($scope.yearInput != "0" ? "&y=" + $scope.yearInput : "");
      }
    }

    //if($scope.keywordInput)
	{
        // rest查询
        if ( $scope.genreInput != "0") {
			if ( $scope.platformInput != "0") {
				$scope.games = GameSearch.get({keyword: $scope.keywordInput, platform: $scope.platformInput, genre: $scope.genreInput});
			}
			else
			{
				$scope.games = GameSearch.get({keyword: $scope.keywordInput,                                 genre: $scope.genreInput});
			}
		}
		else
		{
			if ( $scope.platformInput != "0") {
				$scope.games = GameSearch.get({keyword: $scope.keywordInput, platform: $scope.platformInput });
			}
			else {
				$scope.games = GameSearch.get({keyword: $scope.keywordInput                                 });
			}
		}
		
        $rootScope.pageTitle = "Search result(s) of \"v=" + $scope.keywordInput + "&p=" + $scope.platformInput + "&g=" + $scope.genreInput +"\"";
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
		$("editform").hide()
		$("#inputDetailDesc").markdown()
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
	
	$scope.toogleEdit = function () {
		$scope.editable = true
	}
	
	$scope.submit = function () {
	 {
		 $scope.game.$save()
     }
    }	
  }]);
  
