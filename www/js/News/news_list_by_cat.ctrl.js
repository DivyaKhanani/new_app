(function(){
	var app=angular.module('starter.controllers');

	app.controller("NewsByCatCtrl", function($scope, NewsService, $q, $http,$stateParams,$state,$ionicHistory, moment, API_URL,$rootScope,APP_URL){

		var self = this;
		$scope.newslist = [];
		$scope.newssubcategories=[];
		$rootScope.activepage=1;
	//   	NewsService.getNews().then(function(response){

		// 	$scope.newslist = response.data;

		//     console.log("Controller Events " , $scope.newslist);
		// }, function(err){
		// 	console.log(err);
		// });


		// var urlbase = 'http://actonatepanel.com/news/actonation/api';
		var	urlbase = API_URL;
	 	var in_progress = false;
		var page = 1;
		$scope.moredata = false;
		$scope.loaded = false;
		$scope.cat_loaded = false;
		$scope.error = false;
		$scope.getNewsListByCat=function(){
			NewsService.getNewsListByCat($stateParams.catId).then(function(response){
			$scope.loaded = true;
			$scope.newslist = response.data;
			if(response.data.status=="Error"){
					$scope.newslist= null;
				}
			console.log($scope.newslist);
			}, function(err){
				console.log(err);
				$scope.error = true;
				$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
			});
		}
		$scope.groups = [];
	  for (var i=0; i<10; i++) {
	    $scope.groups[i] = {
	      name: i,
	      items: []
	    };
	    for (var j=0; j<3; j++) {
	      $scope.groups[i].items.push(i + '-' + j);
	    }
	  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
	  $scope.toggleGroup = function(group,sub_table) {

	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;

	    } else {
	      $scope.shownGroup = group;
	      $rootScope.catNewslist='';	
	      $scope.showNewsListBySubCat(sub_table,group);
	    }
	  };
	  $scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	  };
		$scope.app_url = APP_URL;
		$scope.loaded = false;
		$scope.error = false;
		$rootScope.activepage=1;
		NewsService.getNewsSubCateories($stateParams.catId).then(function(response){
			$scope.cat_loaded = true;
			$scope.newssubcategories = response.data['0'];
			if(response.data.status=="Error"){
					$scope.newssubcategories= null;
				}
			console.log($scope.newssubcategories);
		}, function(err){
			console.log(err);
			$scope.error = true;
			$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
		});
		$scope.showNewsListBySubCat = function function_name(sub_table,cat_id) {
			
			NewsService.getNewsListBySubCat(sub_table,cat_id,0).then(function(response){	
			$rootScope.catNewslist= response.data;
			console.log($rootScope.catNewslist);
			if($scope.catNewslist.status=="Error"){
					$rootScope.catNewslist= null;
					$scope.show_footer=false;
				}
			
			}, function(err){
				console.log(err);
				$scope.error = true;
				$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
			});
			
		}

	
		$scope.refresh = function(){
			//$ionicHistory.clearCache();

			//$scope.newslist=[];
			$scope.getNewsListByCat();
			
			
			//$state.reload();
			 
			  //$state.reload();
		
		};
		$scope.loadMore = function() {
			if(in_progress) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
			if($scope.moredata) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

			in_progress = true;

	    	$http.get(urlbase + '/getNews/' + page).success(function(items) {
	    		$scope.loaded = true;
	    		page++;
	    		in_progress = false;
	    			console.log(items);
	    		if(items === "\"\""){ $scope.moredata = true; $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

	    		if($scope.newslist.length == 0)
	    		{
	    			$scope.newslist = items;
	    			return;
	    		}
	    		else{

	    			angular.forEach(items, function(news) {
					  this.push(news);
					}, $scope.newslist);

	    		}

		    	if(items.length <= 6)
		    	{
					$scope.moredata = true;
				}

	        	$scope.$broadcast('scroll.infiniteScrollComplete');

	    	})
	    	.error(function(data){
	    		$scope.error = true;
				$scope.error_message = "Sorry couldn't load the article. Please try again later or check your internet connection."
	    	})
		};

		$scope.$on('$stateChangeSuccess', function() {
			$scope.getNewsListByCat();
			$scope.getAdvertisment(2);


			//console.log($scope.newslist);
		});

		$scope.$on('refresh', function() {
			$scope.getNewsListByCat();
			$scope.refresh();
		});
		$scope.show_footer=true;
		$scope.hide_footer = function(){
			$scope.show_footer=false;
			
			
		};
		$scope.getAdvertisment = function(cat_id) {
				NewsService.getAdvertisment(cat_id).then(function(response){	
				$scope.adList= response.data;
				console.log($scope.adList);
				if(response.data.status=="Error"){
					$scope.adList= null;
					$scope.show_footer=false;
				}
			}, function(err){
				$scope.show_footer=false;
			});
			
		}

	});

		// $scope.update = function(selectedItem1){
  //   	console.log("called" , selectedItem1);
  //   		eventService.getCityEvents(selectedItem1).then(function(response){
		// 	console.log("Selected City" , selectedItem1);
		// 	$scope.eventlist = response.data;

		//     console.log("Controller Events " , $scope.eventlist);
		// }, function(err){
		// 	console.log(err);
		// });
  //   	};



})();
