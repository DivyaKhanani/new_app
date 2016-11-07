(function(){
	var app=angular.module('starter.controllers');

	app.controller("AboutCtrl", function($scope,$rootScope){

		$rootScope.activepage=5;
		$scope.openFB = function(){
			if(device.platform !== "iOS"){
				window.open('https://facebook.com/ourvadodara', '_blank', 'location=yes');
				return false;
			}

			// var scheme;

			// // Don't forget to add the org.apache.cordova.device plugin!
			// if(device.platform === 'iOS') {
			//     scheme = 'fb://';
			// }
			// else if(device.platform === 'Android') {
			//     scheme = 'com.facebook.katana';
			// }

			// appAvailability.check(
			//     scheme,       // URI Scheme or Package Name
			//     function() {  // Success callback
			//     	window.open('fb://pages/ourvadodara', '_system', 'location=no');
			//         //console.log(scheme + ' is available :)');
			//     },
			//     function() {  // Error callback
			//         window.open('https://facebook.com/ourvadodara','_blank','location=yes');
			//         return false;
			//     }
			// );
		}

	});
})();
