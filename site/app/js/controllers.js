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
gymjournals.controller("calendarCtrl", ["$scope", "calendarData", function($scope, calendarData) {
  $scope.title = "CALENDAR";
  $scope.calendarData = calendarData;

  $scope.save = function() {
    $http.post(server + '/api/calendar', JSON.stringify($scope.calendarData));
  }

}]);

/* LOGIN CTRL */
gymjournals.controller("loginCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.formData = {};

  // process the login form
  $('#signinForm').on('valid', function () {
    var json = JSON.stringify($scope.formData)
    console.log(json);

    $http.post(server + "api/users/login", json)
      .success( function(data, status, headers, config ) {
        $scope.data = data;

        $scope.alertType = "success";
        $scope.message = "SUCCESS!";
      })
      .error( function(data, status, headers, config ) {
        console.log(data);
        
        $scope.alertType = "warning";
        $scope.message = "There was an error.";
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
