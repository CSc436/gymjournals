"use strict";

/* Controllers */
var server = "http://localhost:8000/";

var gymjournals = angular.module('gymjournals');

/* HOME PAGE CTRL */
gymjournals.controller("homeCtrl", ["$scope", function($scope) {
  $scope.title = "Home";
  $scope.items = ["one", "two", "three"]; // testing

}]);

/* CALENDAR CTRL */
// gymjournals.controller("calendarCtrl", ["$scope", "calendarData", function($scope, calendarData) {
//   $scope.title = "CALENDAR";
//   $scope.calendarData = calendarData;

//   $scope.save = function() {
//     $http.post(server + '/api/calendar', JSON.stringify($scope.calendarData));
//   }

// }]);




gymjournals.controller('mainSchedulerCtrl', ["$scope", "calendarData", function($scope, calendarData) {
console.log("gymjournals.controller('mainSchedulerCtrl'")

//   $scope.title = "CALENDAR";
//   $scope.calendarData = calendarData;

//   $scope.save = function() {
//     $http.post(server + '/api/calendar', JSON.stringify($scope.calendarData));
//   }



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

}]);







/* LOGIN CTRL */
gymjournals.controller("loginCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.formData = {};

  // process the login form
  $('#signinForm').on('valid', function () {

    $http.post(server + "api/users/login/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.data = data;

        $scope.alertType = "success";
        $scope.message = "SUCCESS!";
        window.location = "testNav.html";
      })
      .error( function(data, status, headers, config ) {
        console.log(data);
        
        $scope.alertType = "warning";
        $scope.message = data.error;
      });

  }); // on valid

  // process the registration form
  $('#signupForm').on('valid', function () {

    $http.post(server + "api/users/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.alertType = "success";
        $scope.message = "SUCCESS!";
      })
      .error( function(data, status, headers, config ) {
        console.log(data);
        $scope.alertType = "warning";
        $scope.message = "There was an error.";
      });

  }); // on valid

}]);

/* EXAMPLE */
var exampleAPI = angular.module('exampleAPI', []);
exampleAPI.controller(
  "GetUsers",
  [
    "$scope", "$http",
    function($scope, $http) {
      $http.get(server + "api/users/").success(
        function(data, status, headers, config) {
          $scope.data = data;
        }
      ).error(
          function(data, status, headers, config) {
            $scope.error = "There was an error.";
          }
      );

      $scope.testData = "TEST DATA"
    }
  ]
);

exampleAPI.controller(
  "CreateWorkout",
  [
    "$scope", "$http",
    function($scope, $http) {
      $scope.workoutData = null;
      $scope.createdWorkout = null;
      $scope.error = null;

      $scope.createWorkout = function() {
        $http.post(server + "api/workouts/" + $scope.workoutData.user + "/", $scope.workoutData).success(
          function(data, status, headers, config) {
            $scope.createdWorkout = data;
          }
        ).error(
          function(data, status, headers, config) {
            $scope.error = data;
            console.log("createWorkout: $scope.error: " + $scope.error);
          }
        );
      }
    }
  ]
);
