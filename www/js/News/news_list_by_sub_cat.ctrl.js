(function(){
	var app=angular.module('starter.controllers');
	app.controller("NewsBySubCatCtrl", function($scope, $rootScope, $http ,$stateParams, NewsService, $q, API_URL){

		var self = this;
		$scope.newscatlist = [];
		$rootScope.activepage=2;
		$scope.app_url = API_URL;
	 	var in_progress = false;
		var page = 1;
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
			page = 1;
			$scope.loadMore();
			
		};
		$scope.loadMore = function() {
			if(in_progress) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
			if($scope.moredata) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

			in_progress = true;

	    	NewsService.getNewsListBySubCat($stateParams.tnm,$stateParams.subCatId).then(function(response){
	    		$scope.loaded = true		;
	    		page++;
	    		in_progress = false;
	    		items=response.data;
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
		});

		$scope.$on('refresh', function() {
			$scope.refresh();
		});


  });

})();
