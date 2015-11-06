(function() {
  'use strict';

  // var data = [
  //   {
  //     "browser":"Chrome",
  //     "value": "45"
  //   },
  //   {
  //     "browser":"Safari",
  //     "value":"12"
  //   },
  //   {
  //     "browser":"Firefox",
  //     "value":"18"
  //   },
  //   {
  //     "browser":"IE",
  //     "value":"25"
  //   }
  // ];

  d3.json('/data/browser.json', function(err, data) {
    d3.select('#data-binding')
      .selectAll('p')
      .data(data)
      .enter()
      .append('p')
        .text(function(d) {
          return d.browser + ' ' + d.value;
        });
  });

}());
