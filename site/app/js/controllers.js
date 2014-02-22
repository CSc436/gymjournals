"use strict";

/* Controllers */

angular.module("myApp.controllers", []).
  controller("ExampleController", ["$scope", "$http", function($scope, $http) {
    $http.get("http://localhost:8000/api/users/").success(
      function(data, status, headers, config) {
        $scope.data = data;
      }
    ).error(
      function(data, status, headers, config) {
        $scope.error = "There was an error.";
      }
    );
  }]);
