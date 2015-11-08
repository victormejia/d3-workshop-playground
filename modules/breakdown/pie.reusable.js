var PieChart = (function () {
    function PieChart(el, data) {
        this.el = el;
        this.data = data;
        this.render();
    }

    PieChart.prototype.render = function () {
          this.svg();
          this.visualize();
    };

    PieChart.prototype.svg = function () {
      var el = d3.select(this.el),
          elWidth = parseInt(el.style('width'), 10),
          elHeight = parseInt(el.style('height'), 10),
          margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = elWidth - margin.left - margin.right,
          height = elHeight - margin.top - margin.bottom;

      this.width = width;
      this.height = height;

      // create svg element
      var svg = el.append("svg")
          .attr("width", elWidth)
          .attr("height", elHeight)
        .append("g")
          .attr("transform", "translate(" + elWidth/2 + "," + elHeight/2 + ")");

      this.svg = svg;
    };

    PieChart.prototype.visualize = function () {
      var data = this.data,
      width = this.width,
      height = this.height,
      svg = this.svg;

      // arc
      var radius = Math.min(width, height) / 2 + 20;
      var arc = d3.svg.arc()
                  .innerRadius(radius)
                  .outerRadius(radius * 0.6);

      function arcTween(a) {
        // see: http://bl.ocks.org/mbostock/1346410
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
          return arc(i(t));
        };
      }

      // pie function
      var pie = d3.layout.pie()
        .value(function(d) {
          return d.value;
        });

      // set up the arcs
      var arcs = svg.selectAll(".arc")
        .data(pie(data));

      // nice color scale
      // var color = d3.scale.category20c();
      var color = ['#5DA4ED', '#348DE8', '#8D95C9', '#717BBA', '#5A6295'];

      // transition new data
      arcs.enter().append('path')
        .attr('class', 'arc')
        .attr('fill', function (d, i) { return color[i]; })
        .each(function (d) { this._current = { startAngle: 0, endAngle: 0}; });

      // animate the data
      arcs.transition().duration(1000).attrTween('d', arcTween)
        .each('end', function(d) {
          var translate = arc.centroid(d);
          svg.append("text")
               .attr("transform", 'translate(' + translate + ')')
               .attr("dy", "-0.4em")
               .style("text-anchor", "middle")
               .text(function() {
                 return d.data.value + '%';
               });

           svg.append("text")
                .attr("transform", 'translate(' + translate + ')')
                .attr("dy", "1.3em")
                .style("text-anchor", "middle")
                .text(function() {
                  return d.data.browser;
                });
        });
    };

    return PieChart;
})();
