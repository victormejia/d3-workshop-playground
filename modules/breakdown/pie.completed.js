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

    // pie!
    var radius = Math.min(width, height) / 2;

    var arc = d3.svg.arc()
      .innerRadius(radius)
      .outerRadius(radius * 0.6);

    // pie function
    var pie = d3.layout.pie()
      .value(function(d) {
        return d.value;
      });

    // set up the arcs
    var arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    // nice color scale
    var color = d3.scale.category20c();
    // var color = d3.scale.category10();


    // within each new g, we append a path
    arcs.append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.value + '%';
      });
  }

}());
