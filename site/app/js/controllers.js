"use strict";

/* Controllers */
var server = "http://localhost:8000/"

angular.module("myApp.controllers", []).
  controller("ExampleController", ["$scope", "$http", function($scope, $http) {
    $http.get(server + "api/users/").success(
      function(data, status, headers, config) {
        $scope.data = data;
      }
    ).error(
      function(data, status, headers, config) {
        $scope.error = "There was an error.";
      }
    );
  }]);

var loginPage = angular.module('loginPage', []);


loginPage.controller("loginCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.formData = {};

  // process the login form
  $('#signinForm').on('valid', function () {
    console.log($scope.formData); // temporary
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

/*
loginPage.controller("registerCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.formData = {};
    console.log("registerCtrl");
    $http.post(server + "api/users/", $scope.formData)
      .success(
        function(data, status, headers, config) {
          $scope.data = data;
          console.log($scope.data);

      })
      .error(
        function(data, status, headers, config) {
          $scope.error = "There was an error.";
        });
  }]);
*/