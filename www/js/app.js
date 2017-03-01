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
 //app.constant('APP_URL', 'http://thenerdsfactory.com/divya/GS/actonation/');

app.constant('APP_URL', 'http://192.168.0.6/projects/extra/GS/actonation');

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
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
