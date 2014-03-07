"use strict";

/* Controllers */
var server = "http://localhost:8000/";
var loginPage = angular.module('loginPage', []);

loginPage.controller("loginCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.formData = {};

  // process the login form
  $('#signinForm').on('valid', function () {
    $http.post(server + "api/users/", $scope.formData)
      .success( function(data, status, headers, config ) {
        console.log("SUCESS");
        $scope.data = data;
      })
      .error( function(data, status, headers, config ) {
        console.log("ERROR");
        console.log(data);
        $scope.error = "There was an error.";
      });

  }); // on valid

  // process the registration form
  $('#signupForm').on('valid', function () {

    $http.post(server + "api/users/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.data = data;
        console.log($scope.data);
      })
      .error( function(data, status, headers, config ) {
        $scope.error = "There was an error.";
      });

  }); // on valid

}]);

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
