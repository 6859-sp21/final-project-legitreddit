// https://observablehq.com/@yowhan/final-project-share-of-death-by-obesity@451
import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./450051d7f1174df8@252.js";
import define3 from "./a2e58f97fd5e8d7c@620.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["shareofdeaths.csv",new URL("./files/cc88100f1022761bf529bc3c338e963a1171cbf0d2f3be189a6067569f274f6e7b799b7366e541958f0466fb0e6a8c4e47cbf9fafa99932bbe8ffd3bba9bb606",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Final Project: Share of Death by Obesity`
)});
  main.variable(observer("viewof toggle")).define("viewof toggle", ["Button"], function(Button){return(
Button("Reset Selected Country")
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("viewof target_year")).define("viewof target_year", ["Scrubber","years"], function(Scrubber,years){return(
Scrubber(years, {loop: false, 
                                      delay: 1000, 
                                      autoplay: false, 
                                      alternate: false, })
)});
  main.variable(observer("target_year")).define("target_year", ["Generators", "viewof target_year"], (G, _) => G.input(_));
  main.variable(observer("viewof selector")).define("viewof selector", ["radio"], function(radio){return(
radio({
  // title: 'Continent Selector',
  // description: 'Choose a continent to zoom',
  options: [
    { label: 'World', value: '00,20;140' },
    { label: 'Africa', value: '10,08;300' },
    { label: 'Americas', value: '-100,20;170' },
    { label: 'Asia', value: '100,40;270' },
    { label: 'Europe', value: '30,40;400' },
    { label: 'Oceania', value: '150,-30;300' },
  ],
  value: '00,20;140',
})
)});
  main.variable(observer("selector")).define("selector", ["Generators", "viewof selector"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","projection","global_map","data","selectedCountry","mutable selectedCountry","target_year"], function(d3,projection,global_map,data,selectedCountry,$0,target_year)
{
  const path = d3.geoPath()
    .projection(projection);
  
  const svg = d3.create('svg')
    .attr('viewBox', '0 0 980 550')
    // .attr('viewBox', [0, 0, width + margins, height + margins])
    .style('width', '100%')
    // .style('height', '500px');
  
  const color = d3.scaleQuantile()
    .domain([0, 27])
    .range(d3.schemeYlOrBr[9]);
    // .range(d3.schemeBlues[9]);
  
  const countries = svg.append('g')
    .selectAll('path')
    .data(global_map.features)
    .enter().append('path')
      .attr('class', 'country')
      .attr('id', d => d.properties.name)
      .attr('d', path)
      .attr('fill', d => data.find(e => e.Country === d.properties.name) ?
            color(parseFloat(data.find(e => e.Country === d.properties.name).Obesity)) : color(0))
      // .attr('stroke', 'white')
      // .attr('stroke-width', 1)
      .attr('stroke', d => d.properties.name === selectedCountry ? 'red' : 'grey')
      .attr('stroke-width', d => d.properties.name === selectedCountry ? 2 : 1)
      .on("mousedown", function(d) {
      $0.value = d.properties.name;
    })
    .append('title')
      .text(d => data.find(e => e.Country === d.properties.name) ?
            `${d.properties.name}: ${data.find(e => e.Country == d.properties.name).Obesity}%`: `${d.properties.name}: n/a`)
     ;
  
  const x = d3.scaleLinear()
  .domain([0, 50])
  .rangeRound([0, 550]);
  
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(50, 500)');
  
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
    .text(`Share of Deaths(%)`)
      .style('font-size', '17px');
  
    const ticks = legend.call(d3.axisBottom(x)
    .tickSize(10)
    .tickFormat(d3.format(".05"))
    .tickValues([0,3,6,9,12,15,18,21,24,27]))
    .select(".domain")
    .remove();
  
  const lastTick = legend.append("g")
    .attr("class", "tick")
    .attr("opacity", 1)
    .attr("transform", "translate(550, 0)");
  
  
  const descrip = legend.append("text")
    .attr("class", "legend-descrip")
    .attr("x", 490)
    .attr("y", -6)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr("font-family","Arial")
    .style("font-size","17px")
    // .attr("font-weight", "bold")
    .text(d => selectedCountry === 'Global' ? 'Click a country to track!' :
                                              data.find(e => e.Country === selectedCountry) ? 
                                               selectedCountry +' ' + data.find(e => e.Country ==                                                              selectedCountry).Obesity +'%': selectedCountry + ': N/A')
  
  
    const title = svg.append("text")
    .attr('class', 'title')
    .attr('x', 490)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr("font-weight", "bold")
    .attr("font-family","Arial")
    .style("font-size","20px")
    .text(`Share of Deaths(%) due to Obesity in Year ${target_year}`);
  
  
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
  main.variable(observer()).define(["selectedCountry"], function(selectedCountry){return(
selectedCountry
)});
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
  main.variable(observer("t")).define("t", ["d3"], function(d3){return(
d3.transition().duration(500)
)});
  main.variable(observer("projection")).define("projection", ["d3","selector"], function(d3,selector){return(
d3.geoEquirectangular().center([+selector.substring(0,selector.indexOf(',')), +selector.substring(selector.indexOf(',')+1, selector.indexOf(';'))]).scale(+selector.substring(selector.indexOf(';')+1,100))
)});
  main.variable(observer("global_map")).define("global_map", ["d3"], async function(d3){return(
await d3.json('https://raw.githubusercontent.com/jchen2186/water-around-the-world/master/geojson/countries.geojson')
)});
  main.variable(observer("fulldata")).define("fulldata", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("shareofdeaths.csv").csv()
)});
  main.variable(observer("data")).define("data", ["fulldata","target_year"], function(fulldata,target_year){return(
fulldata.filter(d => +d.Year === target_year)
)});
  main.variable(observer("years")).define("years", function(){return(
Array.from(new Array(28), (x,i) => i+1990)
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  main.import("radio", child1);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
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
require('d3@5')
)});
  return main;
}
