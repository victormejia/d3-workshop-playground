(function() {
  'use strict';

  var el = d3.select('.products'),
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

  d3.json('/data/products.json', function(error, data) {
    visualize(data);
  });

  function visualize(data) {

     var maxVal = d3.max(data, function (d) { return d.sales; });

    // set up scales
    var yScale = d3.scale.linear()
      .domain([0, maxVal + padding])
      .range([height, 0]);

    var xScale = d3.scale.ordinal()
      .domain(data.map(function (d) { return d.name; }))
      .rangeRoundBands([0, width], 0.1);

    // set up axis
    var xAxis = d3.svg.axis()
      .orient('bottom') // place label below tick
      .tickPadding(10); // padding b/n tick and label

    var yAxis = d3.svg.axis()
      .orient('left')
      .tickPadding(10)
      .tickFormat(d3.format('s')); // unit formatting

    var xAxisGroup = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + [0, height] + ')');

    var yAxisGroup = svg.append('g').attr('class', 'axis');

    // create axis
    xAxis.scale(xScale);
    yAxis.scale(yScale);

    xAxisGroup.call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'middle')
        // .attr('dx', '-10px').attr('dy', '-11px').attr('transform', 'rotate(-90)');

    yAxisGroup.call(yAxis);

    var format = d3.format(',');

    // tooltip
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return format(d.sales);;
      });

    svg.call(tip);

    //create visualization
    var rect = svg.selectAll('.rect').data(data);

    // transition new data
    rect.enter()
      .append('rect')
        .attr('x',function (d, i) { return xScale(d.name); })
        .attr('y', height)
        .attr('height', 0)
        .attr('width', xScale.rangeBand())
        .attr('fill', '#59A2F0')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

    rect.transition()
      .duration(1200)
      .attr('y', function (d, i) { return yScale(d.sales); })
      .attr('height', function (d) { return height - yScale(d.sales); });

  }

}());
