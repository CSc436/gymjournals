"use strict";

/* Controllers */
var server = "http://localhost:8000/";
var getURL="api/get/users/"

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
  var id = obj.id;
  loadInform();
  //load information of user
  function loadInform(){
    $scope.username = obj.username;
    $scope.email=obj.email;
    $scope.gender=obj.gender;
    if($scope.gender=="M"){
      $scope.gender_show="♂";
    }
    else{
      $scope.gender_show="♀";
    }
    $scope.dob=obj.dob;
  }
  //make the field editable
  $scope.edit= function(element){
    $scope[element]='edit'; 
  }
  //conncet the database and save the changed information
  $scope.save = function(index,element){

    var tempObj;
    tempObj=angular.copy(obj);
    console.log(tempObj);

    tempObj[index] = element;
    var name_edit = index+"_edit";
    var error=index+"_error";

    $http.put(server + getURL +id +"/", tempObj)
        .success( function(data, status, headers, config ) {
      //console.log(data);
      console.log("success");
      obj=tempObj;
      loadInform();
      $scope[name_edit]="";

    })
    .error( function(data, status, headers, config ) {
      //console.log(data);
      console.log("error");
      //loadInform();
      $scope[error]=data[index][0];
    });

  }
  //animation for editable
  $scope.come = function(element){
    $scope[element]='show';
  }
  //animation for editable
  $scope.leave= function(element){
    $scope[element]="";
  }
  //validate the password 
  $scope.save_pwd=function(old_pwd,new_pwd,confirm_pwd){
    //console.log("saving password.");
    //console.log($('.password-field'));
    //console.log($('#infor'));
    if(new_pwd==confirm_pwd && new_pwd.length>=6){
          if(old_pwd==obj.pwd){

            $scope.save('pwd',new_pwd);

          }else{
            $scope.pwd_error="The old password doesn't match!";

          }
    }      
  }

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

}]);



/* CALENDAR CTRL */
gymjournals.controller('CalendarCtrl', function($scope) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
        $scope.alertMessage = (event.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Enter name',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      calendar.fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(calendar){
        calendar.fullCalendar('render');
      }
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});

/* prev */
gymjournals.controller('mainSchedulerCtrl', ["$scope", "$http", "calendarData", function($scope, $http, calendarData) {
console.log("gymjournals.controller('mainSchedulerCtrl'")

  $scope.title = "CALENDAR";

  $scope.events = [{}];
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

/* Weight tracking bar chart */
gymjournals.controller("userWeightBarChart", ["$scope", function($scope) {
  $scope.weightData = [{
    key: "weight",
    values: [
      [
        (new Date(Date.now() - 2345678901)).getTime(),
        110
      ],
      [
        (new Date(Date.now() - 1234567890)).getTime(),
        80
      ],
      [
        (new Date(Date.now() - 0335567890)).getTime(),
        200
      ],
      [
        (new Date(Date.now() - 0229567890)).getTime(),
        160
      ],
      [
        (new Date(Date.now())).getTime(),
        300
      ],
    ]
  }];

  $scope.xAxisTickFormatFunction = function(){
    return function(d){
      return d3.time.format('%m-%d')(new Date(d));
    }
  };

  $scope.toolTipContentFunction = function(){
    return function(key, x, y, e, graph) {
      return '<h4>' +  y + ' at ' + x + '</h4>';
    };
  };
}]);

/* EXAMPLE */
var exampleAPI = angular.module('exampleAPI', []);
exampleAPI.controller(
  "GetUsers",
  [
    "$scope", "$http",
    function($scope, $http) {
      $scope.getUsers = $http.get(server + "api/list/users/").success(
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
