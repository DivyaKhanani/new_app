(function(){
	var app=angular.module('starter.controllers');

	app.controller("NewsDetailCtrl", function($scope, $rootScope, $http ,$stateParams, NewsService, $q,$cordovaSocialSharing, APP_URL){

		$scope.app_url = APP_URL;
		$scope.loaded = false;
		$scope.error = false;
		$rootScope.activepage=1;
		NewsService.getNewsDetails($stateParams.newsTable,$stateParams.newsId).then(function(response){
			$scope.loaded = true;
			$scope.newsdetails = response.data;
		}, function(err){
			console.log(err);
			$scope.error = true;
			$scope.error_message = "Sorry couldn't load latest updates. Please try again later or check your internet connection.";
		});

		$scope.share = function(arg) {
            //window.plugins.socialsharing.share(arg);
            if($scope.newsdetails === undefined){ return; }
            arg = arg + ' - ' + $scope.newsdetails.short_desc +  '\nShared via Gujarat Samachar App ';
            $cordovaSocialSharing.share(arg);
        };


	});
})();
