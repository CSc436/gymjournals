"use strict";

describe("GetUsers", function(){
  var scope;

  beforeEach(angular.mock.module("exampleAPI"));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller("GetUsers", {$scope: scope});
  }));

  it("should pass", inject(function() {
    expect(true).toBe(true);
  }));

  it("should have testData = 'TEST DATA'", inject(function() {
    expect(scope.testData).toBe("TEST DATA");
  }));
});

/*
describe("CreateWorkout", function(){
    var scope;

    beforeEach(angular.mock.module("CreateWorkout"));
    breakEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller("CreateWorkout", {$scope: scope});
    }));


}
*/
