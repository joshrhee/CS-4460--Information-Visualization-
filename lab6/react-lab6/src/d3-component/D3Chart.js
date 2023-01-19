import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import * as d3 from 'd3';

import Header from './Header';

import "./D3Chart.css";

function D3Chart() {
    const svgRef = useRef(null);
    const width = window.innerWidth - 50;
    const height = window.innerHeight - 100;
    const margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    }
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    const [csvData, setCsvData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [iscolumnsUndefined, setIscolumnsUndefined] = useState(true);
    const [yColumn, setYColumn] = useState("")
    const [yRange, setYRange] = useState([]); // 215973199, 329484123
    const [currBarData, setCurrBarData] = useState([])

    let bicycles = [];
    let bicyclesPer1000K = [];
    let carOccupants = [];
    let carsPer100K = [];
    let motorcycles = [];
    let motorcyclesPer100k = [];
    let pedPer100k = [];
    let pedestrains = [];
    let populations = [];
    let totals = [];
    let totalsPer100k = [];
    let trucks = [];
    let trucksPer100k = [];
    let years = [];

    const yColumnHandler = useCallback((column) => {
        setYColumn(column)
        setYColumnValues(column);

        const returnYColumnValue = returnYColumnValues(column)
        setYRange([0, Math.max(...returnYColumnValue)])
    }, [])

    function returnYColumnScaleValue(column) {
        if (column === "Bicycle") {
            return 0.96;
        } else if (column === "Bicycle_Per_100K") {
            return 1910;
        } else if (column === "Car_Occupant") {
            return 0.0272;
        } else if (column === "Car_Per_100K") {
            return 60.5;
        } else if (column === "Motorcycle") {
            return 0.17;
        } else if (column === "Motorcycle_Per_100K") {
            return 415;
        } else if (column === "Ped_Per_100K") {
            return 265;
        } else if (column === "Pedestrian") {
            return 0.118;
        } else if (column === "Population") {
            return 0.000003;
        } else if (column === "Total") {
            return 0.0187;
        } else if (column === "Total_Per_100K") {
            return 42;
        } else if (column === "Trucks") {
            return 0.7;
        } else if (column === "Trucks_Per_100K") {
            return 1600;
        } else if (column === "Year") {
            return 1.3;
        }
    }

    function returnYColumnValues(column) {
        if (column === "Bicycle") {
            return bicycles;
        } else if (column === "Bicycle_Per_100K") {
            return bicyclesPer1000K;
        } else if (column === "Car_Occupant") {
            return carOccupants;
        } else if (column === "Car_Per_100K") {
            return carsPer100K;
        } else if (column === "Motorcycle") {
            return motorcycles;
        } else if (column === "Motorcycle_Per_100K") {
            return motorcyclesPer100k;
        } else if (column === "Ped_Per_100K") {
            return pedPer100k;
        } else if (column === "Pedestrian") {
            return pedestrains;
        } else if (column === "Population") {
            return populations
        } else if (column === "Total") {
            return totals
        } else if (column === "Total_Per_100K") {
            return totalsPer100k
        } else if (column === "Trucks") {
            return trucks
        } else if (column === "Trucks_Per_100K") {
            return trucksPer100k;
        } else if (column === "Year") {
            return years;
        }
    }

    function setYColumnValues(column) {
        if (column === "Bicycle") {
            setCurrBarData(bicycles);
        } else if (column === "Bicycle_Per_100K") {
            setCurrBarData(bicyclesPer1000K);
        } else if (column === "Car_Occupant") {
            setCurrBarData(carOccupants);
        } else if (column === "Car_Per_100K") {
            setCurrBarData(carsPer100K);
        } else if (column === "Motorcycle") {
            setCurrBarData(motorcycles);
        } else if (column === "Motorcycle_Per_100K") {
            setCurrBarData(motorcyclesPer100k);
        } else if (column === "Ped_Per_100K") {
            setCurrBarData(pedPer100k);
        } else if (column === "Pedestrian") {
            setCurrBarData(pedestrains);
        } else if (column === "Population") {
            setCurrBarData(populations)
        } else if (column === "Total") {
            setCurrBarData(totals)
        } else if (column === "Total_Per_100K") {
            setCurrBarData(totalsPer100k)
        } else if (column === "Trucks") {
            setCurrBarData(trucks)
        } else if (column === "Trucks_Per_100K") {
            setCurrBarData(trucksPer100k);
        } else if (column === "Year") {
            setCurrBarData(years);
        }
    }

    function getCSVData(csvPath) {
        const csvDatas = []
        d3.csv(csvPath, (data) => {
            csvDatas.push(data);
            bicycles.push(data.Bicycle)
            bicyclesPer1000K.push(data.Bicycle_Per_100K)
            carOccupants.push(data.Car_Occupant)
            carsPer100K.push(data.Car_Per_100K)
            motorcycles.push(data.Motorcycle)
            motorcyclesPer100k.push(data.Motorcycle_Per_100K)
            pedPer100k.push(data.Ped_Per_100K)
            pedestrains.push(data.Pedestrian)
            populations.push(data.Population)
            totals.push(data.Total)
            totalsPer100k.push(data.Total_Per_100K)
            trucks.push(data.Trucks)
            trucksPer100k.push(data.Trucks_Per_100K)
            years.push(data.Year);

            setYColumnValues(yColumn);

        }).then((property) => { 
            setCsvData(csvDatas);
            setColumns(() => (property.columns.filter((column) => (column !== "Year"))));
        }).catch((err) => {
            console.log("getCSVData err: ", err);
        })
    }

    useEffect(() => {
        if (csvData.length === 0) {
            getCSVData("./TransportationFatalities_ByYear_postoncanvas.csv");
        }
        setYColumnValues(yColumn);

        const svgE1 = d3.select(svgRef.current);
        svgE1.selectAll("*").remove();

        const svg = svgE1
            // .attr("class", "svgE1")
            .append("g")
            .attr("class", "svgE1-g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleLinear()
            .domain([1972, 2023])
            .range([0, width - 100]);

        const xAxis = d3.axisBottom(xScale);

        const yScale = d3.scaleLinear()
            .domain(yRange)
            .range([height, 0]);

        const yAxis = d3.axisLeft(yScale);

        const bars = svg.append('g')
            .attr('class', 'bars')
            .attr("transform", `translate(100, ${height})`)


        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(100, ${height})`)
            .call(xAxis)
        
        svg.append("g")
            .attr("class", "yAxis")
            .attr("transform", `translate(${100}, 0)`)
            .call(yAxis)

        let barXPosition = 118;
        let barWidth = (width * 1.31 / currBarData.length);

        currBarData.slice(0, currBarData.length / 2).map((data) => {
            const barGTag = bars
                .append('g')
                .attr('class', 'data-gtag')
                .attr('transform', `translate(${barXPosition}, 0)`);

            const scaledY = data / height;

            barGTag
                .append('rect')
                .attr('class', 'data-rect')
                .attr('transform', `translate(0, ${-scaledY})`) 
                .attr('width', barWidth)
                // .attr('height', yScale(parseFloat(data)) * returnYColumnScaleValue(yColumn))
                .attr('height', parseFloat(data) * returnYColumnScaleValue(yColumn))
                .attr('transform', 'rotate(-180)')
                .attr('fill',  '#4571c9');

                barXPosition += barWidth + 8;
        })
    }, [yColumn])

    useEffect(() => {
        if (columns.length === 0) {
            setIscolumnsUndefined(true);
        } else {
            setIscolumnsUndefined(false);
        }
    }, [columns])
    
    return (
        <div className="main-div">
            {/* fallback is not working... */}
            <Suspense fallback={<h1>Loading...</h1>}>  
                <Header 
                    iscolumnsUndefined={iscolumnsUndefined}
                    columns={columns} 
                    yColumnHandler={yColumnHandler}
                />
            </Suspense>
            {yColumn === "" && <h1>Click the above buttons to see the charts</h1>}
            
            <svg 
                className="svgE1"
                ref={svgRef} 
                width={svgWidth} 
                height={svgHeight} 
            />
        </div>
    )
}

export default D3Chart;