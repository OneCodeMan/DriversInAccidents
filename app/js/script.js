function arrayMax(arr) {
  return arr.reduce((a, b) => Math.max(a, b));
}

function arrayMin(arr) {
  return arr.reduce((a, b) => Math.min(a, b));
}

function average(arr) {
  var sum = arr.reduce((a, b) => a + b, 0) / arr.length;
  return sum;
}

function mode(arr) {
  var numMapping = {};
  var greatestFreq = 0;
  var mode;
  arr.forEach(function findMode(number) {
    numMapping[number] = (numMapping[number] || 0) + 1;

    if (greatestFreq < numMapping[number]) {
      greatestFreq = numMapping[number];
      mode = number;
    }
  });
  return mode;
}

function median(arr) {
  arr.sort((a, b) => a - b);
  let median = (arr[(arr.length - 1) >> 1] + arr[arr.length >> 1 ]) / 2;
  return median;
}

(function(d3) {
  'use strict';

  var genderCounters = { maleCount: 0, femaleCount: 0, nullCount: 0 }
  var ages = [];

  d3.csv('data/DriversInAccidents.csv', function(data) {
    data.forEach(function(d) {
      var driverGender = d.drv_gndr_cd;
      var driverAgeRaw = d.drv_prty_age;
      var driverAge = parseInt(driverAgeRaw);
      switch (driverGender) {
        case 'M':
          genderCounters.maleCount++;
          break;
        case 'F':
          genderCounters.femaleCount++;
          break;
        default:
          genderCounters.nullCount++;
          break;
      }

      if (!Number.isNaN(driverAge)) {
        ages.push(driverAge);
      }

    });

    plotGender();
    plotAge();
  });

  function plotGender() {
    //console.log(genderCounters.maleCount);
    //console.log(genderCounters.femaleCount);
    //console.log(genderCounters.nullCount);
    var dataset = [
      { label: 'Male', count: genderCounters.maleCount },
      { label: 'Female', count: genderCounters.femaleCount },
      { label: 'Null', count: genderCounters.nullCount }
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

  function plotAge() {
    var avgAge = average(ages);
    var rangeAge = arrayMax(ages) - arrayMin(ages);
    var modeAge = mode(ages);
    var medianAge = median(ages);
    console.log(arrayMax(ages));
    console.log(arrayMin(ages));
    console.log(rangeAge);
    console.log(modeAge);
    console.log(medianAge);

  }

})(window.d3);
