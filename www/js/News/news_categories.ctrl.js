(function(){
	var app=angular.module('starter.controllers');

	app.controller("NewsCategoriesCtrl", function($scope, $rootScope, $http ,$stateParams, NewsService, $q, $cordovaSocialSharing, APP_URL){
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
	  $scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
	      $scope.shownGroup = group;
	    }
	  };
	  $scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	  };
		$scope.app_url = APP_URL;
		$scope.loaded = false;
		$scope.error = false;
		$rootScope.activepage=1;
		

	});

})();