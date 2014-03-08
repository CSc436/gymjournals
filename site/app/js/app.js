"use strict";

angular
  .module('gymjournals', [
    'ui.router'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/_home.html',
        controller: 'homeCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'partials/_calendar.html',
        controller: 'calendarCtrl',
        resolve: {
          calendarData: ['$http', function($http){
            return $http.get('test_calendarData.json').then(function(response){
              return response.data;
            })
          }]
        }
      })
  }]);









/* 
 *
 * EXAMPLE 
 *
 */
// Declare app level module which depends on filters, and services
angular.module(
  "myApp",
  [
    "ngRoute",
    "myApp.filters",
    "myApp.services",
    "myApp.directives",
    "myApp.controllers"
  ]
).config(
  [
    "$routeProvider",
    function($routeProvider) {
      //$routeProvider.when(
        //"/view2",
        //{templateUrl: "partials/partial2.html", controller: "MyCtrl2"}
      //);
      //$routeProvider.otherwise({redirectTo: "/view1"});
    }
  ]
);