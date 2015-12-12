'use strict';


var myApp = angular.module('dawgApp', ['ngSanitize', 'ui.router', 'firebase']);

myApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "partials/home.html"
        })
        .state('cart', {
          url: "/cart",
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
    .controller('CoffeeCtlr', ['$scope', '$http', '$firebaseObject', '$firebaseArray', function($scope, $http, $firebaseObject, $firebaseArray) {

        $scope.sortingCriteria = '';

        $http.get('data/products.json').then(function(response) {
            $scope.beans = response.data;
        });

//        $scope.saveBean = function(bean){
//            bean.Name = bean.name;
//            bean.Grind = bean.name;
//            bean.Quantity = bean.quantity;
//            myService.saveBean(bean);	
//        }; 
    }])



    //For details view
    .controller('BeanCtrl', ['$scope', '$http', '$firebaseObject', '$firebaseArray', '$stateParams', '$filter', function($scope, $http, $firebaseObject, $firebaseArray, $stateParams, $filter) {
        
        
        
        
        $scope.grinds = ['Whole Bean', 'Espresso', 'French Press', 'Cone Drip', 'Flat Bottom'];
        $scope.grind = 'Whole Bean'; //default
        $scope.quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        $scope.quantity = '1'; //default



        $http.get('data/products.json').then(function(response) {
        $scope.bean = $filter('filter')(response.data, { //filter the array
          id: $stateParams.id //for items whose id property is targetId
        }, true)[0]; //save the 0th result
        });

        // Reference to firebase
    var ref = new Firebase('https://firedawgcoffee.firebaseio.com/Cart');
    
    
    // Stores new events created on /events page
    $scope.cartObject = {}; 
    
    // Sends to firebase
    $scope.addToCart = function(bean, price) {
        ref.push({
            bean: bean,
            price: price,
            grind: $scope.cartObject.grind,
            quantity: $scope.cartObject.quantity
        }, function(error, eData) {
            if(error) {
                console.log(error);
            } else {
                console.log("Success");
                window.location.reload();
            }
        })
    }
        
//        $scope.addToCart = function(bean, grind, quantity){
//            bean.name = $scope.bean.name;
//            bean.grind = $scope.grinds.indexOf(grind);
//            bean.quantity = $scope.quantities.indexOf(quantity);
//            myService.saveBean(bean);
//        };

    }])

    .controller('CartCtrl', ['$scope', '$http', '$uibModal', 'bean', function($scope, $http, $uibModal, bean) {

//        $scope.cartList = myService.list;

        $scope.saveBean = function(bean, grind, quantity){
            bean.grind =   $scope.grinds.indexOf(grind);
            bean.quantity =   $scope.quantities.indexOf(quantity);
//            myService.saveBean(bean);
        };


    }]);



