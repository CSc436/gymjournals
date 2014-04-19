'use strict';

/* Directives */

var directives = angular.module('gymjournals.directives', []);

directives.directive('weightChart', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/_weightChart.html'
  };
});
