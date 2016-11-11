// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

(function(){
var app = angular.module('starter', ['ionic', 'starter.controllers','starter.services','angularMoment','ngCordova','cordova'])
app.filter('fromNow', function() {
  return function(date) {
    return moment(date).startOf('sec').fromNow();
  }
})

//app.constant('API_URL', 'http://app.ourvadodara.com/actonation/api');

 app.constant('API_URL', 'http://192.168.0.6/projects/extra/GS/actonation/api');
 //app.constant('API_URL', 'http://thenerdsfactory.com/divya/GS/actonation/api');
app.constant('APP_URL', 'http://thenerdsfactory.com/divya/GS/actonation');

app.run(function($ionicPlatform ,push, API_URL, $http, $timeout,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Register for Push Notifications
    if(window.cordova){
    var self = this;
    var result = push.registerPush(function (result) {
      if (result.type === 'registration') {
      var device_id = result.id;
      var device = result.device;
      console.log(ionic.Platform.device());
      var user = { device_id: device_id, device: device };
      //var urlbase = 'http://actonatepanel.com/news/actonation/api';
      $http.post(API_URL + '/insert_deviceid', user)
      .success(function(data, status, headers, config) {
         if(data.status=="success"){
           console.log('register success gcm');
         }
         else{
          console.log('not register success gcm');
         }
      }).
      error(function(data, status, headers, config) {
            });
      }
      });
    }

    /*//Onesignal Notification register
    var notificationOpenedCallback = function(jsonData) {
      if(!jsonData){
        return;
      }
      var type=jsonData.additionalData.type;
      var id=jsonData.additionalData.final_id;
      if(type==1){
        //News
        var news_id = id;
        $state.go('app.newsDetails', { newsId: news_id});
      }
      else if(type==2){
        //Coupon
        var coupon_id = id;
        $state.go('app.couponDetails', { couponId: coupon_id});
      }
      else if(type==3){
        //Event
        var event_id = id;
        $state.go('app.eventDetails', { eventId: event_id});
      }
    };

    try{
      window.plugins.OneSignal.init("b319c19a-5522-11e5-b496-2f7e8dbd6bda",{googleProjectNumber: "703668463412",autoRegister: true},notificationOpenedCallback);
      window.plugins.OneSignal.enableVibrate(true);
    }catch(err){
      console.log('err-'+err);
    }

    try{
      window.plugins.OneSignal.getIds(function(ids) {
        console.log("UserID: " + ids.userId);
        console.log("PushToken: " + ids.pushToken);
        console.log('platform-'+device.platform);
        console.log('uuid-'+device.uuid);
        //Adding onesignal id in users
        var user = { device_uuid: device.uuid, device: device.platform, onesignal_player_id: ids.userId };
        $http.post(API_URL+'/insert_device_info', user)
        .success(function(data, status, headers, config) {
          console.log('registered'+angular.toJson(data)); 
           if(data.status=="success"){
             console.log('register success gcm');
           }
           else{

           }
        }).
        error(function(data, status, headers, config) {
          console.log('error-');
        });
      });
    }
    catch(err){
      console.log('err-'+err);
    }
*/


  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'NewsCtrl'
  })
  .state('tiles', {
    url: "/tiles",
    cache: true,
    templateUrl: "templates/tiles.html"
  })
  
  .state('app.news', {
      url: "/news",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/news_list.tpl.html",
          controller: 'NewsCtrl'
        }
      }
    })
    .state('app.subCat', {
      url: "/subcat/:subCatId/:subName/:tnm",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/news_list_by_sub_cat.tpl.html",
          controller: 'NewsBySubCatCtrl'
        }
      }
    })
    .state('app.cat', {
      url: "/cat/:catId",
      cache: true,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/news_list_by_cat.tpl.html",
          controller: 'NewsByCatCtrl'
        }
      }
    })
    
  .state('app.newsDetails', {
    url: "/newsDetails/:newsTable/:newsId",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/Dashboard/news_details.tpl.html",
        controller: 'NewsDetailCtrl'
      }
    }
  }).state('app.events', {
      url: "/events",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/events_list.tpl.html",
          controller: 'EventsCtrl'
        }
      }
    })
    .state('app.impnos', {
      url: "/impnos",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/impnumbers.tpl.html",
          controller: 'ImpNumbersCtrl'
        }
      }
    })
    .state('app.coupons', {
      url: "/coupons",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/Dashboard/coupons_list.tpl.html",
          controller: 'CouponsCtrl'
        }
      }
    })
  .state('app.eventDetails', {
    url: "/eventDetails/:eventId",
    views: {
      'menuContent': {
        templateUrl: "templates/Dashboard/event_details.tpl.html",
        controller: 'EventDetailCtrl'
      }
    }
  })
  .state('app.couponDetails', {
    url: "/couponDetails/:couponId",
    views: {
      'menuContent': {
        templateUrl: "templates/Dashboard/coupon_details.tpl.html",
        controller: 'CouponDetailCtrl'
      }
    }
  }).state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })
  .state('app.about', {
    url: "/about",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/Dashboard/about.tpl.html",
        controller: 'AboutCtrl'
      }
    }
  })
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/news');
  //$urlRouterProvider.otherwise('/app/events');
  $urlRouterProvider.otherwise('/app/news');
});
})();
