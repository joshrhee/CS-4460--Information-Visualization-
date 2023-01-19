// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of cereal
    updateChart(category);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        cerealName: row['Cereal Name'],
        manufacturer: row['Manufacturer'],
        sugar: +row['Sugars']
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = { t: 60, r: 20, b: 80, l: 60 };

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Variable for the spacing of bar charts
var barBand;
var barWidth;

// scales
var sugarScale; // y axis
var xBandScale; // x axis

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', `translate(${padding.l}, ${padding.t})`);

var data;
var barHeightUnit;

var originalData;
var currFilterdValue = 0;
var currentManufacturer = "All";

var svg = d3.select('svg');

d3.csv('cereals.csv', dataPreprocessor).then(function (dataset) {

    data = dataset;
    originalData = dataset;
    // Add axes to chart
    addAxes();
    // Update the chart for All cereals to initialize
    updateChart('All');
});


function updateBarChartByFilter() {
    const inputField = document.getElementById("cutoff");
    const cutOffValue = inputField.value;

    currFilterdValue = cutOffValue;

    cutOffData = data.filter((d) => {
        return d.sugar >= cutOffValue;
    })

    // Compute the spacing for bar bands based on number of cereals
    barBand = chartWidth / cutOffData.length;
    barWidth = 0.7 * barBand;
    barXPosition = 45;

    var dataGTag = d3.select('svg').selectAll('.data-gTag')
        .data(cutOffData, d => d.cerealName);

    var dataGTagEnter = dataGTag.enter()
        .append('g')
        .attr('class', 'data-gTag');

    dataGTagEnter.append('rect')
        .attr('class', 'data-rect')
        .attr('transform', function (d) {
            return `translate(0, ${-(d.sugar * 11.5)})`
        })
        .attr('width', 18.2)
        .attr('height', function (d) {
            return d.sugar * 11.5
        })
        .attr('fill', '#4571c9');

    dataGTagEnter.append('text')
        .attr('class', 'data-title')
        .text(function (d) { return d.cerealName })
        .style('font-size', '75%')
        .attr('transform', function (d) {
            return `translate(17, 15) rotate(-46) translate(${-d.cerealName.length * 6}, 0)`
        })

    dataGTag.exit().remove();

    dataGTagEnter.merge(dataGTag)
        .attr('transform', function (_, i) {
            return `translate(${15 + barXPosition + i * (18.2 + 8)}, 242)`
        });
}

function addAxes() {
    // **** Draw the axes here ****

    var yAxisScale = d3.scaleLinear()
        .domain([0, 15]).range([240, 70]);

    svg.append('g').attr('class', 'y axis')
        .attr('transform', 'translate(55,0)')
        .call(d3.axisLeft(yAxisScale).ticks(5));

    svg.append('text')
        .attr('class', 'title')
        .attr('transform', 'translate(240,30)')
        .text('Sugars in Cereals');
}

function updateChart(manufacturer) {
    //  Create a filtered array of cereals based on the manufacturer
    var cereals;
    if (manufacturer === 'All') {
        cereals = originalData;
        data = originalData;
    }
        
    else {
        cereals = originalData.filter(d => d.manufacturer === manufacturer)
        data = originalData.filter(d => d.manufacturer === manufacturer)
    }
    // **** Draw and Update your chart here ****
    currentManufacturer = manufacturer;

    // Create global variables here and intialize the chart

    if (currFilterdValue !== 0) {
        const newCereals = cereals.filter((d) => {
            return d.sugar >= currFilterdValue;
        })
        cereals = newCereals;
    }

    // data = cereals;
    dataset = cereals;
    
    // Compute the spacing for bar bands based on number of cereals
    barBand = chartWidth / data.length;
    barWidth = 0.7 * barBand;
    barXPosition = 45;

    var dataGTag = d3.select('svg').selectAll('.data-gTag')
        .data(dataset, d => d.cerealName);

    var dataGTagEnter = dataGTag.enter()
        .append('g')
        .attr('class', 'data-gTag');

    dataGTagEnter.append('rect')
        .attr('class', 'data-rect')
        .attr('transform', function (d) {
            return `translate(0, ${-(d.sugar * 11.5)})`
        })
        .attr('width', 18.2)
        .attr('height', function (d) {
            return d.sugar * 11.5
        })
        .attr('fill', '#4571c9');

    dataGTagEnter.append('text')
        .attr('class', 'data-title')
        .text(function (d) { return d.cerealName })
        .style('font-size', '75%')
        .attr('transform', function (d) {
            return `translate(17, 15) rotate(-46) translate(${-d.cerealName.length * 6}, 0)`
        });

    // dataGTagEnter.exit().remove();
    dataGTag.exit().remove();

    dataGTagEnter.merge(dataGTag)
        .attr('transform', function (_, i) {
            return `translate(${15 + barXPosition + i * (18.2 + 8)}, 242)`
        });
}



// Remember code outside of the data callback function will run before the data loads








