(function() {
  'use strict';

  var el = d3.select('.punchcard'),
      margin = {top: 20, right: 20, bottom: 30, left: 80},
      elWidth = parseInt(el.style('width'), 10),
      elHeight = parseInt(el.style('height'), 10),
      width = elWidth - margin.left - margin.right,
      height = elHeight - margin.top - margin.bottom,
      padding = 20;

  var svg = el.append('svg')
      .attr('width', elWidth)
      .attr('height', elHeight)
    .append('g')
      .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');

  d3.json('/data/punchcard.json', function(error, data) {
    visualize(data);
  });

  function visualize(data) {

    var x = d3.scale.linear()
      .domain([0, 23])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, 6])
      .range([0, height]);

    var maxR = d3.max(data, function(d) {
      return d[2];
    });

    var r = d3.scale.sqrt()
      .domain([0, maxR])
      .range([0, 18])

    // setup axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(24)
      .tickFormat(function (d, i) {
        var suffix = (d > 12) ? 'p' : 'a';
        var time = (d%12 === 0) ? 12 : d%12;
        return time + suffix;
      })

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(7)
      .tickFormat(function (d, i) {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
      })

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + [0, height] + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

    // tooltip
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return d[2] + ' Views';
      });

    svg.call(tip);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'circle')
        .attr('fill', '#8D95C9')
        .attr('cx', function(d) {
          return x(d[1]);
        })
        .attr('cy', function(d) {
          return y(d[0]);
        })
        .attr('r', 0)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .transition()
        .duration(1000)
        .attr('r', function(d) {
          return r(d[2]);
        });

  }

}());
