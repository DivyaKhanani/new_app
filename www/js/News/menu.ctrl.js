(function(){
      var app=angular.module('couponApp');
  app.controller('MenuController','$scope','$rootScope','$stateParams','$state','$ionicLoading','GeneralServices','CityServices','$timeout','$ionicPopup','$ionicModal','FILE_BASE_URL','$window','GeneralServices',function($scope,$rootScope,$stateParams,$state,$ionicLoading,GeneralServices,CityServices,$timeout,$ionicPopup,$ionicModal,FILE_BASE_URL,$window,GeneralServices){
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
  
    $scope.isActive = false;
    $scope.animateAgain=function(){
      // animator.start();
      $scope.isActive = !$scope.isActive;
      $state.go('app.topcoupons.weekly');
    }

    try{
      branch.track("registered",function(err){

      });
    }
    catch(err){
      console.log('err-'+err);
    }

    $scope.storeduser=angular.fromJson(window.localStorage['user'] || '{}');
    console.log('username-'+$scope.storeduser.username);
    $scope.city=$scope.storeduser.city;
    $scope.showTopCoupons=function(){
      $state.go('app.topcoupons');
    }
    $scope.swappedCity={};
    $scope.getCategories=function(){

      //Get Credits Logic
      try{
        branch.credits(function(err, data) {
          if (!err) {
            console.log('credits-'+angular.toJson(data));
            // will return the balance of the current user's credits
            $rootScope.creditsAll = data.default;
            $scope.$apply();
          }
          else{
            $scope.creditsAll = 0;
            $scope.$apply();
          }
        });
      }
      catch(err){
        console.log('err-'+err);
      }

      //Store UUID Logic
      try{
        window.plugins.OneSignal.getIds(function(ids) {
          console.log("UserID: " + ids.userId);
          console.log("PushToken: " + ids.pushToken);
          window.plugins.uniqueDeviceID.get(function(uuid){
            console.log('uuid-'+uuid);
            console.log('branch_session-'+window.localStorage['branch_session']);
            // console.log('branch_session_first-'+window.localStorage['branch_session_first']);
            var branch_id='';
            if(window.localStorage['branch_session']!==undefined){
              console.log('inside-'+window.localStorage['branch_session']);
              var branch_data=angular.fromJson(window.localStorage['branch_session']);
              console.log('branch_data-'+branch_data);
              branch_id=branch_data.identity_id;
            }
            // branch_session-{"session_id":"169779798665612843","identity_id":"162498972554907226","device_fingerprint_id":"162498972403928811","browser_fingerprint_id":null,"link":"https://bnc.lt/j/i9FqxHtpam","data":"{\"+is_first_session\":false,\"+clicked_branch_link\":false}"}
            var resp=GeneralServices.setUUID($scope.storeduser.id,uuid,ids.userId,branch_id);
            resp.$promise.then(function(response){

            },
            function(err){
              alert('Oops! Something went wrong while registering user details! Try again.');
            });
          }, function(){
            console.log('err-');
          });
        });
      }
      catch(err){
        console.log('err');
      }

      if($scope.storeduser.city!==undefined || $scope.storeduser.city!==''){
        window.plugins.OneSignal.sendTag("city", $scope.storeduser.city);
        //window.plugins.OneSignal.sendTag("city",'testing');
      }

      // $ionicLoading.show({
      //   content: 'Sending OTP Request',
      //   animation: 'fade-in',
      //   maxWidth: 200,
      //   showDelay: 0
      // });

      var resp=GeneralServices.getCategories();
      resp.$promise.then(function(response){
        // $ionicLoading.hide();

        for(var i=0;i<response.response_data.length;i++){

          if(response.response_data[i].CouponCategory.primary_photo_directory==null||response.response_data[i].CouponCategory.primary_photo_directory==''){
            response.response_data[i].imgurl='img/logo-gray.jpg';
          }
          else{
            response.response_data[i].imgurl=FILE_BASE_URL+'/coupon_category/primary_photo/'+response.response_data[i].CouponCategory.primary_photo_directory+'/'+response.response_data[i].CouponCategory.primary_photo;
          }
        }

        $scope.categories=response.response_data;
      },
      function(err){
        //alert('Oops! Something went wrong fetching categories! Try again.')
        // $ionicLoading.hide();
      });

      //Populating city in side menu
      var resp=CityServices.getCities();
      resp.$promise.then(function(response){
        $scope.citiesList=response.response_data;
        for(var i=0;i<$scope.citiesList.length;i++){
          if($scope.city==$scope.citiesList[i].City.id){
            $scope.selectedCity=$scope.citiesList[i].City.id;
            $scope.selectedCityName=$scope.citiesList[i].City.name;
            console.log('city-id-'+$scope.selectedCity+'--cityname-'+$scope.selectedCityName);
          }
        }

        // $scope.citiesList[$scope.citiesList.length]={
        //   City:{
        //     id:'dc218cee-2d33-11e5-a659-c03fd56555',
        //     name: 'Surat'
        //   }
        // }
        console.log('citiesList-'+JSON.stringify($scope.citiesList));
        $scope.citiesExclusionList=[];
        var j=0;
        for(var i=0;i<$scope.citiesList.length;i++){
          if($scope.city!=$scope.citiesList[i].City.id){
            $scope.citiesExclusionList[j]={
              City:{
                id:$scope.citiesList[i].City.id,
                name:$scope.citiesList[i].City.name
              }
            }
            j++;
          }
        }

      });

    }

    $scope.showCouponsForCategory=function(category){
      console.log('catid-'+category.id);
      var data={
        categoryid:category.id,
        categoryname:category.name
      }
      data=angular.toJson(data)
      $state.go('app.categorycoupons',{params:data});
    }

    $scope.showAboutUs = function() {
     var aboutPopup = $ionicPopup.alert({
       title: 'About MyCityBuzz',
       template: 'Hello Users!<br\/>Welcome to MYCITYBUZZ. We are Offering Daily Doze of Exclusive Offers from your City. From Reputed Restaurant, Salons, Spa, Food & Beverages, Lifestyle, Optical, Health & Fitness, Entertainment and Many More Segments. You don’t need to go looking for Discounts anymore. Just use the app, Get up to 80 % Savings and be spoiled for choice. Enjoy Daily Doze of Exclusive Offers.<br\/>Thanks us Later!',
       buttons: [
         {
           text: '<b>Ok</b>',
           type: 'button-energized'
         }
       ]
     });
    };

    $scope.showSupport = function() {
     var supportPopup = $ionicPopup.alert({
       title: 'Support',
       templateUrl: 'templates/support.html',
       controller:'PromoteController',
       buttons: [
         {
           text: '<b>Ok</b>',
           type: 'button-energized'
         }
       ]
     });
    };

    $scope.showPromote = function() {

      $scope.promotion={

      }
     $scope.promotePopup=$ionicPopup.show({
       title: 'Promote your business',
       templateUrl: 'templates/promote.html',
       scope:$scope
     });
    };


    // $ionicModal.fromTemplateUrl('templates/promote.html', function(modal) {  $scope.modal = modal; },
    // {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // });
    //
    // $scope.showPromote = function() {
    //   $scope.modal.show();
    // }
    $scope.submitPromotion=function(promotePopup){

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        maxWidth: 200,
        showDelay: 0
      });
      //$scope.user.id=$scope.receiveduser.id;
      $scope.promotion.app_user_id=$scope.storeduser.id;
      var resp=GeneralServices.submitPromotion($scope.promotion);
      resp.$promise.then(function(response){
        $scope.cities=response.response_data;
        if(response.response_data=='success'){
          $ionicLoading.hide();
          console.log('userid-'+$scope.storeduser.id);
          promotePopup.close();
        }
        else{
          $ionicLoading.hide();
          alert('Something went wrong! Try again.');
        }
      });

    }

    $scope.closeForm=function(promotePopup){
      promotePopup.close();
    }

    $scope.updateCity=function(swappedCity){
      //window.plugins.OneSignal.sendTag("city", $scope.storeduser.city);
      if(swappedCity!==null){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Change City',
          template: 'Are you sure you want to change City? You will see the listing of this city and will be subscribed to notifications for this city.'
        });
        confirmPopup.then(function(res) {
          if(res) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              maxWidth: 200,
              showDelay: 0
            });
            //$scope.user.id=$scope.receiveduser.id;

            var resp=GeneralServices.changeCity($scope.storeduser.id,swappedCity);
            resp.$promise.then(function(response){
              $scope.cities=response.response_data;
              if(response.response_data=='success'){
                $ionicLoading.hide();
                $scope.storeduser.city=swappedCity;
                window.localStorage['user'] = JSON.stringify($scope.storeduser);
                $window.location.reload(true);
              }
              else{
                $ionicLoading.hide();
                alert('Something went wrong! Try again.');
              }
            });

          } else {
            $window.location.reload(true);
          }
        });
      }
    }

  }]);
})();
