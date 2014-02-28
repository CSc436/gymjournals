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
    $http.get(server + "api/users/").success(
      function(data, status, headers, config) {
        $scope.data = data;
        console.log($scope.data);
      }
    ).error(
      function(data, status, headers, config) {
        $scope.error = "There was an error.";
      }
    );
  }]);

loginPage.controller("registerCtrl", ["$scope", "$http", function($scope, $http) {
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