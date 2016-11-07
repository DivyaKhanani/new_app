(function() {
  var app = angular.module('starter.controllers');

  app.controller("ImpNumbersCtrl", function($scope, $location, $anchorScroll, $ionicScrollDelegate, $http, $stateParams, $q, $cordovaSocialSharing, APP_URL,API_URL,$rootScope) {

    var self = this;
    $scope.eventlist = [];
    $rootScope.activepage=4;
    // var urlbase = 'http://actonatepanel.com/news/actonation/api';
    var	urlbase = API_URL;
    $scope.loaded = false;
    $scope.error = false;

    $http.get(urlbase + '/getContactType').
			success(function(contacts) {
        $scope.loaded = true;
        $scope.contacts=contacts;
      })
      .error(function(data) {
        $scope.error = true;
        $scope.error_message = "Sorry couldn't load important numbers. Please try again later or check your internet connection.";
      });

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
        $scope.$apply();
        // $location.hash(group);
        // var handle = $ionicScrollDelegate.$getByHandle('content');
        // handle.anchorScroll();
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

  });
})();
