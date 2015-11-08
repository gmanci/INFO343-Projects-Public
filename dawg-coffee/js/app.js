'use strict';

angular.module('CoffeeApp', ['ngSanitize', 'ui.router']) //ngSanitize for HTML displaying
.config(function($stateProvider){
    $stateProvider.state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    })
    .state('order',{
        url: '/order',
        templateUrl: 'partials/order.html',
        controller: 'HomeController'
    })
    
});