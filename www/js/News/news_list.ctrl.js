(function(){
	var app=angular.module('starter.controllers');

	app.controller("NewsCtrl", function($scope, NewsService, $q, $http,$stateParams,$state, moment, API_URL,$rootScope,APP_URL){
		
		var self = this;
		$scope.newslist = [];
		$rootScope.activepage=1;
	//   	NewsService.getNews().then(function(response){

		// 	$scope.newslist = response.data;

		//     console.log("Controller Events " , $scope.newslist);
		// }, function(err){
		// 	console.log(err);
		// });
		/*For Slider*/

		// var urlbase = 'http://actonatepanel.com/news/actonation/api';
		var	urlbase = API_URL;
	 	var in_progress = false;
		var page = 1;
		$scope.moredata = false;
		$scope.loaded = false;
		$scope.cat_loaded = false;
		$scope.error = false;

		$scope.getNewsCateoriesList=function(){
			NewsService.getNewsCateories($stateParams).then(function(response){
				$scope.cat_loaded = true;
				$scope.newscategories = response.data;

				console.log($scope.newscategories);
				if(response.data==0){
					$scope.newscategories="";
				}
				//console.log($scope.newscategories);
			}, function(err){
				console.log(err);
				$scope.error = true;
				$scope.newscategories ="";
				$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
			});
		}
		$scope.getNewsFeaturedList=function(){
			NewsService.getNewsFeaturedList($stateParams).then(function(response){
				$scope.loaded = true;
				$scope.newslist = response.data;
				console.log($scope.newslist);
			}, function(err){
				console.log(err);
				$scope.error = true;
				$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
			});
		}
		/*$scope.groups = [];
	  for (var i=0; i<10; i++) {
	    $scope.groups[i] = {
	      name: i,
	      items: []
	    };
	    for (var j=0; j<3; j++) {
	      $scope.groups[i].items.push(i + '-' + j);
	    }
	  }*/
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
	  $scope.toggleGroup = function(group) {

	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;

	    } else {
	      $scope.shownGroup = group;
	      $scope.catNewslist='';	
	      $scope.showNewsListByCat(group);
	    }
	  };
	  $scope.toggleGroupMenu = function(group) {

	    if ($scope.isGroupShownMenu(group)) {
	      $scope.shownGroupMenu = null;

	    } else {
	      $scope.shownGroupMenu = group;
	    }
	  };
	  $scope.isGroupShownMenu = function(group) {
	    return $scope.shownGroupMenu === group;
	  };
	  $scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	  };
	  
		$scope.app_url = APP_URL;
		$scope.loaded = false;
		$scope.error = false;
		$rootScope.activepage=1;
		$scope.showNewsListByCat = function function_name(cat_id) {
				NewsService.getNewsListByCat(cat_id).then(function(response){	
				$scope.catNewslist= response.data;
				console.log($scope.catNewslist);
				if(response.data.status=="Error"){
					$scope.catNewslist= null;
				}
			}, function(err){
				console.log(err);
				$scope.error = true;
				$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
			});
			
		}

	
		$scope.refresh = function(){
			$scope.getNewsFeaturedList();
			$scope.getNewsCateoriesList();
			
			$scope.moredata = false;
			page = 1;
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
			$scope.getNewsCateoriesList();
			$scope.getNewsFeaturedList();
			$scope.getAdvertisment(1);


			//console.log($scope.newslist);
		});

		$scope.$on('refresh', function() {
			$scope.getNewsCateoriesList();
			
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
