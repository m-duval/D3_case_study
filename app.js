// CHART STRUCTURE

var svgWidth = 960;

var svgHeight = 660;

var margin = {top: 30, right: 30, bottom: 100, left: 100};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// SVG WRAPPER

var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup = svg.append("g");

// IMPORT CSV DATA

d3.csv("data/data.csv", function(error, povertyData) {
    if (error) return console.warn(error);

    povertyData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.obesity = +data.obesity;
    });

// INITIALIZE TOOL TIP

    var toolTip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

// CREATE TOOL TIP

    chart.call(toolTip);

// CREATE SCALES

    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

// CREATE AXES

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

// STORE MIN + MAX VALUES

    var xMin;
    var xMax;
    var yMin;
    var yMax;

// FUNCTION TO FIND MIN + MAX

    function findMinAndMaxX(dataColumnX) {
        xMin = d3.min(dataset, function (d) { return d[dataColumnX] * 0.8 });
        xMax = d3.max(dataset, function (d) { return d[dataColumnX] * 1.2 });
    };

    function findMinAndMaxY(dataColumnY) {
        yMin = d3.min(dataset, function (d) { return d[dataColumnY] * 0.8 });
        yMax = d3.max(dataset, function (d) { return d[dataColumnY] * 1.2 });
    };

// SET DEFAULT X-AXIS

    var defaultAxisLabelX = "POVERTY"

// SET DEFAULT Y-AXIS

    var defaultAxisLabelY = "OBESITY"

// CALL FINDMINANDMAX

    findMinAndMaxX(defaultAxisLabelX)
    findMinAndMaxY(defaultAxisLabelY)

// SET AXES DOMAIN

    xScale.domain([xMin, xMax]);
    yScale.domain([yMin, yMax]);

// APPEND AXES

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

// APPEND AXES TO CHART

    chartGroup.append("g")
        .attr("transform", 'translate(0, ${height})')
        .attr("class", "x-axis")
        .call(xAxis);

    chartGroup.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

// APPEND CIRCLES TO DATA POINTS

var circlesGroup = chartGroup.selectAll("circle")
    .data(povertyData)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", d => yScale(d))
    .attr("r", "5")
    .attr("fill", "green")
    .attr("opacity", .5);

// MAKE RESPONSIVE

makeResponsive();

// RESPONSIFY WINDOW RESIZE

d3.select(window).on("resize", makeResponsive);