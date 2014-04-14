"use strict";

/* Controllers */
var server = "http://localhost:8000/";

var gymjournals = angular.module('gymjournals');


/* HOME PAGE CTRL */
gymjournals.controller("homeCtrl", ["$scope", "$cookieStore", function($scope, $cookieStore) {
  $scope.title = "Home";
  $scope.items = ["one", "two", "three"]; // testing

  $cookieStore.put('loggedin', ''); // store session
}]);


/* INFORMATION AND SETTINGS PAGE CTRL*/
gymjournals.controller("settingsCtrl", ["$scope", "$http", "userInfo", function($scope, $http, userInfo){
  var obj=userInfo.getInfo();
  $scope.username = obj.username;
  $scope.email=obj.email;
  if(obj.gender=="M")
    $scope.gender="♂";
  else
    $scope.gender="♀";

  $scope.dob=obj.dob;
  //$scope.info=userInfo.getInfo();
  //console.log(userInfo.getInfo());
  
}]);



/* PROFILE CTRL */
gymjournals.controller("profileCtrl", ["$scope", "$http", "userInfo", function($scope, $http, userInfo) {
  $scope.title = "PROFILE";
  $scope.username = userInfo.getName();

  $http.get(server + "api/list/workouts/" + userInfo.getID() + "/")
    .success( function(data, status, headers, config ) {
      console.log(data);
      if (data.length != 0){
        $scope.workouts = data;
      }


    })
    .error( function(data, status, headers, config ) {
      console.log(data);
      
    });

    /* the following should be moved into EditableRowCtrl */
    $scope.workoutItems = [{name:"chest workout", type:"weight"}, 
                      {name:"arms workout", type:"weight"},
                      {name:"cardio workout", type:"aerobic"}];

    $scope.setItems = [{reps:5, weight:10}, 
                      {reps:5, weight:13}, 
                      {reps:5, weight:15}]; // testing
    
    $scope.removeWorkout = function(index) {
      $scope.workoutItems.splice(index, 1);
    };
    $scope.addWorkout = function() {
      $scope.workoutItems.push({name:"Name", type:"Type"});
    };

    $scope.addSet = function(reps, weight){
      if (reps && weight && reps >= 1 && weight >= 0) {
        $scope.setItems.push({reps:reps, weight:weight})
      }
    }

    $scope.removeSet = function(index) {
      $scope.setItems.splice(index, 1);
    };
    

}]);

/* EDITING TABLE FOR ADDING SETS CTRL */
gymjournals.controller('EditableRowCtrl', ['', function(){

}]);


/* CALENDAR CTRL */
gymjournals.controller('mainSchedulerCtrl', ["$scope", "$http", "calendarData", function($scope, $http, calendarData) {
console.log("gymjournals.controller('mainSchedulerCtrl'")

  $scope.title = "CALENDAR";

  $scope.save = function() {
    $http.post(server + 'api/calendar/', JSON.stringify($scope.events));
  }

// console.log(calendarData);
// calendarData = JSON.parse( JSON.stringify(calendarData) );

  // $scope.events = calendarData;

  $.each(calendarData, function(i, datePair) {
    // console.log(datePair);
    // var date = datePair.start_date;
    // var list = date.split("-");
    // var year = list[0];
    // var month = list[1] + 1;
    // var day = list[2];

    // var startDate = new Date(year, month, day);
    // var endDate = new Date(year, month, day+1);

    // $scope.events[i]({
    //   "id": i,
    //   "text":"Task A-12458",
    //   "start_date": new Date(2013, 11, 12),
    //   "end_date": new Date(2013, 11, 13) 
    // });
  });

//   $scope.events = calendarData;
// console.log($scope.events);


  //Get list of dates from database
  //For each, append to scope.events?

  var date = "2014-12-02";
  var list = date.split("-");
  var year = list[0];
  var month = list[1] + 1;
  var day = list[2];

  $scope.events = [
    { 

      "id":1,
      "text":"Task A-12458",
      "start_date": new Date(2013, 11, 12),
      "end_date": new Date(2013, 11, 13) 
    },
    { 
      "id":2, 
      "text":"Task A-83473",
      "start_date": new Date(2013, 10, 22 ),
      "end_date": new Date(2013, 10, 24 ) }
  ];

  console.log($scope.events);

  $scope.scheduler = { date : new Date(2013,10,1) };

}]);







/* LOGIN CTRL */
gymjournals.controller("loginCtrl", ["$scope", "$http", "$state", "$cookieStore", "userInfo", function($scope, $http, $state, $cookieStore, userInfo) {
  $scope.formData = {};
  $scope.clear=function(){
    $scope.simessage="";
    $scope.spmessage="";
    //console.log("change");
  }

  // process the login form
  $('#signinForm').on('valid', function () {

    $http.post(server + "api/login/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.data = data;

        $scope.alertType = "success";
        $scope.simessage = "SUCCESS!";
        $('#loginModal').foundation('reveal', 'close'); // close modal
        $cookieStore.put('loggedin', 'true'); // store session
        $cookieStore.put('data', data); // store user info
        $state.go("profile"); // go to profile page
      })
      .error( function(data, status, headers, config ) {
        console.log(data);
        
        $scope.alertType = "warning";
        $scope.simessage = data.error;
      });

  }); // on valid

  // process the registration form
  $('#signupForm').on('valid', function () {

    $http.post(server + "api/list/users/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.alertType = "success";
        $scope.spmessage = "SUCCESS!";
      })
      .error( function(data, status, headers, config ) {
        console.log(data);
        $scope.alertType = "warning";
        if(data.username!=null)
          $scope.spmessage = data.username[0];
        else if(data.email!=null)
          $scope.spmessage = data.email[0];

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
