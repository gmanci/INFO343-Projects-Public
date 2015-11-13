'use strict';


angular.module('myApp', ['ngSanitize', 'ui.router'])
    .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "partials/home.html",
          controller: 'CoffeeCtrl'
        })
        .state('cart', {
          url: "/order/cart",
          templateUrl: "partials/cart.html",
          controller: 'CartCtrl'
        })
        .state('detail', {
          url: "/bean/{id}",
          templateUrl: "partials/bean.html",
          controller: 'BeanCtrl'
        })
        .state('order', {
          url: "/order",
          templateUrl: "partials/order.html"
        });
    })



.controller('CoffeeCtlr', ['$scope', '$http', 'myService', function($scope, $http){

	$scope.sortingCriteria = '';

	$http.get('data/products.json').then(function(response) {
 		$scope.beans = response.data;
 	});
    
    $scope.saveBean = function(bean){
 		bean.Name = bean.name;
 		bean.Grind = 'Whole Bean';
 		movie.quantity = '1';
 		myService.saveBean(bean);	
 	} 

}])



//For details view
.controller('BeanCtrl', ['$scope', '$http', '$stateParams', '$filter', 'myService', function($scope, $http, $stateParams, $filter) {
    
    $scope.grinds = ['Whole Bean', 'Espresso', 'French Press', 'Cone Drip', 'Flat Bottom'];
    $scope.grind = 'Whole Bean'; //default
    $scope.quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    $scope.quantity = '1'; //default
    
    
    
	$http.get('data/products.json').then(function(response) {
   	$scope.bean = $filter('filter')(response.data, { //filter the array
      id: $stateParams.id //for items whose id property is targetId
   	}, true)[0]; //save the 0th result
 	});
    
    $scope.addToCart = function(bean, grind, quantity){
    bean.grind = $scope.grinds.indexOf(grind);
    bean.quantity = $scope.quantities.indexOf(quantity);
    myService.saveBean(bean);
}
    
}])

.controller('CartCtlr', ['$scope', '$http', '$uibModal', 'myService', function($scope, $http, $uibModal, watchListService) {

//	//"constants" for priority setting
//	$scope.priorities = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];
//	$scope.priority = 'Medium'; //default

	$scope.cartList = myService.list;

	$scope.saveBean = function(bean, grind, quantity){
		bean.grind =   $scope.grinds.indexOf(grind);
        bean.quantity =   $scope.quantities.indexOf(quantity);
		myService.saveBean(bean);
	}


}])

.factory('myService', function(){

	var service = {};

	service.list = [];

	service.saveBean = function(bean){
		console.log("adding bean to cart");
		service.list.push(bean);
	};

	return service;
});

//myApp.factory('myService', function() {
//
//  var service = {}; //object that is the service
//
//  //can store data in the service
//  service.message = "Hello world";
//
//  //can store fuctions as well!
//  service.myFunc = function() { ... };
//
//  return service; //return ("build") that service
//})

