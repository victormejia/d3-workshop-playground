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
    // code here
  }

}());
