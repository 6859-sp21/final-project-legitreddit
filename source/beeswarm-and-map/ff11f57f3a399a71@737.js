// https://observablehq.com/@yowhan/final-project-beeswarm-and-map@737
import define1 from "./450051d7f1174df8@252.js";
import define2 from "./6bc3c08c4545a7e2@3601.js";
import define3 from "./a2e58f97fd5e8d7c@620.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["fulldata@4.json",new URL("./files/4286c973d342c76ef54e83a0ac46100f18c92ad44490505f1fe7353c6454b060ffdbb87eced07999f47329458abf93535a5199e1cb0580ff73cc6d426a3bb193",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Final Project: Beeswarm and Map`
)});
  main.variable(observer("viewof target_year")).define("viewof target_year", ["Scrubber","years"], function(Scrubber,years){return(
Scrubber(years, {loop: false, 
                                      delay: 1200, 
                                      autoplay: false, 
                                      alternate: false, })
)});
  main.variable(observer("target_year")).define("target_year", ["Generators", "viewof target_year"], (G, _) => G.input(_));
  main.variable(observer("viewof toggle")).define("viewof toggle", ["Button"], function(Button){return(
Button("Reset Selected Country")
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","projection","global_map","map_data","selectedCountry","mutable selectedCountry","margins","target_year"], function(d3,projection,global_map,map_data,selectedCountry,$0,margins,target_year)
{
  const path = d3.geoPath()
    .projection(projection);
  
  const svg = d3.create('svg')
    .attr('viewBox', '0 0 980 595')
    // .attr('viewBox', [0, 0, width + margins, height + margins]) //2550 1550
    .style('width', '100%')
    // .style('height', '500px');
  
  const color = d3.scaleQuantile()
    .domain([0, 45])
    // .range(d3.schemeBlues[9])
    .range(d3.schemeYlOrBr[9])
    // .range(d3.interpolateYlOrBr());
  
  const countries = svg.append('g')
    .selectAll('path')
    .data(global_map.features)
    .enter().append('path')
      .attr('class', 'country')
      .attr('id', d => d.properties.name)
      .attr('d', path)
      .attr('fill', d => map_data.find(e => e.Country === d.properties.name) ?
            color(parseFloat(map_data.find(e => e.Country === d.properties.name).AverageObesity)) : color(0))
      // .attr('stroke', 'white')
      // .attr('stroke-width', 1)
      .attr('stroke', d => d.properties.name === selectedCountry ? 'red' : 'grey')
      .attr('stroke-width', d => d.properties.name === selectedCountry ? 2 : 1)
      .on("mousedown", function(d) {
      $0.value = d.properties.name;
    })
    .append('title')
      .text(d => map_data.find(e => e.Country === d.properties.name) ?
            `${d.properties.name}: ${map_data.find(e => e.Country == d.properties.name).AverageObesity}`: `${d.properties.name}: n/a`)
     ;
  
  const x = d3.scaleLinear()
  .domain([0, 50])
  .rangeRound([0, 550]);
  // .rangeRound([0, 1550]);
  
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(50, 500)');
    // .attr('transform', 'translate(50, 1500)');
  
  const colorBars = legend.selectAll('rect')
    .data(color.range().map(d => color.invertExtent(d)))
    .enter().append('rect')
      .attr('class', 'legend-color-box')
      .attr('height', 9)
      .attr("x", d => x(d[0]))
      .attr("y", 0)
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("fill", d => color(d[0]));
  
  const legendTitle = legend.append("text")
    .attr("class", "legend-title")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    // .attr("font-weight", "bold")
    .text(`Obesity(%)`)
      .style('font-size', '17px');
  
    const ticks = legend.call(d3.axisBottom(x)
    .tickSize(10)
    .tickFormat(d3.format(".05"))
    .tickValues([0,5,10,15,20,25,30,35,40,45]))
    .select(".domain")
    .remove();
  
  const lastTick = legend.append("g")
    .attr("class", "tick")
    .attr("opacity", 1)
    .attr("transform", "translate(550, 0)");
  
  const descrip = legend.append("text")
    .attr("class", "legend-descrip")
    .attr("x", 600)
    .attr("y", -6)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    // .attr("font-weight", "bold")
    .text(d => selectedCountry === 'Global' ? 'Click a country to track!' :
                                              map_data.find(e => e.Country === selectedCountry) ? 
                                               selectedCountry +' ' + map_data.find(e => e.Country ==                                                              selectedCountry).AverageObesity +'%': 'N/A')
      .style('font-size', '17px');
  
  const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', 490)
    .attr('y', margins/2)
    .attr('text-anchor', 'middle')
    // .attr("font-weight", "bold")
    .attr("font-family","Arial")
    .style("font-size","20px")
    .text(`Obesity(%) Among Adults by Country in Year ${target_year}`);
  
  // lastTick.append("line")
  //   .attr("stroke", "#000")
  //   .attr("y2", 10);
  
//   lastTick.append("text")
//     .attr("fill", "#000")
//     .attr("y", 13)
//     .attr("dy", "0.71em")
//     .text("100");
  
  const zoom = d3.zoom()
    .scaleExtent([0.7, 11])
    .on('zoom', function() {
      const { transform } = d3.event;
      svg.selectAll('path')
        .attr('transform', transform);
  });

  svg.call(zoom);

  
  return svg.node();
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","margins","height","data","xScale","yScale","locality","selected_regions","selectedCountry","target_year"], function(d3,width,margins,height,data,xScale,yScale,locality,selected_regions,selectedCountry,target_year)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width + margins, height + margins])
      .style('background','white');
  
  var legend = svg.append("rect")
    .attr("x", margins*3.2)
    .attr("y", margins*3.3)
    .attr("width", 200)
    .attr("height", 115)
    .attr("fill-opacity", 0)
    .attr("stroke", 'black')
    .attr("stroke-width", 3)
    .attr("opacity", 0.4)
  
  var legend = svg.append("circle")
    .attr("r", 20)
    .attr("cx", margins*4)
    .attr("cy", margins*4)
    .attr('fill', 'blue')
    .attr('opacity', 0.4)
  
    var legend = svg.append("circle")
    .attr("r", 20)
    .attr("cx", margins*4)
    .attr("cy", margins*5)
    .attr('fill', 'red')
    .attr('opacity', 0.4)
  
  svg.append("text")
    .attr('class', 'circlelegend')
    .attr('x', margins*4.6)
    .attr('y', margins*4+9)
    .style("font-size","30px")
    .text('Male')
  
    svg.append("text")
    .attr('class', 'circlelegend')
    .attr('x', margins*4.6)
    .attr('y', margins*5+9)
    .style("font-size", "30px")
    .text('Female')
 
  
  
  const xAccessor = d => d.Region
  let yAccessor = d => d.Obesity
  
  // beeswarm simulation. Control x and y force / radius here (let the user control it) s.t. the user can choose to see the continent specific vs global pattern
  const simulation = d3.forceSimulation(data)
    .force("x", d3.forceX(d => xScale(xAccessor(d))).strength(0.8))
    .force("y", d3.forceY(d => yScale(yAccessor(d))).strength(0.7))
    .force("collide", d3.forceCollide().radius(locality.value + 1))
    .velocityDecay(0.5)
    .alphaDecay(0.1)
  
  simulation.on("tick", ticked)

  
  //set up transition
  // const t = d3.transition()
  //         .duration(100)
  //         .ease(d3.easeBounce);
  
  function mousehover(d) { 
   var box = svg.append("rect")
       .attr('x', xScale(xAccessor(d)) + 40)
        .attr('y', yScale(yAccessor(d)) - 23)
    
   svg.append("text")
    .attr('class','annot')
    .attr('x', xScale(xAccessor(d)) + 40)
    .attr('y', yScale(yAccessor(d)) - 23)
    .transition().duration(200)
    .text(d.Country+','+ d.Obesity + '%')
    .style('font-size','40px')
    .style('opacity','1.0')
    .style('border-color', 'black')
    
    
   d3.select(this).style("fill", "#007DBC");
    }
  
  function mousehoverout() {  
    d3.selectAll('.annot').remove()
    d3.select(this).style("fill", d => d.Sex === 'Male' ? 
             "Blue" : "Red");
  }
  
  // add nodes to the page
  const circles = svg.append('g').selectAll("circle")
    .data(data)
    .data(data.filter(i => selected_regions.includes(i.Region)))
    .join('circle')
    .attr('r', d => Math.sqrt(Math.sqrt(d.Population))/6 + 3)
    // .attr('r', d => Math.sqrt(d.Population) ** 0.33 )
    // .attr("fill", "#4F9C91")
    .attr("fill", d => d.Sex === 'Male' ? 
             "Blue" : "Red")
    // .attr("fill", d => d.Country === selectedCountry ? 
    //          "black" : d.Sex === 'Male' ? 
    //          "Blue" : "Red")
    .attr("border", "yellow")
    .attr("cx", d => d.x)
    .attr("cy", d => yScale(d.Obesity))
    // .attr("opacity", 0.5)
    .attr("opacity", d => selectedCountry === 'Global' ? 0.4 : 
                          d.Country === selectedCountry ? 
                          0.9 : 0.1)
    .on("mouseover", mousehover)
    .on("mouseout", mousehoverout) 
  
  
  function ticked(){
    circles
    .attr("cx", d => d.x)
    .attr("cy", d => yScale(d.Obesity))
    // .attr("cy", d => d.y)
    // .attr("cx", d => d.x)
  }
   
  const xAxis = d3.axisBottom()
    .scale(xScale)
  
  const yAxis = d3.axisLeft()
    .scale(yScale)
  
  svg.append("g")
    .attr("transform", "translate(0, " + (height) + ")")
    .style("font-size","40px")
    .call(xAxis)
  
  svg.append("g")
    .attr("transform", "translate(110, 0)")
    .style("font-size","25px")
    .call(yAxis)
  
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", margins)
    .attr("x", -100)
    .text("Obesity (%)")
    .style("font-size","35px")
  
    const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', margins)
    .attr('text-anchor', 'middle')
    .attr("font-weight", "bold")
    .attr("font-family","Arial")
    .style("font-size","50px")
    .text('Obesity(%) Among Adults by Continent in Year ' + target_year);

    
  return svg.node()
}
);
  main.variable(observer("locality")).define("locality", ["slider"], function(slider){return(
slider({
  title: 'Beeswarm Spatial Density',
  // desc: 'Dense <--------------------------> Sparse',
  min: 5,
  max: 30,
  step: 1,
  value: 15,
  theme: 'default-round',
  background: {
    type: 'double',
    colors: ['#7295FF', 'white']
  }
})
)});
  main.variable(observer("viewof selected_regions")).define("viewof selected_regions", ["Checkbox","regions"], function(Checkbox,regions){return(
Checkbox(regions, {value: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
                                             // label: "Continent"
                                            })
)});
  main.variable(observer("selected_regions")).define("selected_regions", ["Generators", "viewof selected_regions"], (G, _) => G.input(_));
  main.define("initial selectedCountry", function(){return(
"Global"
)});
  main.variable(observer("mutable selectedCountry")).define("mutable selectedCountry", ["Mutable", "initial selectedCountry"], (M, _) => new M(_));
  main.variable(observer("selectedCountry")).define("selectedCountry", ["mutable selectedCountry"], _ => _.generator);
  main.variable(observer("script")).define("script", ["toggle","mutable selectedCountry"], function(toggle,$0)
{
  toggle;
  $0.value = 'Global';
}
);
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoEquirectangular().center([0, 20])
)});
  main.variable(observer("global_map")).define("global_map", ["d3"], async function(d3){return(
await d3.json('https://raw.githubusercontent.com/jchen2186/water-around-the-world/master/geojson/countries.geojson')
)});
  main.variable(observer("map_data")).define("map_data", ["data"], function(data){return(
data.filter(row => row['Sex'] === 'Male')
)});
  main.variable(observer("offsets")).define("offsets", ["selected_regions"], function(selected_regions){return(
[0-selected_regions.indexOf("Africa"), 1 - selected_regions.indexOf("Americas"), 2 - selected_regions.indexOf("Asia"), 3 - selected_regions.indexOf("Europe"), 4 - selected_regions.indexOf("Oceania")]
)});
  main.variable(observer("fulldata")).define("fulldata", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("fulldata@4.json").json()
)});
  main.variable(observer("data")).define("data", ["fulldata","target_year"], function(fulldata,target_year){return(
fulldata[target_year]
)});
  main.variable(observer("offset1")).define("offset1", ["data","offsets"], function(data,offsets){return(
data['Region'] = data.map(d => d['Region'] === 'Americas' ? d['x']+= -offsets[1]*450 : d['x'] += 0)
)});
  main.variable(observer("offset2")).define("offset2", ["data","offsets"], function(data,offsets){return(
data['Region'] = data.map(d => d['Region'] === 'Asia' ? d['x']+= -offsets[2]*450 : d['x'] += 0)
)});
  main.variable(observer("offset3")).define("offset3", ["data","offsets"], function(data,offsets){return(
data['Region'] = data.map(d => d['Region'] === 'Europe' ? d['x']+= -offsets[3]*450 : d['x'] += 0)
)});
  main.variable(observer("offset4")).define("offset4", ["data","offsets"], function(data,offsets){return(
data['Region'] = data.map(d => d['Region'] === 'Oceania' ? d['x']+= -offsets[4]*450 : d['x'] += 0)
)});
  main.variable(observer("regions")).define("regions", function(){return(
['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
)});
  main.variable(observer("xCoords")).define("xCoords", ["selected_regions"], function(selected_regions){return(
selected_regions.map((d, i) => 400 + i * 450)
)});
  main.variable(observer("xScale")).define("xScale", ["d3","selected_regions","xCoords"], function(d3,selected_regions,xCoords){return(
d3.scaleOrdinal().domain(selected_regions)
                          .range(xCoords)
                          .unknown(-1000)
)});
  main.variable(observer("yScale")).define("yScale", ["d3","height"], function(d3,height){return(
d3
      .scaleLinear()
      // .domain(d3.extent(data.map((d) => +d["Obesity"])))
      .domain([0,70])
      .range([height - 50, 50])
)});
  main.variable(observer("years")).define("years", function(){return(
Array.from(new Array(42), (x,i) => i+1975)
)});
  main.variable(observer("height")).define("height", function(){return(
1500
)});
  main.variable(observer("width")).define("width", function(){return(
2500
)});
  main.variable(observer("margins")).define("margins", function(){return(
50
)});
  main.variable(observer()).define(["d3"], function(d3){return(
d3.forceSimulation
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  const child3 = runtime.module(define3);
  main.import("Button", child3);
  main.import("Checkbox", child3);
  main.import("Toggle", child3);
  main.import("Radio", child3);
  main.import("Range", child3);
  main.import("Select", child3);
  main.import("Text", child3);
  main.import("Textarea", child3);
  main.import("Search", child3);
  main.import("Table", child3);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@v5")
)});
  return main;
}
