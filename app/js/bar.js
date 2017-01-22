var ageCounters = { ageGroup1: 0, ageGroup2: 0, ageGroup3: 0,
                 ageGroup4: 0, ageGroup5: 0, ageGroup6: 0,
                 ageGroup7: 0};

var margin = {top: 20, right: 30, bottom: 30, left: 40}
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
  .range([0, width])
  .padding([0.1]);

var y = d3.scaleLinear()
  .range([height, 0]);

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('data/DriversInAccidents.csv', function(err, data) {
  if (err) throw err;

  data.forEach(function(d) {
    if (!Number.isNaN(driverAge)) {
      if (driverAge >= 15 && driverAge <= 25) {
        counters.ageGroup1++;
      } else if (driverAge >= 26 && driverAge <= 35) {
        counters.ageGroup2++;
      } else if (driverAge >= 36 && driverAge <= 45) {
        counters.ageGroup3++;
      } else if (driverAge >= 46 && driverAge <= 55) {
        counters.ageGroup4++;
      } else if (driverAge >= 56 && driverAge <= 65) {
        counters.ageGroup5++;
      } else if (driverAge >= 66 && driverAge <= 75) {
        counters.ageGroup6++;
      } else if (driverAge >= 76) {
        counters.ageGroup7++;
      }
    }

    var ageValues = Object.values(ageCounters);

  });



  x.domain(data.map(function(d){ return d.drv_prty_age; }));
  y.domain([0, d3.max(ageValues)]);

  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) { return x(d.drv_prty_age); })
    .attr('width', x.bandwidth())
    .attr('y', function(d) { return y(d.sales); })
    .attr('height', function(d) { return height - y(d.sales); });

  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  svg.append('g')
    .call(d3.axisLeft(y));

});
