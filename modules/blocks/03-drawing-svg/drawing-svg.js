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

  var selection = svg.selectAll('.point')
    .data(data)
    .enter();

  selection
    .append('circle')
      .attr('class', 'point')
      .attr('r', function(d, i) {
        return d.value;
      })
      .attr('fill', function(d, i) {
        if (d.value > 15 ) {
          return '#8D94CB';
        }
        return 'white';
      })
      .attr('cx', function(d, i) {
        return i * 100;
      })
      .attr('cy', height/2);
}());
