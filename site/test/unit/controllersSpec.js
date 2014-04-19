"use strict";

describe("GetUsers", function(){
  var $scope, $rootScope, $httpBackend, createController;

  beforeEach(module("exampleAPI"));
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('GetUsers', {
        '$scope': $scope
      });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should pass", inject(function() {
    expect(true).toBe(true);
  }));

  it("should have testData = 'TEST DATA'", inject(function() {
    $httpBackend.expect('GET', 'http://localhost:8000/api/list/users/').respond({
      "success": true,
      "other": 42
    });
    
    var controller = createController();
    
    $httpBackend.flush();
    
    expect($scope.testData).toBe("TEST DATA");
  }));

  it("should get all users from database", function() {
    $httpBackend.expect('GET', 'http://localhost:8000/api/list/users/').respond({
      "success": true,
      "other": 42
    });

    var controller = createController();

    $httpBackend.flush();

    expect($scope.data).toBeDefined();

  });
});

describe("homeCtrl", function(){
  var $scope, $rootScope, createController;

  beforeEach(module("gymjournals"));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('homeCtrl', {
        '$scope': $scope
      });
    };
  }));

  it("check home title and items", inject(function() {
    var controller = createController();

    expect($scope.title).toBe("Home");
    expect($scope.items[0]).toBe("one");
    expect($scope.items[1]).toBe("two");
    expect($scope.items[2]).toBe("three");
  }));
});

describe("profileCtrl", function(){
  var $scope, $rootScope, createController;
  
  beforeEach(module("gymjournals"));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('profileCtrl', {
        '$scope': $scope
      });
    };
  }));

  it("check profile title", inject(function() {
    var controller = createController();

    expect($scope.title).toBe("PROFILE");
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
