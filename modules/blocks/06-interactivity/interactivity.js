(function() {
  'use strict';

  var el = d3.select('.vis'),
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

  var tooltip = svg.append('g').attr('class', 'custom-tooltip');

  tooltip.append('rect').attr({ height: '30', width: '100' });

  tooltip.append('text').attr({ x: 10, y: 20 }); // relative to group element

  var data = [
    {
      "browser":"Chrome",
      "value": "45"
    },
    {
      "browser":"Safari",
      "value":"12"
    },
    {
      "browser":"Firefox",
      "value":"18"
    },
    {
      "browser":"IE",
      "value":"25"
    }
  ];

  svg.selectAll('.point')
    .data(data)
    .enter()
    .append('circle')
      .attr('class', 'point')
      .attr('r', 0)
      .attr('fill', '#8D94CB')
      .attr('cx', function(d, i) {
        return i * 100;
      })
      .attr('cy', height/2)
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout)
      .transition()
      .duration(1000)
      .delay(function(d,i) {
        return i * 100;
      })
      .attr('r', function(d, i) {
        return d.value;
      });

  function handleMouseover(d, i) {
    var x = d3.event.offsetX;
    var y = d3.event.offsetY;

    var tooltip = svg.select('.custom-tooltip')
      .attr('transform', 'translate(' + [x,y] + ')');

    tooltip.select('text').text('Value: ' + d.value);

    tooltip.style('visibility', 'visible');
  }

  function handleMouseout(d, i) {
    svg.select('.custom-tooltip').style('visibility', 'hidden')
  }
}());
