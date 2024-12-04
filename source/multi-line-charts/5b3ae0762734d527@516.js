// https://observablehq.com/@yowhan/final-project-multi-line-charts@516
import define1 from "./a2e58f97fd5e8d7c@620.js";
import define2 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["obesity@1.json",new URL("./files/94bf627f191e1ac5f53edceac2764523cfedeb87b28066378ebf32dac2ae8701d4270d3159e45c818a590cb6898698963f3b5223af31de271509573c65e10391",import.meta.url)],["calories@1.json",new URL("./files/bccc8d71e4e125ab7595dd0d07fae5cecb7b2b0e436edf75fa3eff69617d4ff8fb69dbb63f2955b3558439031a2e946908cc6d6961f01aa9dec1eb6654e74319",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Final Project: Multi Line Charts`
)});
  main.variable(observer("viewof selected_continents")).define("viewof selected_continents", ["Checkbox"], function(Checkbox){return(
Checkbox(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'], {value: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],value: ['Americas'], 
// label: "Continent"
                                                                                           })
)});
  main.variable(observer("selected_continents")).define("selected_continents", ["Generators", "viewof selected_continents"], (G, _) => G.input(_));
  main.variable(observer("legend")).define("legend", ["d3","colorLegend"], function(d3,colorLegend)
{
  const svg = d3.create('svg')
    .attr('width', 62)
    .attr('height', 100)
    .attr("style", "outline: thin solid black;");
  
  const legend = svg.append('g')
    .attr('transform', 'translate(5, 10)')
    .call(colorLegend); // <-- our legend helper is invoked just like an axis generator

  return svg.node();
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","selected_country","data","line","color","hover"], function(d3,width,height,xAxis,yAxis,selected_country,data,line,color,hover)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const path = svg.append("g")
      .attr("fill", "none")
      // .attr("stroke", "steelblue")
      .attr("stroke-width", selected_country === '' ? 1.5 : 5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(data.series)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));
  
    path.attr("opacity", d => selected_country === '' ? 1.0 : d.name === selected_country ? 1.0 : 0.05)
    path.attr("stroke", d => color(d.continent))
  
  const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', -80)
    .attr('text-anchor', 'middle')
    .attr("font-weight", "bold")
    .style("font-size","37px")
    .text('Change in Obesity(%) From 1990 to 2017 by Country');
  
  if(selected_country === '') {
  svg.call(hover, path, title);
  } else {
    title.text('Change in Obesity(%): ' + selected_country)
  }

  return svg.node();
}
);
  main.variable(observer("chart2")).define("chart2", ["d3","width","height","xAxis2","yAxis2","selected_to_data","line2","color"], function(d3,width,height,xAxis2,yAxis2,selected_to_data,line2,color)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");

  svg.append("g")
      .call(xAxis2);

  svg.append("g")
      .call(yAxis2);

  const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(selected_to_data)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line2(d.values));
  
  path.attr("stroke", d => color(d.continent))
  
  // path.attr("opacity", d => d.name === mouse_selected.name ? 1 : 0.05).filter(d => d === mouse_selected.name).raise()
  
    const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', -80)
    .attr('text-anchor', 'middle')
    .attr("font-weight", "bold")
    .style("font-size","37px")
    // .text(mouse_selected === '' ?  'Change in Calories From 1990 to 2017' : 'Change in Calories: ' + mouse_selected.name);
    .text(selected_to_data.length === 0 ?  'Respective Change in Calories' : 'Change in Calories: ' + selected_to_data[0].name);
 
  
  

  // svg.call(hover2, path);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["predata","selected_continents"], function(predata,selected_continents){return(
[{y:"Obesity", series: predata.series.filter(i => selected_continents.includes(i.continent))}][0]
)});
  main.variable(observer("viewof selected_country")).define("viewof selected_country", ["autoSelect","data"], function(autoSelect,data){return(
autoSelect({
  options: data.series.map(d => d.name),
  placeholder: "Track a Country",
})
)});
  main.variable(observer("selected_country")).define("selected_country", ["Generators", "viewof selected_country"], (G, _) => G.input(_));
  main.define("initial mouse_selected", function(){return(
''
)});
  main.variable(observer("mutable mouse_selected")).define("mutable mouse_selected", ["Mutable", "initial mouse_selected"], (M, _) => new M(_));
  main.variable(observer("mouse_selected")).define("mouse_selected", ["mutable mouse_selected"], _ => _.generator);
  main.define("initial selected_to_data", ["data2","selected_country","mouse_selected"], function(data2,selected_country,mouse_selected){return(
data2.series.filter(d => selected_country === '' ? d.name === mouse_selected.name : d.name === selected_country)
)});
  main.variable(observer("mutable selected_to_data")).define("mutable selected_to_data", ["Mutable", "initial selected_to_data"], (M, _) => new M(_));
  main.variable(observer("selected_to_data")).define("selected_to_data", ["mutable selected_to_data"], _ => _.generator);
  main.variable(observer("predata")).define("predata", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("obesity@1.json").json()
)});
  main.variable(observer("data2")).define("data2", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("calories@1.json").json()
)});
  main.variable(observer("years")).define("years", function(){return(
Array.from(new Array(28), (x,i) => i+1990)
)});
  main.variable(observer("hover")).define("hover", ["d3","x","y","years","data","mutable mouse_selected","color"], function(d3,x,y,years,data,$0,color){return(
function hover(svg, path, title) {
  
  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 25)
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved(event) {
    event.preventDefault();
    const pointer = d3.pointer(event, this);
    const xm = x.invert(pointer[0]);
    const ym = y.invert(pointer[1]);
    const i = d3.bisectCenter(years, xm);
    const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
    $0.value = s;
    // path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    path.attr("stroke", d => d === s ? color(d.continent) : 'grey').filter(d => d === s).raise();
    path.attr("stroke-width", d => d === s ? 5 : 1.5)
    path.attr("opacity", d => d === s ? 1 : 0.2)
    dot.attr("transform", `translate(${x(years[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name);
    title.text('Change in Obesity(%): ' + s.name);
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
    path.attr("stroke-width", 1.5)
    path.attr("opacity", 1)
    $0.value = '';
    path.attr("stroke", d => color(d.continent))
    title.text('Change in Obesity(%) From 1990 to 2017 by Country');
  }
}
)});
  main.variable(observer("hover2")).define("hover2", ["d3","x2","y2","years","data2"], function(d3,x2,y2,years,data2){return(
function hover2(svg, path) {
  
  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved(event) {
    event.preventDefault();
    const pointer = d3.pointer(event, this);
    const xm = x2.invert(pointer[0]);
    const ym = y2.invert(pointer[1]);
    const i = d3.bisectCenter(years, xm);
    const s = d3.least(data2.series, d => Math.abs(d.values[i] - ym));
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x2(years[i])},${y2(s.values[i])})`);
    dot.select("text").text(s.name);
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
  }
}
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 30, left: 30}
)});
  main.variable(observer("x")).define("x", ["d3","years","margin","width"], function(d3,years,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(years))
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0 , d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.format("d"))).attr('font-size', '20px')
     .append('text')
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .attr('x', width - margin.right)
      .attr('y', -10)
      .text('Year')
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)).attr('font-size', '20px')
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        // .attr("x", 3)
        .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
        .attr('font-size', '20px')
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y + "(%)"))
)});
  main.variable(observer("line")).define("line", ["d3","x","years","y"], function(d3,x,years,y){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(years[i]))
    .y(d => y(d))
)});
  main.variable(observer("x2")).define("x2", ["d3","years","margin","width"], function(d3,years,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(years))
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y2")).define("y2", ["d3","data2","height","margin"], function(d3,data2,height,margin){return(
d3.scaleLinear()
    .domain([1200, d3.max(data2.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis2")).define("xAxis2", ["height","margin","d3","x2","width"], function(height,margin,d3,x2,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x2).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.format("d"))).attr('font-size', '20px')
     .append('text')
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .attr('x', width - margin.right)
      .attr('y', -10)
      .text('Year')
)});
  main.variable(observer("yAxis2")).define("yAxis2", ["margin","d3","y2","data2"], function(margin,d3,y2,data2){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y2)).attr('font-size', '20px')
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
        .attr('font-size', '20px')
        .attr("text-anchor", "start")
        .attr("font-wecight", "bold")
        .text(data2.y))
)});
  main.variable(observer("line2")).define("line2", ["d3","x2","years","y2"], function(d3,x2,years,y2){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x2(years[i]))
    .y(d => y2(d))
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
  .domain(data.series.map(d => d.Continent))
// .range(['#95B8D1','#2E4057','#083D77','#DA4167','#4FB286'])
.range([d3.schemeTableau10[5],d3.schemeTableau10[3],d3.schemeTableau10[4],d3.schemeTableau10[1],d3.schemeTableau10[2]])
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
    // .attr('font-weight', 'bold')
    .attr('font-size', '10px')
    .text('Continent');

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
    .attr('font-size', '9px')
    .style('user-select', 'none') // <-- disallow selectable text
    .text(d => d.label);
}
)});
  main.variable(observer("select_script")).define("select_script", ["selected_country","mutable mouse_selected","data"], function(selected_country,$0,data)
{
  selected_country;
  $0.value = data.series.filter(d => selected_country === d.name );
}
);
  const child1 = runtime.module(define1);
  main.import("Button", child1);
  main.import("Checkbox", child1);
  main.import("Toggle", child1);
  main.import("Radio", child1);
  main.import("Range", child1);
  main.import("Select", child1);
  main.import("Text", child1);
  main.import("Textarea", child1);
  main.import("Search", child1);
  main.import("Table", child1);
  const child2 = runtime.module(define2);
  main.import("autoSelect", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@^6.1")
)});
  return main;
}
