// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of cereal
    console.log("selected category: ", category);
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

var svg = d3.select('svg');
const bars = svg.append('g')
        .attr('class', 'bars') 
        .attr('transform', 'translate(15, 242)');

d3.csv('cereals.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    data = dataset;
    // Compute the spacing for bar bands based on number of cereals
    barBand = chartWidth / data.length;
    barWidth = 0.7 * barBand;

    // **** Your JavaScript code goes here ****
    // barXPosition = 45;
    // const gTag = bars.selectAll('g')
    //     .data(dataset)
    //     .enter()
    //     .append('g')
    //     .attr('transform', `translate(${barXPosition}, 0)`);
        
    // console.log('dataset.sugar: ', dataset.sugar)
    // gTag.append('rect')
    //     .attr('class', 'data-rect')
    //     .attr('transform', `translate(0, ${-(dataset.sugar * 11.5)})`) 
    //     .attr('width', barWidth)
    //     .attr('height', `${(dataset.sugar * 11.5)}`)
    //     .attr('fill',  '#4571c9');

    //     // const cerealNameLength = csvData.cerealName.length;

    // gTag.append('text')
    //     .attr('class', 'data-title')
    //     .text(dataset.cerealName) 
    //     .style('font-size', '75%')
    //     .attr('transform', `translate(17, 15) rotate(-46) translate(${-dataset.cerealName.length * 6}, 0)`) 

    console.log("dataset: ", dataset);
    barXPosition = 45;
    data.map((csvData) => {
        const scaledSugar = csvData.sugar * 11.5; 

        const gTag = bars
        .append('g')
        .attr('class', 'data-gtag')
        .attr('transform', `translate(${barXPosition}, 0)`);
        
        gTag
        .append('rect')
        .attr('class', 'data-rect')
        .attr('transform', `translate(0, ${-scaledSugar})`) 
        .attr('width', barWidth)
        .attr('height', scaledSugar)
        .attr('fill',  '#4571c9');

        const cerealNameLength = csvData.cerealName.length;

        gTag
        .append('text')
        .attr('class', 'data-title')
        .text(csvData.cerealName) 
        .style('font-size', '75%')
        .attr('transform', `translate(17, 15) rotate(-46) translate(${-cerealNameLength * 6}, 0)`) 

        barXPosition += barWidth + 8;
    })
    
    var yAxisScale= d3.scaleLinear()
    .domain([0,15]).range([240,70]);

    svg.append('g').attr('class', 'y axis')
        .attr('transform', 'translate(55,0)')
        .call(d3.axisLeft(yAxisScale).ticks(5));

    svg.append('text')
        .attr('class', 'title')
        .attr('transform','translate(240,30)')
        .text('Sugars in Cereals');

    // Add axes to chart
    addAxes();
    // Update the chart for All cereals to initialize
    updateChart('All');
});






function addAxes() {
    // **** Draw the axes here ****

}

function updateChart(manufacturer) {
    //  Create a filtered array of cereals based on the manufacturer
    var cereals;
    if (manufacturer === 'All')
        cereals = data.filter(d => d.manufacturer !== manufacturer);
    else cereals = data.filter(d => d.manufacturer === manufacturer);

    // **** Draw and Update your chart here ****

}

// Remember code outside of the data callback function will run before the data loads








