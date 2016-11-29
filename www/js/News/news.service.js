(function(){

	var app = angular.module('starter.services',[]);

	app.service('NewsService',function($http, API_URL){

		var self=this;

		 var	urlbase = API_URL;
     //var urlbase = 'http://localhost/Projects/News/actonation/api/';

     var page = 1;
		var getNews = function(){

			return $http.get(urlbase+'/getNews/'+page).
            success(function(response, status, headers, config) {
            	var getNews = response.data;
            	 console.log("Service NewsList " +getNews);

		}).
          error(function(data) {
                  
         });
      };



      var getNewsByCat = function(news_id){
        console.log("2--"+news_id);
      return $http.get(urlbase+'/getNewsByCat/'+news_id+'/'+page)
            success(function(response, status, headers, config) {
              //var getNews = response.data;

    }).
          error(function(data) {
                    alert("Sorry, could not load the latest updates. Please try again later.");
         });
      };


      var loadmore1 = function(){

      return $http.get(urlbase+'/getNews/'+page).
            success(function(response, status, headers, config) {
              page++;
               console.log("Service NewsList " +response.data);

      }).
          error(function(data) {
                    alert("Sorry, could not load the latest updates. Please try again later.");
         });
      };

      var getNewsDetails = function(news_table,news_id){

			return $http.get(urlbase+'/getNewsDetails/'+news_table+'/'+news_id).
            success(function(response, status, headers, config) {
            	var NewsDetails = response.data;
            	console.log("Service NewsDetails" +response.data);

		}).
        error(function(data) {
                    //alert("Sorry, could not load the article. Please try again later.");
        });
    }

    var getCateories = function(){
     // alert(urlbase+'/getCategories');
    return $http.get(urlbase+'/getCategories').
          success(function(response, status, headers, config) {
            page++;
            // console.log("Service NewsList " +response.data);

    }).
      error(function(response, status, headers, config) {
       });
    };
    var getSubCateories = function(cat_id){
     // alert(urlbase+'/getCategories');
    return $http.get(urlbase+'/getSubCategories/'+cat_id).
          success(function(response, status, headers, config) {
           
            // console.log("Service NewsList " +response.data);

    }).
      error(function(response, status, headers, config) {
       });
    };
    
    var getNewsFeaturedList = function(){
     // alert(urlbase+'/getCategories');
    return $http.get(urlbase+'/getNewsFeaturedList').
          success(function(response, status, headers, config) {
            page++;
            // console.log("Service NewsList " +response.data);

    }).
      error(function(response, status, headers, config) {
       });
    };
    var getNewsListByCat = function(cat_id){
      //alert(urlbase+'/getNewsListByCat/'+cat_id);
    return $http.get(urlbase+'/getNewsListByCat/'+cat_id).
          success(function(response, status, headers, config) {
            // console.log("Service NewsList " +response.data);

    }).
      error(function(response, status, headers, config) {
       });
    };
    var getNewsListBySubCat = function(sub_table,sub_cat_id){
    return $http.get(urlbase+'/getNewsListBySubCat/'+sub_table+'/'+sub_cat_id).
          success(function(response, status, headers, config) {
            console.log(response);

    }).
      error(function(data) {
       });
    };

	return {
			getNews: getNews,
      getNewsFeaturedList: getNewsFeaturedList,
			 getNewsDetails: getNewsDetails,
       getNewsCateories: getCateories,
       getNewsSubCateories: getSubCateories,
       getNewsByCat:getNewsByCat,
       getNewsListByCat : getNewsListByCat,
       getNewsListBySubCat  :getNewsListBySubCat
		};

	});
})();
