"use strict";

// Declare app level module which depends on filters, and services
angular.module(
  "myApp",
  [
    "ngRoute",
    "myApp.filters",
    "myApp.services",
    "myApp.directives",
    "myApp.controllers"
  ]
).config(
  [
    "$routeProvider",
    function($routeProvider) {
      //$routeProvider.when(
        //"/view2",
        //{templateUrl: "partials/partial2.html", controller: "MyCtrl2"}
      //);
      //$routeProvider.otherwise({redirectTo: "/view1"});
    }
  ]
);

$(document).foundation({
  orbit: {
    timer_speed: 5000,
    pause_on_hover: false,
    bullets: false,
    slide_number: false,
    resume_on_mouseout: true,
    timer: true
  }
});
