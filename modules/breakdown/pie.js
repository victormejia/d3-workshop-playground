(function() {
  'use strict';

  // set up margins
  var el = d3.select('.pie'),
      elWidth = parseInt(el.style('width'), 10),
      elHeight = parseInt(el.style('height'), 10),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = elWidth - margin.left - margin.right,
      height = elHeight - margin.top - margin.bottom;

  // create svg element
  var svg = el.append("svg")
      .attr("width", elWidth)
      .attr("height", elHeight)
    .append("g")
      .attr("transform", "translate(" + elWidth/2 + "," + elHeight/2 + ")");

  d3.json("/data/browser.json", function(error, data) {
    data.forEach(function(d) {
      d.value = +d.value;
    });
    visualize(data);
  });

  function visualize(data) {
    // code here
  }

}());
