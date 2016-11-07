/*
 * angular-phonegap-push-notification v0.0.3
 * (c) 2014 Patrick Heneise, patrickheneise.com
 * License: MIT
 */

'use strict';


angular.module('cordova', [])

  .factory('cordovaReady', function ($rootScope, $q, $timeout) {
    var loadingDeferred = $q.defer();
    
    document.addEventListener('deviceready', function () {
      $timeout(function() {
        $rootScope.$apply(loadingDeferred.resolve);
      });
    });
    
    return function cordovaReady() {
      return loadingDeferred.promise;
    };
  })

  .service('phone', function () {
    this.isAndroid = function () {
      var uagent = navigator.userAgent.toLowerCase();
      return uagent.search('android') > -1 ? true : false;
    };
  })

  .factory('push', function ($rootScope, phone, cordovaReady, $state) {
    return {
      registerPush: function (fn) {
           console.log("in registerPush");
        cordovaReady().then(function () {
          var
            pushNotification = window.plugins.pushNotification,
            successHandler = function (result) {},
            errorHandler = function (error) {},
            tokenHandler = function (result) {
              return fn({
                'type': 'registration',
                'id': result,
                'device': 'ios'
              });
            };

          window.onNotificationAPN = function (event) {
                            navigator.notification.alert(JSON.stringify(event));
            if (event.alert) {
              navigator.notification.alert(event.alert);
            }

            if (event.sound) {
              var snd = new Media(event.sound);
              snd.play();
            }

            if (event.badge) {
              pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);  
            }

                            console.log(event);
            if (parseInt(event.foreground)) {
                            console.log('inside fore');
              //alert(event.message);
              // var my_media = new Media("/android_asset/www/" + event.soundname);
              // my_media.play();
              $rootScope.$broadcast('refresh');
            } else {
                var news_id = event.id;
                console.log("navigating to - ", news_id);
                            console.log($state);
                $state.go('app.newsDetails', { newsId: news_id});
            }
                
          };

          window.onNotificationGCM = function (event) {
            switch (event.event) {
              case 'registered':
                if (event.regid.length > 0) {
                  return fn({
                    'type': 'registration',
                    'id': event.regid,
                    'device': 'android'
                  });
                }
                break;

              case 'message':
                if (event.foreground) {
                  //alert(event.message);
                  // var my_media = new Media("/android_asset/www/" + event.soundname);
                  // my_media.play();
                  $rootScope.$broadcast('refresh');
                } else {
                  if (event.coldstart) {
                    var news_id = event.payload.id;
                    $state.go('app.newsDetails', { newsId: news_id});
                  } else {
                    var news_id = event.payload.id;
                    $state.go('app.newsDetails', { newsId: news_id});
                  }
                }
                break;

              case 'error':
                break;

              default:
                break;
            }
          };

          if (device.platform == "Android") {
            pushNotification.register(successHandler, errorHandler, {
              'senderID': '73175341757',
              'ecb': 'window.onNotificationGCM'
            });
          } else if(device.platform == "iOS") {
            console.log('register ios');
            pushNotification.register(tokenHandler, errorHandler, {
              'badge': 'true',
              'sound': 'true',
              'alert': 'true',
              'ecb': 'window.onNotificationAPN'
            });
          }
        });
      }
    };
  });