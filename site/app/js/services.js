'use strict';

/* Services */

var services = angular.module('gymjournals.services', []);

services.factory('bodyWeightData', function($http) {
  return {
    getBodyWeightData: function(user_id) {
      //return the promise directly.
      return $http.get("http://localhost:8000/api/list/weights/" + user_id + "/")
      .then(function(result) {
        //resolve the promise as the data
        console.log("service");
        console.log(result.data);
        return result.data;
      });
    }
  }
});
