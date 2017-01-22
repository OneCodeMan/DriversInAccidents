function arrayMax(arr) {
  return arr.reduce((a, b) => Math.max(a, b));
}

function arrayMin(arr) {
  return arr.reduce((a, b) => Math.min(a, b));
}

(function(d3) {
  'use strict';

  var counters = { maleCount: 0, femaleCount: 0, nullCount: 0,
                   ageGroup1: 0, ageGroup2: 0, ageGroup3: 0,
                   ageGroup4: 0, ageGroup5: 0, ageGroup6: 0,
                   ageGroup7: 0};

  d3.csv('data/DriversInAccidents.csv', function(data) {
    data.forEach(function(d) {
      var driverGender = d.drv_gndr_cd;
      var driverAgeRaw = d.drv_prty_age;
      var driverAge = parseInt(driverAgeRaw);
      switch (driverGender) {
        case 'M':
          counters.maleCount++;
          break;
        case 'F':
          counters.femaleCount++;
          break;
        default:
          counters.nullCount++;
          break;
      }

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

    });

    plotPie();
    plotBar();
  });

  function plotPie() {
    //console.log(counters.maleCount);
    //console.log(counters.femaleCount);
    //console.log(counters.nullCount);
    var dataset = [
      { label: 'Male', count: counters.maleCount },
      { label: 'Female', count: counters.femaleCount },
      { label: 'Null', count: counters.nullCount }
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
    }

  function plotBar() {
    console.log("bruh");
  }

})(window.d3);
