'use strict';

//angular.module('MoviesApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])
//.config(function($stateProvider){
//	$stateProvider
//		.state('home', {
//			url: '/', //"root" directory
//			templateUrl: 'partials/home.html',
//			controller: 'MoviesCtrl'
//		})
//		.state('blog', {
//			url: '/blog',
//			templateUrl: 'partials/blog.html',
//			controller: 'BlogCtrl'
//		})	
//		.state('detail', {
//			url: '/movie/{id}',
//			templateUrl: 'partials/movie-detail.html',
//			controller: 'DetailCtrl'
//		})
//		.state('watchlist', {
//			url: '/watchlist',
//			templateUrl: 'partials/watchlist.html',
//			controller: 'WatchListCtrl'
//		})	
//
//})

angular.module('myApp', ['ngSanitize', 'ui.router'])
    .config(function($stateProvider) {
      // For any unmatched url, redirect to /state1
//      $urlRouterProvider.otherwise("/home");
      // Now set up the states
      $stateProvider
        .state('home', {
          url: "/",
          templateUrl: "partials/home.html"
        })
    //    .state('order.list', {
    //      url: "/list",
    //      templateUrl: "partials/state1.list.html",
    //      controller: function($scope) {
    //        $scope.items = ["A", "List", "Of", "Items"];
    //      }
    //    })
        .state('order', {
          url: "/order",
          templateUrl: "partials/order.html"
        });
    });





//.controller('CoffeeCtlr', ['$scope', '$http', function($scope, $http){
//
//	$scope.sortingCriteria = '';
//
//	$http.get('data/products.json').then(function(response) {
// 		$scope.movies = response.data;
// 	});
//
//}]);
//
////For movie data browser
//.controller('OrderCtlr', ['$scope', '$http', function($scope, $http) {
//
//	$scope.sortingCriteria = '';
//
//	$http.get('data/products.json').then(function(response) {
// 		$scope.movies = response.data;
// 	});
//
//}]);
