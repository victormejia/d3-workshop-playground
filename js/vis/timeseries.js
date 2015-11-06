(function() {
  'use strict';
  var el = d3.select('.timeseries'),
      elWidth = parseInt(el.style('width'), 10),
      elHeight = parseInt(el.style('height'), 10),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = elWidth - margin.left - margin.right,
      height = elHeight - margin.top - margin.bottom;

  var svg = el.append("svg")
      .attr("width", elWidth)
      .attr("height", elHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("/data/timeseries.json", function(error, data) {
    if (error) throw error;
    visualize(data);
  });

  function visualize(data) {

    var x = d3.time.scale()
        .range([0, width])
        .domain(d3.extent(data, function(d) { return d.date; }));

    var y = d3.scale.linear()
        .range([height, 0])
        .domain(d3.extent(data, function(d) { return d.value; }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.time.format('%m/%d'))
        .ticks(d3.time.day, 3)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .innerTickSize(-width)
        .orient("left");

    var line = d3.svg.line()
        .interpolate('monotone')
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    var path = svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // animate path
    // src: http://bl.ocks.org/duopixel/4063326
    var totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(400)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
  }
}());
