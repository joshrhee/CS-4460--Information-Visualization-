// **** Your JavaScript code goes here ****
d3.csv('NetflixOriginals.csv').then((csvDatas) => {
    csvDatas.map((csvData) => {
        const circleColor = csvData["IMDB Score"] >= 7.5 ? 'orange' : 'blue';

        svg
        .append('circle')
        .attr('cx', scaleDate(new Date(csvData.Premiere)))
        .attr('cy', scaleIMDB(csvData["IMDB Score"]))
        .attr('r', '3.5px')
        .style('fill', circleColor)
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