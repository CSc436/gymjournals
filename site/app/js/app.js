'use strict';

/* App Module */

var app = angular.module('schedulerApp', [ ]);



app.controller('MainSchedulerCtrl', function($scope) {
	//var d = new Date(2013, 10, 12).toJSON().substr(0,10);
	//console.log(d);

	//Get list of dates from database
	//For each, append to scope.events?

	var date = "2014-12-02";
	var list = date.split("-");
	var year = list[0];
	var month = list[1] + 1;
	var day = list[2];

  $scope.events = [
    { 

      id:1,
      text:"Task A-12458",
      start_date: new Date(2013, 11, 12),
      end_date: new Date(2013, 11, 13) 
    },
     
     { id:2, text:"Task A-83473",
       start_date: new Date(2013, 10, 22 ),
       end_date: new Date(2013, 10, 24 ) }
  ];
 
  // var d = start_date;
  //console.log();

  $scope.scheduler = { date : new Date(2013,10,1) };

});