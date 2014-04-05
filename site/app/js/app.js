"use strict";

var gymjournals = angular
  .module('gymjournals', [
    'ui.router',
    'ngCookies',
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home_partial.html',
        controller: 'homeCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/_profile.html',
        controller: 'profileCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'partials/_calendar.html',
        controller: 'mainSchedulerCtrl',
        resolve: {
          calendarData: ['$http', function($http){
            return $http.get('test_calendarData.json').then(function(response){
              return response.data;
            })
          }]
        }
      })
  }])
  .run(['$rootScope', '$cookieStore', '$state', function($rootScope, $cookieStore, $state){
    // make sure they have to be logged in before accessing other parts of the website
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      // if you arent logged in and you are going to a page other than the home page
      if ( (! $cookieStore.get('loggedin')) && toState.name != 'home' ) {
        event.preventDefault();
        $state.go("home"); // go to home page
      }
    })
  }]);

/* a factory is useful when we want to compute something from user data 
 * but this factory does not yet have this functionailty but is here just in case
 * we add it
 */
gymjournals.factory('userInfo', ["$cookieStore", function($cookieStore){
  return {
    getInfo: function () {
        return $cookieStore.get('data');
    },
    getName: function () {
      return $cookieStore.get('data').username;
    },
    getID: function () {
      return $cookieStore.get('data').id;
    },
    setInfo: function(value) {
      $cookieStore.put('data', value);
    }
  };
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
