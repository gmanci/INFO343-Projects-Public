'use strict';


var myApp = angular.module('dawgApp', ['ngSanitize', 'ui.router', 'firebase']);

myApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home#info");
        $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "partials/home.html"
        })
        .state('cart', {
          url: "/cart",
          templateUrl: "partials/cart.html"
        })
        .state('detail', {
          url: "/bean/{id}",
          templateUrl: "partials/bean.html"
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
        
        // Reference to firebase
        var cartRef = new Firebase('https://firedawgcoffee.firebaseio.com/Cart');
        
        // Array for holding all Cart contents
        if ($scope.cart === undefined) {
            $scope.cart = [];
        }

        // Makes sure cart page is loaded, then adds cart items
        cartRef.once("value", function(snapshot) {
            console.log(snapshot.val());
            snapshot.forEach(function(childSnapshot) {
                $scope.cart.push(childSnapshot.val());
                console.log($scope.cart);
            });
            
        // Checks to see if objects were able to load, throws error if not
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        
        //Add quantity functionality
        $scope.upQ = function(itemID) {
            var post = cartRef.$getRecord(itemID);
            console.log(itemID);
            Object.quantity += 1;
            cartRef.$save(Object);
        }

        //Lower quantity functionality
        $scope.downQ = function(itemID) {
            var post = cartRef.$getRecord(itemID);
            console.log(itemID);
            Object.quantity -= 1;
            cartRef.$save(Object);
        }
        
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
    
    
    // Stores new beans created on /cart page
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
    };
    }]);

//    .controller('CartCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
//
//        // Reference to firebase
//        var cartRef = new Firebase('https://firedawgcoffee.firebaseio.com/Cart');
//        
//        // Array for holding all Cart contents
//        if ($scope.cart === undefined) {
//            $scope.cart = [];
//        }
//
//        // Makes sure cart page is loaded, then adds cart items
//        cartRef.once("value", function(snapshot) {
//            console.log(snapshot.val());
//            snapshot.forEach(function(childSnapshot) {
//                $scope.cart.push(childSnapshot.val());
//                console.log($scope.cart);
//            });
//            
//        // Checks to see if objects were able to load, throws error if not
//        }, function (errorObject) {
//            console.log("The read failed: " + errorObject.code);
//        });
//
//
//    }]);



