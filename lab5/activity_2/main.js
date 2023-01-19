var width = 500;
var height = 500;

d3.csv("cereals.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].Calories = Number(csv[i].Calories)
    csv[i].Fat = Number(csv[i].Fat);
    csv[i].Carb = Number(csv[i].Carb);
    csv[i].Fiber = Number(csv[i].Fiber);
    csv[i].Protein = Number(csv[i].Protein);
  }

  console.log("csv: ", csv);

  // Functions used for scaling axes +++++++++++++++
  var fatExtent = d3.extent(csv, function (row) {
      return row.Fat;
  });
  var carbExtent = d3.extent(csv, function (row) {
	  return row.Carb;
  });
  var fiberExtent = d3.extent(csv, function (row) {
    return row.Fiber;
  });
  var proteinExtent = d3.extent(csv, function (row) {
    return row.Protein;
  });

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  // Axis setup
  var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

  var xScale2 = d3.scaleLinear().domain(fiberExtent).range([50, 470]);
  var yScale2 = d3.scaleLinear().domain(proteinExtent).range([470, 30]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var xAxis2 = d3.axisBottom().scale(xScale2);
  var yAxis2 = d3.axisLeft().scale(yScale2);

  //Legend
  //Hint: Append circrcles to each selection to represent the calorie level
  d3.select("#LowCalorie")
  .append('circle')
  .attr("class", "low-calorie-circle")
  .attr('r', '5px')
  .attr("cx", "6")
  .attr("cy", "6")
  .attr('stroke', 'black');
  d3.select("#MedCalorie")
  .append('circle')
  .attr("class", "mid-calorie-circle")
  .attr('r', '5px')
  .attr("cx", "6")
  .attr("cy", "6")
  .attr('stroke', 'black');
  d3.select("#HighCalorie")
  .append('circle')
  .attr("class", "high-calorie-circle")
  .attr('r', '5px')
  .attr("cx", "6")
  .attr("cy", "6")
  .attr('stroke', 'black');



  function brushstart() {
    d3.select("#chart").selectAll("circle").attr("class", "non_brushed");
    d3.select("#brush").call(brush.move, null); //using `.call()` to call the brush function on each elements
  }
  
  function highlightBrushedCircles() {
  
      // Get the extent or bounding box of the brush event, this is a 2x2 array
      var e = d3.event.selection;
      if(e) {
          const selectedChart = d3.event.sourceEvent.path[2].id;
          
          var circles = d3.select(`#${selectedChart}`).selectAll("circle");
          // var circles = d3.select("#chart1").selectAll("circle");
          
          //Revert circles to initial style
          circles.attr("class", "non_brushed");
  
          //Select the instance of brush selection (access coordinates of the selection area)
          var coords = d3.brushSelection(this);
          // console.log("coords:", coords)
  
          // Select all circles, and add the color gradient classes if the data for that circle
          // lies outside of the brush-filter applied for this x and y attributes
          
          // circleY calculation might be problem!!!!!!!!!!!!!!!
          var selected = circles.filter((circle) => {
            let circleX = 0;
            let circleY = 0;
            if (selectedChart === "chart1") {
              circleX = 52 + (circle.Fat * 72);
              circleY = (width - 50) + (circle.Carb * -18.2);
            } else {
              circleX = 50 + (circle.Fiber * 30);
              circleY = (width + 50) + (circle.Protein * -80);
            }

            // console.log("coords: ", coords)
            // console.log("circleX: ", circleX, "circleY: ", circleY)
            if (coords[0][0] <= circleX && circleX <= coords[1][0] && coords[0][1] <= circleY && circleY <= coords[1][1]) {
              // console.log("circle: ", circle)
              return circle;
            }
         })
        //  Hint: Use `cx, `cy` attributes of circles and `coords' variable defined above)
                              .attr("class", (d) => {
                                if (d.Calories <= 100) {
                                  return 'low-calorie-circle'
                                } else if (100 < d.Calories && d.Calories <= 130) {
                                  return 'mid-calorie-circle'
                                } else {
                                  return 'high-calorie-circle'
                                }
                              })
      }
  }

  function displayValues() {
      // If there is no longer an extent or bounding box then the brush has been removed
      if(!d3.event.selection) {
          // Bring back all non brushed circle elements to original color gradient
          d3.selectAll(".non_brushed").attr("class", (d) => {
            if (d.Calories <= 100) {
              return 'low-calorie-circle'
            } else if (100 < d.Calories && d.Calories <= 130) {
              return 'mid-calorie-circle'
            } else {
              return 'high-calorie-circle'
            }
          })
      }
      // In Activity 3: Write the code to display tooltip only if one circle is selected in here.     
  }
  
  var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start", brushstart)
    .on("brush", highlightBrushedCircles)
    .on("end", displayValues);


  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height)
    .call(brush);

  var chart2 = d3
    .select("#chart2")
    .append("svg:svg")
    .attr("id", "svg2")
    .attr("width", width)
    .attr("height", height)
    .call(brush);

  //Labels for Charts
  var title1 = d3
    .select("#svg1")
    .append("text")
    .attr("x", width/2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fat vs Carb");

  var title2 = d3
    .select("#svg2")
    .append("text")
    .attr("x", width/2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fiber vs Protein");

  //Labels for Axes
    var fatLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", width/2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fat");

    var carbLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", -width/2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Carb");

    var fiberLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", width/2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fiber");

    var proteinLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", -width/2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Protein");

  /******************************************
		
		Create Circles for Each Scatterplot

	 ******************************************/


    
  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis2)
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis2)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  const chart1DataGTag = chart1.append("g")
    .attr("class", "dataGTag")
    .attr("transform", "translate(52," + (width - 50) + ")")
  
  chart1DataGTag.selectAll('g')
  .data(csv)
  .enter()
  .append('circle')
  .attr('class', (d) => {
    if (d.Calories <= 100) {
      return 'low-calorie-circle'
    } else if (100 < d.Calories && d.Calories <= 130) {
      return 'mid-calorie-circle'
    } else {
      return 'high-calorie-circle'
    }
  })
  .attr('r', '5px')
  .attr('cx', (d) => {return d.Fat * 72})
  .attr('cy', (d) => {return d.Carb * -18.2})
  .attr('stroke', 'black');

  // chart1.selectAll('g')
  // .data(csv)
  // .enter()
  // .append('circle')
  // .attr('class', (d) => {
  //   if (d.Calories <= 100) {
  //     return 'low-calorie-circle'
  //   } else if (100 < d.Calories && d.Calories <= 130) {
  //     return 'mid-calorie-circle'
  //   } else {
  //     return 'high-calorie-circle'
  //   }
  // })
  // .attr('r', '5px')
  // .attr('cx', (d) => {return 52 + d.Fat * 72})
  // .attr('cy', (d) => {return (width - 50) + d.Carb * -18.2})
  // .attr('stroke', 'black');

  const chart2DataGTag = chart2.append("g")
    .attr("class", "dataGTag")
    .attr("transform", "translate(50," + (width + 50) + ")")
  
  chart2DataGTag.selectAll('g')
  .data(csv)
  .enter()
  .append('circle')
  .attr('class', (d) => {
    if (d.Calories <= 100) {
      return 'low-calorie-circle'
    } else if (100 < d.Calories && d.Calories <= 130) {
      return 'mid-calorie-circle'
    } else {
      return 'high-calorie-circle'
    }
  })
  .attr('r', '5px')
  .attr('cx', (d) => {return d.Fiber * 30})
  .attr('cy', (d) => {return d.Protein * -80})
  .attr('stroke', 'black');



});
