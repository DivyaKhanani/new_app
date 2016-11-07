(function(){
	var app=angular.module('starter.controllers');

	app.controller("EventsCtrl", function($scope, $q, $http, moment, API_URL,$rootScope){

		var self = this;
		$scope.eventlist = [];
		$rootScope.activepage=2;
	//   	NewsService.getNews().then(function(response){

		// 	$scope.eventlist = response.data;

		//     console.log("Controller Events " , $scope.eventlist);
		// }, function(err){
		// 	console.log(err);
		// });

		// var urlbase = 'http://actonatepanel.com/news/actonation/api';
		var	urlbase = API_URL;
	 	var in_progress = false;
		var page = 1;
		$scope.moredata = false;
		$scope.loaded = false;
		$scope.error = false;

		$scope.refresh = function(){
			$scope.eventlist=[];
			console.log('refresh');
			$scope.moredata = false;
			page = 1;
			$scope.loadMore();
			// else{
			// 	//get the first news' item's published date
			// 	var published_date = $scope.eventlist[0].published_date;
			// 	var payload = { published_date: published_date};
			//
			// 	$http.post(urlbase + '/getLatest', payload).success(function(items) {
			// 		if(items === "\"\""){
			// 			return;
			// 		}
			// 		else if(items.status === "Error"){
			// 			alert("Sorry an error occurred. Please try again later.");
			// 			return;
			// 		}
			//
			// 		//Push the items to the top of the list
			// 		for(var i = 0; i < items.length ; i++){
			// 			$scope.eventlist.unshift(items[i]);
			// 		}
			// 	})
			// 	.error(function(){
			// 		alert("Sorry an error occurred. Please try again later.");
			// 	});
			// }



		};
		$scope.loadMore = function() {
			if(in_progress) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
			if($scope.moredata) { $scope.$broadcast('scroll.infiniteScrollComplete'); return; }

			in_progress = true;

	    	$http.get(urlbase + '/getAllEvents/' + page).success(function(items) {
	    		$scope.loaded = true;
	    		page++;
	    		in_progress = false;

	    		if(items === "\"\""){ $scope.moredata = true; $scope.$broadcast('scroll.infiniteScrollComplete'); return; }
					for(var i=0;i<items.length;i++){
						var today = moment(new Date()).format("MMMM DD YYYY");
						var b = moment(new Date(items[i].Event.event_date)).format("MMMM DD YYYY");

						if(today==b){
							items[i].Event.isToday=true;
						}
						else{
							items[i].Event.isToday=false;
						}
					}
	    		if($scope.eventlist.length == 0)
	    		{
	    			$scope.eventlist = items;
	    			return;
	    		}
	    		else{
	    			angular.forEach(items, function(news) {
					  this.push(news);
					}, $scope.eventlist);

	    		}

		    	if(items.length <= 6)
		    	{
					$scope.moredata = true;
				}
					console.log('event-list-'+angular.toJson($scope.eventlist));
	        	$scope.$broadcast('scroll.infiniteScrollComplete');

	    	})
	    	.error(function(data){
	    		$scope.error = true;
				$scope.error_message = "Sorry couldn't load the article. Please try again later or check your internet connection.";
			});
		};

		$scope.$on('$stateChangeSuccess', function() {
			$scope.loadMore();
		});

		$scope.$on('refresh', function() {
			$scope.refresh();
		});

		/*var self = this;
    $scope.loaded=true;
		$scope.eventlist = [
      {
        id:1,
        image: 'img/sunburn.jpg',
        title: 'Sunburn 2015',
        short_desc: 'Sunburn is back again',
        published_date: new Date(),
				type:0
      },
      {
        id:2,
        image: '/app/webroot/files/news/image_name//small_',
        title: 'Vadfest 2015',
        short_desc: 'Vadfest is back again',
        published_date: new Date(),
				type:1
      },
      {
        id:3,
        image: '/app/webroot/files/news/image_name//small_',
        title: 'Navratri 2015',
        short_desc: 'Navratri is back again',
        published_date: new Date(),
				type:1
      }
    ];*/

  });

})();
