'use strict';

/* Directives */

var directives = angular.module('gymjournals.directives', []);
directives.directive('weightChart', function() {

  return {
    restrict: "EA",
    scope: {},
    link: function(scope, element, attrs) {


      var svg = d3.select(element[0]).append("svg");

      var data;
      d3.json("http://localhost:8000/api/list/weights/1/", function(myData) {
        myData.forEach(function(d) {
          d.date = new Date(d[0]);
          d.close = parseFloat(d[1]);
        });
        data = myData;
        resize();
      });

      d3.select(window).on('resize', resize);

      function resize() {
          svg.selectAll('*').remove();
      /*/ Beginning of Daniel's attempt at Javascript {{{ 
        // update width
        width = parseInt(d3.select('#weightChart').style('width'));
        width = width - margin.left - margin.right;

        // update height
        height = parseInt(d3.select('#weightChart').style('height'));
        height = height - margin.top - margin.bottom;

        console.log("height: " + height);
        console.log("width: " + width);

        // specify ranges for x and y axes
        x.range([0, width]);
        y.range([height, 0]);

        xAxis.scale(x);
        yAxis.scale(y);

        area.y0(height);
      // end of Daniel's attempt }}}*/

      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = window.innerWidth - margin.left - margin.right,
          height = (window.innerWidth * (3 / 16)) - margin.top - margin.bottom;

      var x = d3.time.scale()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close); });

      svg.attr("id", "weightChart")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "outerGroup")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");
    }
    
    }};
});
