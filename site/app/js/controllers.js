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
    console.log($scope.formData); // temporary
    $http.post(server + "api/users/", $scope.formData)
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
        $scope.alertType = "warning";
        $scope.message = "There was an error.";
      });

  }); // on valid

}]);

/* EXAMPLE */
angular.module("myApp.controllers", []).controller(
  "ExampleController",
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
      $scope.testData = "TEST DATA";
    }
  ]
);
