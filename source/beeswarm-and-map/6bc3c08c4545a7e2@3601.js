// https://observablehq.com/@bartok32/diy-inputs@3601
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# DIY inputs`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*Inspired by [jashkenas' inputs.] Coming soon: checkbox, text input, textarea.*
[jashkenas' inputs.]: https://observablehq.com/@jashkenas/inputs`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
Welcome to the toolbo... notebook of easily customizable inputs! It serves as a list of examples, to showcase what's possible to achieve. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`I decided to create a tool – instead of a set of predefined functionalities – that can be used to create fantastic inputs with just a little doze of creativity.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Have fun! 🎢`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Sliders`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`~~~js
import {slider} from '@bartok32/diy-inputs'
~~~`
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'HOW-ARE-YOU-TODAY SLIDER',
  desc: 'TOOLTIP.',
  descStyle: {
    'margin-top': '0px',
    'pointer-events': 'none'
  },
  min: 0,
  max: 100,
  step: 1,
  value: 75,
  theme: 'white-round',
  background: {
    type: 'double',
    colors: ['#7EE5A0', '#FFA5A5']
  },
  oninput: objs => {

    objs.output.textContent = objs.value < 10 ? '😭'
                            : objs.value < 30 ? '☹️'
                            : objs.value < 50 ? '😐'
                            : objs.value < 70 ? '🙂'
                            : objs.value < 90 ? '😄'
                            : objs.value < 99 ? '🥳' : '💯';

    objs.desc.textContent = objs.value + '%';
    
    // calculating tooltip's position (200px - margins) + exceptions for one- and three-number percentages
    objs.desc.style.marginLeft = objs.progress * (200 - 15) + (objs.value < 10 ? 5 : objs.value > 99 ? -5 : 0) + 'px';
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'LIGHTSABER SLIDER',
  desc: 'MAY THE FORCE BE WITH YOU.',
  min: 0,
  max: 100,
  step: 1,
  value: 15,
  theme: 'default-thin',
  background: {
    type: 'double',
    colors: ['#7295FF', '#CCD8FF']
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'ONLY-LEFT-COLOR SLIDER',
  desc: 'SO LEFT-SIDED.',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  theme: 'default-round',
  background: {
    type: 'double',
    colors: ['#7295FF', 'white']
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'ONLY-RIGHT-COLOR SLIDER',
  desc: 'SO OPPOSITE-SIDED.',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  theme: 'white-round',
  background: {
    type: 'double',
    colors: ['white', '#7295FF']
  },
  oninput: objs => {
    objs.output.textContent = '🤔'
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'COLOR-INCREMENTING SLIDER',
  desc: 'SO MAJESTIC.',
  min: 0,
  max: 100,
  step: 1,
  value: 20,
  theme: 'default',
  background: {
    type: 'progress',
    colors: ['#CCD8FF', '#7295FF', 'white']
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'GRADIENT-FADE BACKGROUND SLIDER',
  desc: 'SO MANY COLORS.',
  min: 0,
  max: 100,
  step: 1,
  value: 80,
  theme: 'default-round',
  background: {
    type: 'interpolate',
    colors: ['#FFA5A5', '#7EE5A0']
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'HIGHLIGHTED SLIDER',
  desc: '👨 : - IS IT FINE TO CROSS THE GREEN LINE?',
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: 'default',
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: '#EDEDED',
      inactive: '#B7E5C6',
      active: '#7EE5A0'
    },
    preventUpdate: false
  },
  oninput: objs => {
    if (objs.slider.value >= 60 && objs.slider.value <= 90) {
      objs.desc.textContent = "🧝‍♀️ : - YES, MY SON. THERE IS A LOT OF INTERESTING THINGS THERE!";
    } else {
      objs.desc.textContent = '👨 : - IS IT FINE TO CROSS THE GREEN LINE?';
    }
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'RESTRICTED SLIDER',
  desc: '👨 : - IS IT FINE TO CROSS THE RED LINE?',
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: 'default',
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: '#EDEDED',
      inactive: '#FFA5A5',
      active: '#FF6666'
    },
    preventUpdate: true
  },
  oninput: objs => {
    if (objs.slider.value >= 60 && objs.slider.value <= 90) {
      objs.desc.textContent = "🧝‍♀️ : - NO, MY SON. YOU SHOULD ALWAYS KEEP AWAY FROM IT.";
    } else {
      objs.desc.textContent = '👨 : - IS IT FINE TO CROSS THE RED LINE?';
    }
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'LOTR-RESTRICTED SLIDER',
  desc: '👨 : - SHALL I PASS?',
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: 'default',
  highlight: {
    lower: 60,
    upper: 101,
    colors: {
      normal: '#EDEDED',
      inactive: '#FFA5A5',
      active: '#FF6666'
    },
    preventUpdate: true
  },
  oninput: objs => {
    if (objs.slider.value >= 60 && objs.slider.value <=  101) {
      objs.desc.textContent = "🧙‍♂️ : - YOU SHALL NOT PASS!";
    } else {
      objs.desc.textContent = '👾 : - SHALL I PASS?';
    }
  }
})
)});
  main.variable(observer()).define(["slider","d3"], function(slider,d3){return(
slider({
  title: 'CUSTOM-DESCRIPTION-AND-OUTPUT SLIDER',
  descStyle: {
    'pointer-events': 'none'
  },
  min: 0,
  max: 10,
  step: 1,
  value: 0,
  background: {
    type: 'progress',
    colors: ['#F2F2F2', '#7EE5A0', '#F2F2F2']
  },
  oninput: objs => {
    objs.output.textContent = objs.value == 10
                            ? 'Congrats, you did it! 🎉'
                            : 'Only ' + (10 - objs.value) + ' to go!';

    objs.desc.textContent = objs.value == 0
                          ? "LET'S COUNT TO 10!"
                          : d3.range(objs.value)
                              .map(d => d == 9 ? (d + 1) + '!' : (d + 1) + '...')
                              .reduce((a, b) => a + ' ' + b, '');
  }
})
)});
  main.variable(observer()).define(["slider"], function(slider){return(
slider({
  title: 'TRICKY SLIDER',
  desc: '❌ NEVER TRUST THESE ONES.',
  min: 0,
  max: 100,
  step: 1,
  theme: 'default-thin',
  oninput: objs => {
    objs.div.update(objs.settings.max - objs.value);
  }
})
)});
  main.variable(observer()).define(["slider","d3"], function(slider,d3){return(
slider({
  title: 'EXPANDING RAINBOW SLIDER',
  desc: 'BECAUSE WHY NOT?',
  min: 0,
  max: 100,
  step: 1,
  value: 20,
  background: {
    type: 'progress',
    interpolation: d3.interpolateRainbow,
    color: '#EDEDED'
  },
  oninput: objs => {
    objs.slider.style.width = 75 + 0.75 * +objs.value + 50 * objs.progress + 'px';
    if (objs.progress < 1) {
      objs.output.textContent = '🌈 : - Catch me if you can!';
      objs.desc.textContent = 'BECAUSE WHY NOT?';
    } else {
      objs.output.textContent = "🧝‍♀️ : - You caught the rainbow. Congratulations!";
      objs.desc.textContent = 'THE TRUE RAINBOW–CATCHER.';
    };
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Inline sliders.**`
)});
  main.variable(observer()).define(["md","slider","mutable S0___MANY___CAND13S"], function(md,slider,$0){return(
md`🧝‍♀️: - Have you seen the Inline-Robo-Candy-Slider 9000?
<br>🤖: - <span style = 'font-family: Avenir, Arial; font-size: 15px;'>D1$@BL1NG $T3@LTH M0D3...</span> ${slider({
  titleStyle: {
    'font-size': '11px'
  },
  min: 0,
  max: 15,
  step : 1,
  divStyle: {
    'display': 'inline-block',
    'text-align': 'center',
    'margin-left': '3.5px'
  },
  sliderStyle: {
    'width': '130px',
    'background': '#FFA5D0'
  },
  theme: 'default-thin',
  oninput: objs => {
    $0.value = Array(+objs.value + 1).join('🍬');
  }
})}
<br>🧝‍♀️: - Ah, there you are!`
)});
  main.define("initial S0___MANY___CAND13S", function(){return(
''
)});
  main.variable(observer("mutable S0___MANY___CAND13S")).define("mutable S0___MANY___CAND13S", ["Mutable", "initial S0___MANY___CAND13S"], (M, _) => new M(_));
  main.variable(observer("S0___MANY___CAND13S")).define("S0___MANY___CAND13S", ["mutable S0___MANY___CAND13S"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`**Bonus:** synchronized dance-sliders.`
)});
  main.variable(observer()).define(["slider","d3"], function(slider,d3){return(
slider({
  desc: "'CAUSE PARTY IS NEVER OVER.",
  min: 0,
  max: 100,
  step: 1,
  divAttrs: {
    id: 'slider1'
  },
  divStyle: {
    display: 'inline-block'
  },
  sliderStyle: {
    width: '150px'
  },
  theme: 'default-round',
  oninput: objs => {
    let secondSlider = d3.select('#slider2');
    if (!secondSlider.empty()) {
      secondSlider.node().update(100 - objs.value);
      secondSlider.select('input').node().style.background = d3.interpolateCool(1 - objs.progress);
      objs.slider.style.background = d3.interpolateCool(objs.progress);
      if (objs.value >= 50) {
        objs.output.textContent = '💃';
        secondSlider.select('span').node().textContent = '🕺';
      } else {
        objs.output.textContent = '🕺';
        secondSlider.select('span').node().textContent = '💃';
      }
    } else {
      objs.slider.style.background = d3.interpolateCool(objs.progress);
      objs.output.textContent = '💃';
    };
  }
})
)});
  main.variable(observer()).define(["slider","d3"], function(slider,d3){return(
slider({
  desc: 'CHEERS TO THAT!',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  divAttrs: {
    id: 'slider2'
  },
  divStyle: {
    display: 'inline-block'
  },
  sliderStyle: {
    width: '150px'
  },
  theme: 'default-round',
  oninput: objs => {
    let secondSlider = d3.select('#slider1');
    if (!secondSlider.empty()) {
      secondSlider.node().update(100 - objs.value);
      secondSlider.select('input').node().style.background = d3.interpolateCool(1 - objs.progress);
      objs.slider.style.background = d3.interpolateCool(objs.progress);
      if (objs.value <= 50) {
        objs.output.textContent = '🕺';
        secondSlider.select('span').node().textContent = '💃';
      } else {
        objs.output.textContent = '💃';
        secondSlider.select('span').node().textContent = '🕺';
      }; 
    } else {
      objs.slider.style.background = d3.interpolateCool(objs.progress);
      objs.output.textContent = '🕺';
    };
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## API`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
~~~js
function slider({
~~~
~~~js
  min: 0,
  max: 1,
  step: 0.1,
  value: 0.5, // initial value
  title: 'some title',
  desc: 'some description',
~~~
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, slider, output, desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'slider1',
    cla‎ss: 'cool-slider',
    ... // other attributes
  },
~~~
<hr>
**theme**

~~~js
  theme: 'white-round',
~~~

Choose one from <code>[default, white].</code> You can change the slider's thumb appearance by adding <code>-thin</code> or <code>-round</code> to the theme, e.g. <code>white-round.</code>
<hr>
**background**

~~~js
  background: {
    type: 'progress',
    colors: [yourColors]
  },
~~~
<code>type:</code> one of <code>[normal, double, interpolate, progress]</code>

~~~js
if (type == 'normal') use color: yourColor instead o‎f colors: [yourColors]
~~~

~~~js
if (type == 'progress') use a list o‎f three colors – starting one, final one
and optional right-most solid color (see color-incrementing-slider)
~~~

~~~js
if (type == 'interpolate') use a list o‎f two colors (left and right) or
completely omit colors argument and use some d3 color interpolator
(see gradient–fade background)
~~~
<hr>
**highlight**

~~~js
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: '#EDEDED',
      inactive: '#B7E5C6',
      active: '#7EE5A0'
    },
    preventUpdate: false
  },
~~~
If <code>preventUpdate</code> is set to <code>true</code>, then the slider won't be updated when inside of highlighted area *(see restricted slider)*.
<hr>
~~~js
  initialize: true, // if false, oninput won't be triggered when slider is created
~~~
<hr>
**oninput**

~~~js
  oninput: objs => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, slider, output, desc,</code> and <code>div</code> elements. Additionally, you have an access to current value of the slider <code>(objs.value)</code>, progress <code>[0-1] (objs.progress)</code> and <code>settings (objs.settings)</code>, so you can access the <code>min</code> and <code>max</code> values for example <code>(objs.settings.min, objs.settings.max)</code>.

You can also change the behavior of slider by using <code>div's update</code> method *(which also updates the div's value and output text)*, for example by using <code>objs.div.update(objs.settings.max - objs.slider.value)</code> to create a *tricky slider.*
~~~js
})
~~~ `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Selects`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`~~~js
import {select} from '@bartok32/diy-inputs'
~~~`
)});
  main.variable(observer()).define(["select","d3"], function(select,d3){return(
select({
  title: 'JUMPING SELECT',
  desc: 'AAAAND HOP!',
  options: {
    GREEN: '#A1E8CC',
    APRICOT: '#FAC9B8',
    BLUE: '#BFD4FF'
  },
  onchange: objs => {
    d3.select(objs.select)
      .style('font-size', '0px')
      .interrupt()
      .transition()
        .ease(d3.easePoly)
        .duration(250)
        .style('width', '100px')
        .style('height', '35px')
        .style('margin', '15px')
      .transition()
        .ease(d3.easeBounce)
        .duration(250)
        .style('font-size', '12px')
        .style('width', '100px')
        .style('height', '30px')
        .style('margin', '0px')
        .style('background', objs.value)
      .on('end', () => objs.div.update(objs.select.value));
  }
})
)});
  main.variable(observer()).define(["select","d3"], function(select,d3){return(
select({
  title: 'SHRINKING SELECT',
  desc: 'AAAAND SHRINK!',
  options: {
    APRICOT: '#FAC9B8',
    GREEN: '#A1E8CC',
    BLUE: '#BFD4FF'
  },
  onchange: objs => {
    d3.select(objs.select)
      .style('font-size', '0px')
      .interrupt()
      .transition()
        .ease(d3.easePoly)
        .duration(250)
        .style('width', '10px')
        .style('height', '90px')
      .transition()
        .ease(d3.easeBounce)
        .duration(250)
        .style('font-size', '12px')
        .style('width', '100px')
        .style('height', '30px')
        .style('background', objs.value)
      .on('end', () => objs.div.update(objs.select.value));
  }
})
)});
  main.variable(observer()).define(["select","d3"], function(select,d3){return(
select({
  title: 'MY-FATHER-WAS-A-CIRCLE SELECT',
  desc: 'NO JOKES.',
  options: {
    BLUE: '#BFD4FF',
    GREEN: '#A1E8CC',
    APRICOT: '#FAC9B8'
  },
  onchange: objs => {
    d3.select(objs.select)
      .style('font-size', '0px')
      .interrupt()
      .transition()
        .ease(d3.easePoly)
        .duration(350)
        .style('width', '100px')
        .style('height', '100px')
        .style('border-radius', '50px')
      .transition()
        .ease(d3.easeBounce)
        .duration(250)
        .style('font-size', '12px')
        .style('width', '100px')
        .style('height', '30px')
        .style('border-radius', '5px')
        .style('background', objs.value)
      .on('end', () => objs.div.update(objs.select.value));
  }
})
)});
  main.variable(observer()).define(["select","d3"], function(select,d3){return(
select({
  title: 'SPINNING SELECT',
  desc: "LET'S ROLL!",
  options: {
    I: 'SPIN',
    LIKE: 'TO',
    TOOOOO: 'LIKE',
    SPIN: 'I'
  },
  selectStyle: {
    background: '#FF72AF'
  },
  divStyle: {
    width: '160px',
    'font-size': '1px'
  },
  theme: 'white',
  onchange: objs => {
    d3.select(objs.div)
      .interrupt()
      .transition()
        .duration(250)
        .style('transform', `rotate(300deg)`)
      .transition()
        .ease(d3.easeBounce)
        .duration(750)
        .style('transform', `rotate(0deg)`);
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## API`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
~~~js
function select({
~~~
**options**
~~~js
  options: {
    option1: value1,
    option2: value2,
    ...
  },
~~~
Either dict or list, e.g. <code>['a', 'b', 'c']</code> will become <code>{'a': 'a', 'b': 'b', 'c': 'c'}.</code>
<hr>
~~~js
  selected: option1, // initially selected option
  title: 'some title',
  desc: 'some description',
~~~
<hr>
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, select, additionalElement (caret), desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'slider1',
    cla‎ss: 'cool-slider',
    ... // other attributes
  },
~~~
<hr>
~~~js
  theme: 'white', // one of [default, white],
  initialize: true, // if false, oninput won't be triggered when slider is created
~~~
<hr>
**onchange**
~~~js
  onchange: objs => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, button, desc, additionalElement (caret), div</code> elements. You can also update the select's value by using <code>objs.div.update</code> method.
~~~js
})
~~~ 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Buttons`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`~~~js
import {button} from '@bartok32/diy-inputs'
~~~`
)});
  main.variable(observer()).define(["button"], function(button){return(
button({
  value: 'REGULAR BUTTON',
  desc: "SO REGULAR.",
  buttonStyle: {
    background: '#7EE5A0',
    color: '#1A1A26'
  }
})
)});
  main.variable(observer()).define(["button","d3"], function(button,d3){return(
button({
  value: 'PRESS-VISIBLE BUTTON',
  desc: 'SO CLICKY.',
  buttonStyle: {
    background: '#6B6B99',
    color: 'white'
  },
  onclick: objs => {
    d3.select(objs.button)
      .style('background', '#505072')
      .interrupt()
      .transition()
        .duration(300)
        .style('background', '#6B6B99');
  }
})
)});
  main.variable(observer()).define(["button","mutable count","d3"], function(button,$0,d3){return(
button({
  title: 'COUNTER-IMITATING BUTTON',
  value: 'CLICK ME!',
  desc:'SO MANY CLICKS...',
  buttonStyle: {
    background: '#7295FF',
    color: 'white'
  },
  onclick: objs => {
    
    $0.value += 1;
    
    d3.select(objs.button)
      .style('background', '#6786E5')
      .interrupt()
      .transition()
        .duration(300)
        .style('background', '#7295FF');
    
    if ($0.value > 0 && objs.output == '') {

      objs.output = d3.select(objs.div)
        .insert('a', 'div.desc')
        .attr('class', 'output')
        .style('margin-left', '5px')
        .style('font-size', '11px')
        .style('cursor', 'pointer')
        .style('border', '0.5px solid black')
        .style('border-radius', '5px')
        .style('padding', '5px')
        .on('click', function() {
          this.remove();
          objs.output = '';
          $0.value = 0;
        })
        .html('RESET');
    };

  },
  initialize: false
})
)});
  main.define("initial count", function(){return(
0
)});
  main.variable(observer("mutable count")).define("mutable count", ["Mutable", "initial count"], (M, _) => new M(_));
  main.variable(observer("count")).define("count", ["mutable count"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`**Inline buttons.**`
)});
  main.variable(observer()).define(["html","button","mutable guessTheMovie","d3"], function(html,button,$0,d3){return(
html`
${button({
  title: '🐟',
  value: 'JUST',
  divStyle: {
    display: 'inline-block'
  },
  buttonStyle: {
    background: '#CCE9FF'
  },
  titleStyle: {
    'text-align': 'center'
  },
  onclick: objs => {
    $0.value = 'FIN...';
    d3.select(objs.button)
      .style('background', '#B2DFFF')
      .interrupt()
      .transition()
        .duration(300)
        .style('background', '#CCE9FF');
  },
  initialize: false
})}
${button({
  title: '🐬🐬',
  value: 'KEEP',
  divStyle: {
    display: 'inline-block',
    'margin-left': '5px'
  },
  buttonStyle: {
    background: '#B2DFFF'
  },
  titleStyle: {
    'text-align': 'center'
  },
  onclick: objs => {
    $0.value = 'FINDING...';
    d3.select(objs.button)
      .style('background', '#99D4FF')
      .interrupt()
      .transition()
        .duration(300)
        .style('background', '#B2DFFF');
  },
  initialize: false
})}
${button({
  title: '🐠🐠🐠',
  value: 'SWIMMING',
  divStyle: {
    display: 'inline-block',
    'margin-left': '5px'
  },
  buttonStyle: {
    background: '#99D4FF'
  },
  titleStyle: {
    'text-align': 'center'
  },
  onclick: objs => {
    $0.value = 'FINDING NEMO';
    d3.select(objs.button)
      .style('background', '#7FC9FF')
      .interrupt()
      .transition()
        .duration(300)
        .style('background', '#99D4FF');
  },
  initialize: false
})}
`
)});
  main.define("initial guessTheMovie", function(){return(
''
)});
  main.variable(observer("mutable guessTheMovie")).define("mutable guessTheMovie", ["Mutable", "initial guessTheMovie"], (M, _) => new M(_));
  main.variable(observer("guessTheMovie")).define("guessTheMovie", ["mutable guessTheMovie"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`**Bonus:** single-use button. Click only after a careful consideration!`
)});
  main.variable(observer("viewof singleUseButton")).define("viewof singleUseButton", ["button","d3"], function(button,d3){return(
button({
  value: 'YOCO*!',
  buttonStyle: {
    background: '#F4ED47',
    'font-weight': 600,
    width: '70px',
    height: '70px',
    border: '1px solid black',
    'border-radius': '50%'
  },
  divStyle: {
    width: '125px',
    'text-align': 'center'
  },
  onclick: objs => {
    d3.select(objs.button)
      .transition()
        .duration(400)
        .style('width', '0px')
        .style('height', '0px')
        .style('font-size', '0px')
        .style('opacity', 0)
      .on('end', () => {
        objs.div.update('it was nice to meet yooooou...');
        objs.div.remove();
    })
  },
  initialize: false
})
)});
  main.variable(observer("singleUseButton")).define("singleUseButton", ["Generators", "viewof singleUseButton"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","singleUseButton"], function(md,singleUseButton){return(
md`Button says: **${singleUseButton}**

<small>*You Only Click Once.</small>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## API`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
~~~js
function button({
~~~
~~~js
  value: "button's label",
  title: 'some title',
  desc: 'some description',
~~~
<hr>
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, button, desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'button1',
    cla‎ss: 'cool-button',
    ... // other attributes
  },
~~~
<hr>
~~~js
  theme: 'white', // one of [default, white]
  initialize: true, // if false, oninput won't be triggered when slider is created
~~~
<hr>
**onclick**

~~~js
  onclick: objs => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, button, desc, div</code> elements. You can also update the button's value by using <code>objs.div.update</code> method.

Check the code of the examples above, to see how you can use all of them!
~~~js
})
~~~ 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`If you have any thoughts or suggestions please leave a comment or fork this notebook!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Checkboxes`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*In progress...*`
)});
  main.variable(observer("viewof checkMe")).define("viewof checkMe", ["checkbox"], function(checkbox){return(
checkbox({
  title: 'WOULD YOU MIND CHECKING ME?',
  desc: 'THANK YOU.',
  value: 'I AM CHECKED!!!',
  label: 'CHECK ME',
  oninput: objs => {
    if (objs.value == false) objs.output.textContent = 'CHECK ME';
    else objs.output.textContent = 'GREAT!';
  }
})
)});
  main.variable(observer("checkMe")).define("checkMe", ["Generators", "viewof checkMe"], (G, _) => G.input(_));
  main.variable(observer()).define(["checkMe"], function(checkMe){return(
checkMe
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Appendix`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### Functions`
)});
  main.variable(observer("input")).define("input", ["setGlobalStyles","createElement"], function(setGlobalStyles,createElement){return(
(settings = {}, type) => {
  
  if (typeof settings != 'object') return 'Please provide a value!';

  let theme = settings.theme ? settings.theme : 'default',
      initialize = settings.initialize != undefined ? settings.initialize : true,
      on = type == 'button'
           ? 'onclick'
         : type == 'select'
           ? 'onchange'
         : 'oninput';

  setGlobalStyles(theme);

  let objs = {
    title: createElement('title', settings.title, theme, settings),
    desc: createElement('desc', settings.desc, theme, settings),
    output: type == 'slider'
            ? createElement('output', settings.value, theme, settings)
          : type == 'checkbox'
            ? createElement('output', settings.label, theme, settings)
          : '',
    settings,
    value: settings.value
  };

  objs.additionalElement = settings.additionalElement ? createElement(settings.additionalElement.name, settings.additionalElement.value, theme, settings) : '';

  objs[type] = createElement(type, settings.value, theme, settings),
  objs.div = createElement('div', [objs.title, objs[type], objs.output, objs.additionalElement, objs.desc], theme, settings);

  objs[type][on] = () => {
    if (!settings.preventUpdate) {
      objs.div.update(); 
    };
    if (type == 'slider') objs.progress = (objs.value - settings.min) / (settings.max - settings.min);
    if (settings.utilities) {
      for (let [key, func] of Object.entries(settings.utilities)) {
        func(settings[key], objs);
      };
    };
    if (settings[on]) settings[on](objs);
  };

  objs.div.update = (value = objs[type].value || settings.value) => {
    value = isNaN(value) ? value : +value;

    if (type == 'checkbox' && objs.value != false) value = false;
    else if (type == 'checkbox') value = settings.value;

    objs.value = value;
    if (type != 'select') objs[type].value = value;
    objs.div.value = objs.value;
    if (type != 'checkbox' && objs.output) objs.output.textContent = objs.value;
    objs.div.dispatchEvent(new CustomEvent('input'));
  };

  if (settings.preventUpdate) objs.div.update();
  if (initialize) {
    objs[type][on]();
  } else if (!settings.preventUpdate) {
    objs.div.update();
  };
  
  return objs.div;
  
}
)});
  main.variable(observer("button")).define("button", ["input"], function(input){return(
(settings = {}) => {
  if (typeof settings == 'string') return input({value: settings}, 'button');
  else return input(settings, 'button');
}
)});
  main.variable(observer("checkbox")).define("checkbox", ["input"], function(input){return(
(settings = {}) => {
  if (typeof settings == 'string') return input({value: settings}, 'checkbox');
  else return input(settings, 'checkbox');
}
)});
  main.variable(observer("select")).define("select", ["input"], function(input){return(
(settings = {}) => {
  if (typeof settings.options != 'object' || Object.keys(settings.options).length == 0) return 'Please provide at least one option!';

  if (Array.isArray(settings.options)) {
    settings.options = settings.options.reduce((obj, key) => Object.assign(obj, {[key]: key}), {});
  };

  let options = '';
  for (let [key, value] of Object.entries(settings.options)) {
    options += `<option ${key == settings.selected ? 'selected' : ''} value = '${value}'>${key}</option>`;
  };

  settings.value = options;
  settings.additionalElement = {
    name: 'caret',
    value :`<path d = 'M0,1.5 6,8.5 12,1.5'>`
  };
  return input(settings, 'select');
}
)});
  main.variable(observer("slider")).define("slider", ["setSliderBackground","highlightSlider","input"], function(setSliderBackground,highlightSlider,input){return(
(settings = {}) => {

  settings.min = settings.min == undefined ? settings.max - 1 || 0 : settings.min;
  settings.max = settings.max == undefined ? settings.min + 1 || 1 : settings.max;
  settings.value = settings.value == undefined ? (settings.min + settings.max) / 2 : settings.value;
  settings.step = settings.step || (settings.max > settings.min
                                 ? (settings.max - settings.min) / 10
                                 : (settings.min - settings.max) / 10) || 0.1;

  settings.utilities = {};

  if (settings.background) {
    settings.utilities.background = setSliderBackground;
  };

  if (settings.highlight) {
    settings.utilities.highlight = highlightSlider;
  };

  return input(settings, 'slider');
}
)});
  main.variable(observer("createElement")).define("createElement", ["html"], function(html){return(
(type, text = '', theme = '', settings = '') => {

  if (text == undefined) return '';
  text = type != 'slider' && type != 'checkbox' ? text : '';

  let typesMapping = {
    title: {
      tag: 'div',
      mandatoryAttrs: {class: 'title'}
    },
    button: {
      tag: 'button',
      mandatoryAttrs: {}
    },
    checkbox: {
      tag: 'input',
      mandatoryAttrs: {
        type: 'checkbox',
        value: settings.value
      }
    },
    select: {
      tag: 'select',
      mandatoryAttrs: {}
    },
    slider: {
      tag: 'input',
      mandatoryAttrs: {
        type: 'range',
        min: settings.min,
        max: settings.max,
        step: settings.step,
        value: settings.value
      }
    },
    output: {
      tag: 'span',
      mandatoryAttrs: {class: 'output'}
    },
    desc: {
      tag: 'div',
      mandatoryAttrs: {class: 'desc'}
    },
    div: {
      tag: 'div',
      mandatoryAttrs: {class: `input-${theme}`}
    },
    caret: {
      tag: 'svg',
      mandatoryAttrs: {class : 'caret'}
    }
  };

  let el = html`<${typesMapping[type].tag}>${text}</${typesMapping[type].tag}>`;
  Object.entries(typesMapping[type].mandatoryAttrs).forEach(d => el.setAttribute(d[0], d[1]));

  if (typeof settings[type + 'Attrs'] == 'object') Object.entries(settings[type + 'Attrs']).forEach(d => {
    if (d[0] == 'class') el.classList.add(d[1]);
    else el.setAttribute(d[0], d[1])
  });

  if (typeof settings[type + 'Style'] == 'object') Object.entries(settings[type + 'Style']).forEach(d => el.style[d[0]] = d[1]);

  return el;
}
)});
  main.variable(observer("setGlobalStyles")).define("setGlobalStyles", ["d3","themes"], function(d3,themes){return(
function(style) {

  d3.selectAll('.inputStyles')
    .data([style])
    .enter()
    .append('style')
      .attr('class', 'inputStyles')
      .html(themes);
  
}
)});
  main.variable(observer("highlightSlider")).define("highlightSlider", function(){return(
(settings, objs) => {
  settings.lowerAdj = 100 * (settings.lower - objs.settings.min) / (objs.settings.max - objs.settings.min);
  settings.upperAdj = 100 * (settings.upper - objs.settings.min) / (objs.settings.max - objs.settings.min);
  
  if (settings.preventUpdate) objs.settings.preventUpdate = true;
  
  if (+objs.slider.value == settings.lower || +objs.slider.value == settings.upper) {
    objs.div.update(objs.slider.value);
  };
  
  if (+objs.slider.value < settings.lower || +objs.slider.value > settings.upper) {
    objs.div.update(objs.slider.value);

    objs.slider.style.background = `linear-gradient(90deg,
      ${settings.colors.normal}   ${settings.lowerAdj}%,
      ${settings.colors.inactive} ${settings.lowerAdj}%,
      ${settings.colors.inactive} ${settings.upperAdj}%,
      ${settings.colors.normal} 0%)`;
  } else {
    objs.slider.style.background = `linear-gradient(90deg,
      ${settings.colors.normal} ${settings.lowerAdj}%,
      ${settings.colors.active} ${settings.lowerAdj}%,
      ${settings.colors.active} ${settings.upperAdj}%,
      ${settings.colors.normal} 0%)`;
  }
}
)});
  main.variable(observer("setSliderBackground")).define("setSliderBackground", ["d3"], function(d3){return(
(settings, objs) => {

  let type = settings.type,
      color = settings.color,
      colors = settings.colors,
      progress = objs.progress,
      interpolation = settings.interpolation,
      custom = false;

  if (!interpolation) interpolation = d3.interpolate;
  else custom = true;

  type == 'normal' ? objs.slider.style.background = color : type == 'double' ? objs.slider.style.background = `linear-gradient(90deg, ${colors[0]} ${progress * 100}%, ${colors[1]} 0%)` : type == 'interpolate' ? objs.slider.style.background = (custom ? interpolation(progress) : interpolation(colors[0], colors[1])(progress)) : type == 'progress' ? (custom ? objs.slider.style.background = `linear-gradient(90deg, ${interpolation(progress)} ${progress * 100}%, ${color || interpolation(0)} 0%)` : objs.slider.style.background = `linear-gradient(90deg, ${interpolation(colors[0], colors[1])(progress)} ${progress * 100}%, ${colors[2] || colors[0]} 0%)`) : 0;

}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### CSS`
)});
  main.variable(observer("themes")).define("themes", function(){return(
`

  .input-default button, .input-white button, .input-default select, .input-white select {

    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    opacity: 0.9;
    height: 30px;
    margin-left: 0px;
    padding: 5px 10px 5px 10px;
    background: #EFEFEF;
    border: 0.5px solid white;
    border-radius: 5px;
    color: #262626;
    font-family: Avenir, Arial;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

  }

  .input-white button, .input-white select {

    color: white;

}

  .input-default select, .input-white select {

    padding-right: 29px;

  }

  .input-default .caret, .input-white .caret {

    width: 12px;
    height: 10px;
    margin-left: -24px;
    fill: black;
    pointer-events: none;
    opacity: 0.75;

}

  .input-white .caret {

    fill: white;

}

  .input-default input[type = 'range'], .input-default-thin input[type = 'range'], .input-default-round input[type = 'range'], .input-white input[type = 'range'], .input-white-thin input[type = 'range'], .input-white-round input[type = 'range'] {

    appearance: none;
    -webkit-appearance: none;
    width: 200px;
    height: 5px;
    border-radius: 1px;
    background: #E5E5E5;

  }

  .input-default input[type = 'range']::-webkit-slider-thumb, .input-white input[type = 'range']::-webkit-slider-thumb {

    appearance: none;
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #545454;
    cursor: pointer;
    border: none;
    border-radius: 5px;

  }

  .input-white input[type = 'range']::-webkit-slider-thumb {

    background: #FCFCFC;
    border: 1px solid #545454;

  }

  .input-default-thin input[type = 'range']::-webkit-slider-thumb, .input-white-thin input[type = 'range']::-webkit-slider-thumb {

    appearance: none;
    -webkit-appearance: none;
    width: 7.5px;
    height: 20px;
    background: #545454;
    cursor: pointer;
    border: none;
    border-radius: 2.5px;

  }

  .input-white-thin input[type = 'range']::-webkit-slider-thumb {

    background: #FCFCFC;
    border: 1px solid #545454;

  }

  .input-default-round input[type = 'range']::-webkit-slider-thumb, .input-white-round input[type = 'range']::-webkit-slider-thumb {

    appearance: none;
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #545454;
    cursor: pointer;
    border: none;
    border-radius: 7.5px;

  }

  .input-white-round input[type = 'range']::-webkit-slider-thumb {

    background: #FCFCFC;
    border: 1px solid #545454;

  }

  input[type = 'range']:focus {

    outline: none;

  }

  .output {

    margin-left: 5px;
    color: #262626;
    font-family: Courier;
    font-size: 14px;

  }

  .title {

    margin-bottom: 3.5px;
    margin-left: 2.5px;
    color: black;
    font-family: Avenir, Arial;
    font-size: 14px;
    font-weight: 600;

  }

  .desc {

    margin-top: 6px;
    margin-left: 2.5px;
    color: #4C4C4C;
    font-family: Avenir, Arial;
    font-size: 12px;

  }

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### Imports`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
