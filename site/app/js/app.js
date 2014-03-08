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



/* CALENDAR */
var app = angular.module('schedulerApp', [ ]);

app.controller('MainSchedulerCtrl', function($scope) {
	//var d = new Date(2013, 10, 12).toJSON().substr(0,10);
	//console.log(d);

	//Get list of dates from database
	//For each, append to scope.events?

	var date = "2014-12-02";
	var list = date.split("-");
	var year = list[0];
	var month = list[1] + 1;
	var day = list[2];

  $scope.events = [
    { 

      id:1,
      text:"Task A-12458",
      start_date: new Date(2013, 11, 12),
      end_date: new Date(2013, 11, 13) 
    },
     
     { id:2, text:"Task A-83473",
       start_date: new Date(2013, 10, 22 ),
       end_date: new Date(2013, 10, 24 ) }
  ];
 
  // var d = start_date;
  //console.log();

  $scope.scheduler = { date : new Date(2013,10,1) };

});


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
