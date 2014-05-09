"use strict";

/* Controllers */
var server = "http://localhost:8000/";
var getURL = "api/get/users/";

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
    var count = 5;

    $scope.username = obj.username;
    
    $scope.email=obj.email;
    
    
    $scope.gender=obj.gender;

    if($scope.gender=="M"){
      $scope.gender_show="♂";
    }
    else if ($scope.gender=="F"){
      $scope.gender_show="♀";
    }
   
    $scope.dob=obj.dob;



    $scope.weight_goal=obj.weight_goal;
    //console.log(obj.weight_goal);
    if(obj.weight_goal){
      count++;

    }else
    {
      $scope.weight_goal="Empty..";
    }

    compute_percentage(count);
  }
  function compute_percentage(count){
    $scope.percentage=count/6*100;

  }
  //make the field editable
  $scope.edit= function(element){
    $scope[element]='edit'; 
    //console.log($scope.weight_goal_edit);

  }
  //conncet the database and save the changed information
  $scope.save = function(index,element){

    var tempObj;
    tempObj=angular.copy(obj);
    //console.log(tempObj);

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

gymjournals.controller("tagCtrl",["$scope", "$http", "userInfo", function($scope, $http, userInfo) {
  var tags = ["one","two","three"]
  $scope.tags =tags;
  


}]);

/* PROFILE CTRL */
gymjournals.controller("profileCtrl", ["$scope", "$http", "userInfo", function($scope, $http, userInfo) {
  $scope.title = "PROFILE";
  $scope.username = userInfo.getName();
  $scope.user_id = userInfo.getID();

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
    
    var date = new Date().toJSON().slice(0,10);

    // default workout info
    $scope.workout = {
      user: userInfo.getID(),
      date: date,
      color: "#6a4415",
      description:"Description",
      duration: "00:00:00"
    }; 

    $scope.exerciseItems = [];
    // FOR TESTING
    // $scope.exerciseItems = [{name:"bench press", type:"weight", duration:'00:05:00', 
    //                         setItems:[{reps:5, weight:10}, 
    //                                   {reps:5, weight:13}, 
    //                                   {reps:5, weight:15}] }, 
    //                   {name:"dumbell fly", type:"weight", duration:'00:10:00',
    //                         setItems:[{reps:5, weight:10}, 
    //                                   {reps:105, weight:103}, 
    //                                   {reps:5, weight:15}] },
    //                   {name:"pushups", type:"weight", duration:'00:15:00'},
    //                   {name:"running", type:"aerobic", duration:'00:20:00', avg_heartrate:92}];
}]);

/* EDITING TABLE FOR ADDING SETS CTRL */
gymjournals.controller('LoggingWorkoutCtrl', ['$scope', "$http", "userInfo", function($scope, $http, userInfo){
    
    $scope.name = 'Exercise'; // default exercise name
    $scope.type = 'weight'; // default status/type
    $scope.statuses = [
      {value: 1, text: 'weight'},
      {value: 2, text: 'aerobic'},
    ];


    $scope.checkValid = function () {
      console.log('isValid?');
    };

    $scope.removeExercise = function(index) {
      $scope.exerciseItems.splice(index, 1);
    };

    $scope.addExercise = function(name, type) {
      $scope.exerciseItems.push({name:name, type:type, 
                                 duration:"00:00:00",
                                 tags:[],
                                });
    };

    $scope.addSet = function(exerciseIndex, reps, weight){
      if (reps && weight && reps >= 1 && weight >= 0) {
        // create list if this is the first set
        if(! $scope.exerciseItems[exerciseIndex].setItems)
          $scope.exerciseItems[exerciseIndex].setItems = [];
        $scope.exerciseItems[exerciseIndex].setItems.push({reps:reps, weight:weight})
      }
    }

    $scope.removeSet = function(exerciseIndex, setIndex) {
      $scope.exerciseItems[exerciseIndex].setItems.splice(setIndex, 1);
    };

    $scope.save = function() {
      // post workout
      $http.post(server + "api/list/workouts/" + userInfo.getID() + "/", $scope.workout)
        .success( function(data, status, headers, config ) {
          var workoutID = data.id;

          angular.forEach($scope.exerciseItems, function(exercise){
            var data = {};
            data.wkout = workoutID;
            data.name = exercise.name;
            data.duration = exercise.duration;
            data.tags = exercise.tags;
            console.log(data.tags);

            if (exercise.type == 'aerobic') {
              data.avg_heartrate = exercise.avg_heartrate;
            }

          // post exercises
          $http.post(server + "api/list/" +exercise.type+ "exercises/" + workoutID + "/", data)
            .success( function(data, status, headers, config ) {
              console.log("exercise: ");
              console.log(data);
                var exerciseID = data.id;
                var tagFields = { user: userInfo.getID() };
                if (exercise.type == 'weight') {
                  // insert each set in this weighted exercise
                  angular.forEach(exercise.setItems, function(set, index){
                    set.num = index+1;
                    set.ex = data.id;
                    $http.post(server + "api/list/sets/" + set.ex + "/", set)
                      .error( function(data, status, headers, config ) {
                        console.log(data);
                      }); // error
                    });
                  tagFields['weight_exercise']= exerciseID ;
                }
                else{
                  tagFields['aerobic_exercise']= exerciseID ;

                }
                angular.forEach(exercise.tags, function(tag, index){
                  //post tags for this exercise
                  console.log(tag);
                  tagFields['tag']= tag.text;
                  console.log(tagFields);
                  $http.post(server + "api/list/tags_" +exercise.type+ "exercise/" + exerciseID + "/", tagFields)
                    .success( function(data, status, headers, config ) {
                      console.log(data);
                    });
                }); // forEach

            }) // success
            .error( function(data, status, headers, config ) {
              console.log(data);
            }); // error
          }); // end of forEach
          

          $scope.workout.description = "Description"; // clear workout data
          $scope.exerciseItems = []; // clear exercise data

        }) // success
        .error( function(data, status, headers, config ) {
          console.log(data);
        }); // error
    };

}]);


/* CALENDAR CTRL */
gymjournals.controller('CalendarCtrl', ["$scope", "$http", "userInfo", function($scope, $http, userInfo) {

    // get today's date
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

    console.log($scope.eventSource);

    /* event source that contains custom events on the scope */
    $scope.events = [];

    $http.get(server + "api/list/workouts/" + userInfo.getID() + "/")
      .success( function(data, status, headers, config ) {
        angular.forEach(data, function(workout, index){
          var list = workout.date.split("-");
          var year = list[0];
          var month = list[1];
          var day = list[2];

          $scope.events.push({title: workout.description,
                              start: new Date(year, month-1, day),
                              startEditable: false,
                            });
        }); // for each
      }) // success
      .error( function(data, status, headers, config ) {
        console.log(data);
    });

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [];
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
        start: new Date(y, m, d),
        end: new Date(y, m, d),
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
}]);

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

    $scope.formData.dob="1990-1-1";
    $scope.formData.gender="M";
    console.log($scope.formData);
    $http.post(server + "api/list/users/", $scope.formData)
      .success( function(data, status, headers, config ) {
        $scope.alertType = "success";
        $scope.spmessage = "SUCCESS!";
        $('#loginModal').foundation('reveal', 'close'); // close modal
        $cookieStore.put('loggedin', 'true'); // store session
        $cookieStore.put('data', data); // store user info
        $state.go("settings"); // go to profile page
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
  $scope.user_id = $scope.user_id;
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
