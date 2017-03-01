(function(){
	var app=angular.module('starter.controllers');
	app.controller("NewsBySubCatCtrl", function($scope, $rootScope, $http ,$stateParams,$state,$ionicHistory, NewsService, $q, API_URL,APP_URL){

		var self = this;
		$scope.newscatlist = [];
		$rootScope.activepage=2;
		$scope.app_url = APP_URL;
	 	var in_progress = false;
		var page = 0;
		$scope.moredata = false;
		$scope.loaded = false;
		$scope.error = false;
		var cat_id =$stateParams.subCatId;
		$scope.cat_name=$stateParams.subName;
		
		/*NewsService.getNewsByCat($stateParams.newsId).then(function(response){
			cat_id=$stateParams.newsId;
			console.log(cat_id);
			$scope.loaded = true;
			$scope.newscatlist = response.data;
			//$scope.moredata = false;
			console.log($scope.newscatlist);
		}, function(err){
			console.log(err);
			$scope.error = true;
			$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
		});*/


		$scope.refresh = function(){
			$scope.newscatlist=[];
			console.log('refresh');
			$scope.moredata = false;
			page = 0;
			$scope.loadMore();
		};
		$scope.loadMore = function() {
			if(in_progress) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
			if($scope.moredata) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

			in_progress = true;

	    	NewsService.getNewsListBySubCat($stateParams.tnm,$stateParams.subCatId,page).then(function(response){
	    		$scope.loaded = true;
	    		page++;
	    		in_progress = false;
	    		items=response.data;
	    		console.log('here');
	    		console.log(items);
	    		console.log($scope.newscatlist);
	    		if(response.data.status=="Error"){
					$scope.items= "";
				}
	    		if(items === "\"\""){ $scope.moredata = true; $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

	    		if($scope.newscatlist.length == 0)
	    		{
	    			$scope.newscatlist = items;
	    			return;
	    		}
	    		else{
	    			angular.forEach(items, function(news) {
					  this.push(news);
					}, $scope.newscatlist);
	    		}

		    	if(items.length <= 6)
		    	{
					$scope.moredata = true;
				}

	        	$scope.$broadcast('scroll.infiniteScrollComplete');

	    	
	    	}, function(err){
	    		$scope.error = true;
				$scope.error_message = "Sorry couldn't load the article. Please try again later or check your internet connection."
	    	});
		};

		$scope.$on('$stateChangeSuccess', function() {
			$scope.loadMore();
			$scope.getAdvertisment(3);

		});

		$scope.$on('refresh', function() {
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

})();
