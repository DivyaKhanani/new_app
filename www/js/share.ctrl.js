(function(){
	var app = angular.module('starter.controllers');

	app.controller('ShareCtrl', function($scope) {
});
})();

// (function() {
//  var app = angular.module('starter.controllers');
 	
//  	app.controller('MainController', [
//     '$scope', '$ionicPopup', function($scope, $ionicPopup) {
//       $scope.theText = 'orlando default text';
//       $scope.toShare = function() {
//         window.plugins.socialsharing.share($scope.theText);
//       };
//       return $scope.takeScreenshot = function() {
//         navigator.screenshot.save((function(e, r) {
//           if (e) {
//             $ionicPopup.alert({
//               title: 'Error!',
//               template: 'Screenshot unsuccessful'
//             });
//           } else {
//             $ionicPopup.confirm({
//               title: 'Screenshot successful',
//               template: 'Click OK to share'
//             }).then(function(res) {
//               if (res) {
//                 window.plugins.socialsharing.share(null, null, 'file://' + r.filePath);
//               } else {
//                 $ionicPopup.alert({
//                   title: 'Error!',
//                   template: 'Could not share'
//                 });
//               }
//             });
//           }
//         }), 'jpg', 50, 'randomScreenshot');
//       };
//     }
//   ]);
// })();