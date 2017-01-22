(function(d3) {
  'use strict';

  d3.csv('data/DriversInAccidents.csv', function(data) {
    console.log(data[0]);
    /*
    data.forEach(function(d) {
      console.log(d);
    });
    */
  });


  var dataset = [
    { label: 'Male', count: 10 },
    { label: 'Female', count: 20 },
    { label: 'Null', count: 3 }
  ];

  var width = 300;
  var height = 400;
  var radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
    .range(['#00A7E1', '#007EA7', '#003459']);

  var svg = d3.select('#gender-pie-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  var pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return color(d.data.label);
    });
  })(window.d3);
