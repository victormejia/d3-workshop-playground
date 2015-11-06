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

  var data = [22, 50, 35];

  update();

  function update() {
    var points = svg.selectAll('.point')
      .data(data, function(d) { return d; });

    points.enter()
      .append('circle')
        .attr('class', 'point')
        .attr('r', function(d, i) {
          return d;
        })
        .attr('fill', '#8D94CB')
        .attr('cx', function(d, i) {
          return i * 200;
        })
        .attr('cy', height/2);

    points.exit().remove();
  }

  function updateData() {
    data = [22, 43, 72];
    update();
  }

  function addData() {
    data = [22, 43, 72, 80];
    update();
  }

  function removeData() {
      // remove last element
    data = [22, 43];
    update();
  }

  document.querySelector('#btn-updateData').addEventListener('click', function() {
    updateData();
  })

  document.querySelector('#btn-addData').addEventListener('click', function() {
    addData();
  });

  document.querySelector('#btn-removeData').addEventListener('click', function() {
    removeData();
  })

}());
