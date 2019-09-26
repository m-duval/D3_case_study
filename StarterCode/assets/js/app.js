var svgWidth = 960;
var svgHeight = 660;

var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// IMPORT CSV DATA

d3.csv("data.csv", function(error, povertyData) {
    if (error) return console.warn(error);
    
console.log(povertyData);

    povertyData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.obesity = +data.obesity;
    });

// CREATE SCALES

    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

// CREATE AXES

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

// APPEND AXES

chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

chartGroup.append("g").call(leftAxis);

