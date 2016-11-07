(function(){
	var app=angular.module('starter.controllers');

	app.controller("CouponsCtrl", function($scope, $q, $http, moment, API_URL,$rootScope){

		var self = this;
		$scope.couponList = [];
		$rootScope.activepage=3;
	//   	NewsService.getNews().then(function(response){

		// 	$scope.eventlist = response.data;

		//     console.log("Controller Events " , $scope.eventlist);
		// }, function(err){
		// 	console.log(err);
		// });

		console.log('events-'+angular.toJson($scope.eventlist));

		//var urlbase = 'http://actonatepanel.com/news/actonation/api';
		var	urlbase = API_URL;
	 	var in_progress = false;
		var page = 1;
		$scope.moredata = false;
		$scope.loaded = false;
		$scope.error = false;

		$scope.refresh = function(){
			$scope.couponList=[];
			console.log('refresh');
			$scope.moredata = false;
			page = 1;
			$scope.loadMore();
		};
		$scope.loadMore = function() {
			if(in_progress) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
			if($scope.moredata) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

			in_progress = true;

	    	$http.get(urlbase + '/getAllCoupons/' + page).success(function(items) {
	    		$scope.loaded = true;
	    		page++;
	    		in_progress = false;

	    		if(items === "\"\""){ $scope.moredata = true; $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
					for(var i=0;i<items.length;i++){
						var today = moment(new Date()).format("MMMM DD YYYY");
						var b = moment(new Date(items[i].Coupon.published_date)).format("MMMM DD YYYY");

						if(today==b){
							items[i].Coupon.isToday=true;
						}
						else{
							items[i].Coupon.isToday=false;
						}
					}
	    		if($scope.couponList.length == 0)
	    		{
	    			$scope.couponList = items;
	    			return;
	    		}
	    		else{
	    			angular.forEach(items, function(coupon) {
					  this.push(coupon);
					}, $scope.couponList);
	    		}

		    	if(items.length <= 6)
		    	{
					$scope.moredata = true;
				}
					console.log('coupon-list-'+angular.toJson($scope.couponList));
	        	$scope.$broadcast('scroll.infiniteScrollComplete');

	    	})
	    	.error(function(data){
	    		$scope.error = true;
				$scope.error_message = "Sorry couldn't load the article. Please try again later or check your internet connection.";
			});
		};

		$scope.$on('$stateChangeSuccess', function() {
			$scope.loadMore();
		});

		$scope.$on('refresh', function() {
			$scope.refresh();
		});


		// var self = this;
    // $scope.loaded=true;
		// $scope.couponList = [
    //   {
    //     id:1,
    //     image: '/app/webroot/files/news/image_name//small_',
    //     title: 'Buy 1 Get 1 Free',
    //     short_desc: 'Brewberry\'s Cafe',
    //     published_date: new Date()
    //   },
    //   {
    //     id:2,
    //     image: '/app/webroot/files/news/image_name//small_',
    //     title: 'Get 50% Off',
    //     short_desc: 'Dunkin Donuts',
    //     published_date: new Date()
    //   }
    // ];

  });

})();
