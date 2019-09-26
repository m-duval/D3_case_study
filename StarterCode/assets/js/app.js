var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  d3.csv("data.csv", function(error, povertyData) {
    if (error) return console.warn(error);
    
    console.log(povertyData);
    
    povertyData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.obesity = +data.obesity;
    });