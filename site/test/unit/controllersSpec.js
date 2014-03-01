"use strict";

describe("ExampleController", function(){
  var scope;

  beforeEach(angular.mock.module("myApp.controllers"));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller("ExampleController", {$scope: scope});
  }));

  it("should pass", inject(function() {
    expect(true).toBe(true);
  }));

  it("should have testData = 'TEST DATA'", inject(function() {
    expect(scope.testData).toBe("TEST DATA");
  }));
});
