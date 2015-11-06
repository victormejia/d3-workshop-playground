(function() {
  'use strict';

  // set up margins
  var el = d3.select('.geomap'),
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
       .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');

  d3.json("/data/us-states.json", function(error, data) {
    visualize(data);
  });

  function visualize(data) {
    var projection = d3.geo.albersUsa()
                      .translate([width/2, height/2])
                      .scale([1200]);

    var path = d3.geo.path()
      .projection(projection);

    svg.selectAll("path")
     .data(data.features)
     .enter()
     .append("path")
     .attr("d", path)
      .style("fill", "#6c798c")
      .style('stroke', '#8893A4');

    //Load in cities data
    d3.csv("/data/us-cities.csv", function(data) {

      var format = d3.format(',');

      // tooltip
      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) {
          return d.place + ' - ' + format(d.views) + ' Views';
        });

      svg.call(tip);

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", "#59A2F0")
        .attr("cx", function(d) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
          return projection([d.lon, d.lat])[1];
        })
        .attr('r', 0)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .transition()
        .duration(500)
        .attr("r", function(d) {
          return Math.sqrt(parseInt(d.views) * 0.008);
        })
        .style("opacity", 0.75);

    });
  }

}());
