// https://observablehq.com/@yowhan/final-project-obese-vs-calories@230
import define1 from "./450051d7f1174df8@252.js";
import define2 from "./a2e58f97fd5e8d7c@620.js";
import define3 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["obesevscalories@1.csv",new URL("./files/1aa1c2ab0beedc7a9bceb319efbf14a5d50b624684b7209bc097d29a89cc21e12db1cfe1e441cfeff9dc1be1da534f3fafd225700a08db907927a753f53deae5",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Final Project: Obese vs Calories`
)});
  main.variable(observer("legend")).define("legend", ["d3","colorLegend"], function(d3,colorLegend)
{
  const svg = d3.create('svg')
    .attr('width', 70)
    .attr('height', 100)
    .attr("style", "outline: thin solid black;");
  
  const legend = svg.append('g')
    .attr('transform', 'translate(5, 12)')
    .call(colorLegend); // <-- our legend helper is invoked just like an axis generator

  return svg.node();
}
);
  main.variable(observer("viewof selected_continents")).define("viewof selected_continents", ["Checkbox"], function(Checkbox){return(
Checkbox(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'], {value: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
// label: "Continent"
})
)});
  main.variable(observer("selected_continents")).define("selected_continents", ["Generators", "viewof selected_continents"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_country")).define("viewof selected_country", ["autoSelect","dataInitial"], function(autoSelect,dataInitial){return(
autoSelect({
  options: dataInitial.map(d => d.Country),
  placeholder: "Track a Country"
})
)});
  main.variable(observer("selected_country")).define("selected_country", ["Generators", "viewof selected_country"], (G, _) => G.input(_));
  main.variable(observer("viewof yearAnimate")).define("viewof yearAnimate", ["Scrubber","d3"], function(Scrubber,d3){return(
Scrubber(
  d3.range(1975, 2014, 1),
  { autoplay: false, delay: 500, loop: false })
)});
  main.variable(observer("yearAnimate")).define("yearAnimate", ["Generators", "viewof yearAnimate"], (G, _) => G.input(_));
  main.variable(observer("chartAnimate")).define("chartAnimate", ["d3","width","height","margin","x","y","years","dataInitial","selected_country","color","size","data"], function(d3,width,height,margin,x,y,years,dataInitial,selected_country,color,size,data)
{
  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height);
  
  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .append('text')
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('x', width - margin.right)
      .attr('y', -10)
      .text('Daily Caloric Supply');

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y))
    .append('text')
      .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text('Obesity (%)');
  
 
  
  // Year Label Here!
  const yearLabel = svg.append('text')
    .attr('class', 'year')
    .attr('x', 40)
    .attr('y', height - margin.bottom - 20)
    .attr('fill', '#ccc')
    .attr('font-family', 'Helvetica Neue, Arial')
    .attr('font-weight', 500)
    .attr('font-size', 40)
    .text(years[0]); // <-- simply use the minimum year, as updates occur elsewhere
  

  
  const countries = svg
    .selectAll('circle.country')
    // Bind to the filtered initial data, we will perform updates elsewhere
    // Provide a 🔑 key function for joining data to SVG elements
    .data(dataInitial, d => d.Country) // <-- Add key function!!
    .join('circle')
      .sort((a, b) => b.Population - a.Population)
      .attr('class', 'country')
      .attr('opacity', d => selected_country === "" ? 0.75 : d.Country === selected_country ? 0.9 : 0.1)
      .attr('fill', d => color(d.Continent))
      .attr('cx', d => x(d.Calories))  
      .attr('cy', d => y(d.Obese))
      .attr('r', d => size(d.Population))
  
  countries
    .append('title')
    .text(d => d.Country)

  countries
    .on('mouseover', function() {
      d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
    })
    .on('mouseout', function() {
      d3.select(this).attr('stroke', null);
    });
  
  const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr("font-weight", "bold")
    .style("font-size","20px")
    .text('Obesity(%) vs Daily Caloric Supply by Country in Year 1975');

  // Update function: given a year value, update the chart.
  function setYear(year) {
    // Update the year label by simply setting it to the new value.
    yearLabel.text(year);
    title.text('Obesity(%) vs Daily Caloric Supply by Country in ' + year)
    
    // Update countries and animate the transition:
    // 1. Change the data to filter to the given year, keyed by country
    // 2. Re-sort elements to ensure smallest remain on top, as pop values may have changed
    // 3. Update position and radius, interpolated across a 1 sec (1000ms) animation
    countries
      .data(data.filter(d => +d.Year === year), d => d.Country) // <-- 🔑
      .sort((a, b) => b.Population - a.Population)
      .transition()         // <-- akin to a D3 selection, but interpolates values
        .duration(500)     // <-- 1000 ms === 1 sec
        .ease(d3.easeCubic) // <-- sets pacing; cubic is the default, try some others!
        .attr('cx', d => x(d.Calories))
        .attr('cy', d => y(d.Obese))
        .attr('r', d => size(d.Population));
    
  }
  
  // Extend SVG node, export setYear as a property thereof
  return Object.assign(svg.node(), { setYear });
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("obesevscalories@1.csv").csv()
)});
  main.variable(observer("setting")).define("setting", ["chartAnimate","yearAnimate"], function(chartAnimate,yearAnimate){return(
chartAnimate.setYear(yearAnimate)
)});
  main.variable(observer("predataInitial")).define("predataInitial", ["data","years"], function(data,years){return(
data.filter(d => d.Year === years[0])
)});
  main.variable(observer("dataInitial")).define("dataInitial", ["predataInitial","selected_continents"], function(predataInitial,selected_continents){return(
predataInitial.filter(i => selected_continents.includes(i.Continent))
)});
  main.variable(observer("years")).define("years", ["d3","data"], function(d3,data){return(
d3.extent(data, d => d.Year)
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("width")).define("width", function(){return(
800
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 10, right: 10, bottom: 20, left: 20}
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
  .domain(data.map(d => d.Continent))
  .range([d3.schemeTableau10[1],d3.schemeTableau10[2],d3.schemeTableau10[3],d3.schemeTableau10[4],d3.schemeTableau10[5]])
)});
  main.variable(observer("size")).define("size", ["d3","data"], function(d3,data){return(
d3.scaleSqrt()
  .domain(d3.extent(data, d => +d.Population))
  .range([4, 35])
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLinear()
  .domain([1000, d3.max(data, d => +d.Calories)])
  .range([margin.left, width - margin.right])
  .nice()
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.Obese)])
  .range([height - margin.bottom, margin.top])
  .nice()
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@v5")
)});
  main.variable(observer("regions")).define("regions", function(){return(
[
  { index: 0, label: 'Africa' },
  { index: 1, label: 'Americas' },
  { index: 2, label: 'Asia' },
  { index: 3, label: 'Europe' },
  { index: 4, label: 'Oceania' },
]
)});
  main.variable(observer("colorLegend")).define("colorLegend", ["regions","color"], function(regions,color){return(
function colorLegend(container) {
  const titlePadding = 14;  // padding between title and entries
  const entrySpacing = 16;  // spacing between legend entries
  const entryRadius = 5;    // radius of legend entry marks
  const labelOffset = 4;    // additional horizontal offset of text labels
  const baselineOffset = 4; // text baseline offset, depends on radius and font size

  const title = container.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', 'black')
    .attr('font-family', 'Helvetica Neue, Arial')
    .attr('font-weight', 'bold')
    .attr('font-size', '12px')
    .text('Region');

  const entries = container.selectAll('g')
    .data(regions)
    .join('g')
      .attr('transform', d => `translate(0, ${titlePadding + d.index * entrySpacing})`);

  const symbols = entries.append('circle')
    .attr('cx', entryRadius) // <-- offset symbol x-position by radius
    .attr('r', entryRadius)
    .attr('fill', d => color(d.label));

  const labels = entries.append('text')
    .attr('x', 2 * entryRadius + labelOffset) // <-- place labels to the left of symbols
    .attr('y', baselineOffset) // <-- adjust label y-position for proper alignment
    .attr('fill', 'black')
    .attr('font-family', 'Helvetica Neue, Arial')
    .attr('font-size', '11px')
    .style('user-select', 'none') // <-- disallow selectable text
    .text(d => d.label);
}
)});
  const child2 = runtime.module(define2);
  main.import("Button", child2);
  main.import("Checkbox", child2);
  main.import("Toggle", child2);
  main.import("Radio", child2);
  main.import("Range", child2);
  main.import("Select", child2);
  main.import("Text", child2);
  main.import("Textarea", child2);
  main.import("Search", child2);
  main.import("Table", child2);
  const child3 = runtime.module(define3);
  main.import("autoSelect", child3);
  return main;
}
