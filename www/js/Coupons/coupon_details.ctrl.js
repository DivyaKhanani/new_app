(function(){
	var app=angular.module('starter.controllers');

	app.controller("CouponDetailCtrl", function($scope, $rootScope, $http ,$stateParams, $q, $cordovaSocialSharing, APP_URL,API_URL){
		$scope.app_url = APP_URL;
		$scope.loaded = false;
		$scope.error = false;
		var urlbase = API_URL;
		$rootScope.activepage=3;
		$scope.coupon={};
		$http.post(urlbase + '/getCouponDetails', {
		  'id': $stateParams
		}).
		success(function(response, status, headers, config) {
			$scope.loaded = true;
		  var NewsDetails = response;
			$scope.coupon=response;
		  console.log("Coupon events-" + response);

		}).
		error(function(data) {
		  //alert("Sorry, could not load the article. Please try again later.");
			console.log('err-'+data);
			$scope.error = true;
			$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
		});

		// NewsService.getNewsDetails($stateParams).then(function(response){
		// 	$scope.loaded = true;
		// 	$scope.newsdetails = response.data;
		// }, function(err){
		// 	console.log(err);
		// 	$scope.error = true;
		// 	$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection."
		// });

		$scope.share = function() {
      //window.plugins.socialsharing.share(arg);
      if($scope.coupon === undefined){ return; }
      var arg = $scope.coupon.Coupon.title + ' - ' + $scope.coupon.Coupon.short_desc +  '\nShared via Our Vadodara App ' + $scope.app_url;
      $cordovaSocialSharing.share(arg);
    };

  });

})();
