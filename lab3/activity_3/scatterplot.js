// **** Your JavaScript code goes here ****
d3.csv('NetflixOriginals.csv').then((csvDatas) => {
    // const gTag = svg.selectAll('g')
    // .data(csvDatas)
    // .enter()
    // .append('g')
    // .attr('transform', `translate(${scaleDate(new Date(csvDatas.Premiere))},${scaleIMDB(csvDatas["IMDB Score"])})`)


    // gTag.append('circle')
    // .attr('cx', scaleDate(new Date(csvData.Premiere)))
    // .attr('cy', scaleIMDB(csvDatas["IMDB Score"]))
    // .attr('r', '3.5px')
    // .style('fill', csvDatas["IMDB Score"] >= 7.5 ? 'orange' : 'blue')

    // gTag.append('text')
    // .text('hi')
    // .attr('x', scaleDate(new Date(csvDatas.Premiere)))
    // .attr('y', scaleIMDB(csvDatas["IMDB Score"]))


    

    

    // which form to bind the data
    csvDatas.map((csvData) => {
        const gTag = svg
        .append('g')
        .attr('class', 'data-gtag')
        .attr('transform', `translate(${scaleDate(new Date(csvData.Premiere))},${scaleIMDB(csvData["IMDB Score"])})`)

        gTag
        .append('circle')
        .attr('class', 'data-circle')
        .attr('r', '3.5px')
        .style('fill', 'blue');
        
        gTag
        .append('text')
        .attr('class', 'data-title')
        .text(csvData.Title)
    })
})

// **** Functions to call for scaled values ****

function scaleDate(date) {
    return dateScale(date);
}

function scaleIMDB(imdb) {
    return imdbScale(imdb);
}

// **** Code for creating scales, axes and labels ****

var dateScale = d3.scaleTime()
    .domain([new Date(2015, 0, 1), new Date(2022, 0, 1)]).range([60,700]);

var imdbScale = d3.scaleLinear()
    .domain([1,10]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(dateScale).ticks(d3.timeYear));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('Premiere Date');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(imdbScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('IMDB Ranking');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Netflix Originals Rankings');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(800, 140)')
    .text('Legend:')

const firstLegendGTag = svg.append('g')
.attr('transform', 'translate(800, 180)')

firstLegendGTag.append('circle')
.attr('r', '7px')
.style('fill', 'blue')
.style('opacity', '50%')
.attr('transform','translate(-50,0)');

firstLegendGTag.append('text')
.text('IMDB Score < 4')
.attr('transform', 'translate(-25, 5)')


const secondLegentGTag = svg.append('g')
.attr('transform', 'translate(800, 220)')

secondLegentGTag.append('circle')
.attr('r', '7px')
.style('fill', 'blue')
.style('opacity', '75%')
.attr('transform','translate(-50,0)')

secondLegentGTag.append('text')
.text('4 < IMDB Score < 6')
.attr('transform', 'translate(-25, 5)')


const thirdLegentGTag = svg.append('g')
.attr('transform', 'translate(800, 260)')

thirdLegentGTag.append('circle')
.attr('r', '7px')
.style('fill', 'blue')
.style('opacity', '100%')
.attr('transform','translate(-50,0)')

thirdLegentGTag.append('text')
.text('6 < IMDB Score')
.attr('transform', 'translate(-25, 5)')
