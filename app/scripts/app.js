'use strict';

/**
 * @ngdoc overview
 * @name catReceiptApp
 * @description
 * # catReceiptApp
 *
 * Main module of the application.
 */
angular
  .module('catReceiptApp', [
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
