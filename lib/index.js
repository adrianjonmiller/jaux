import core from './core';

export default class {
  constructor ({points, duration, cb, el, prop, start, end}) {
    cb = cb || animation;
    let $el = typeof el === 'string' ? document.querySelector(el) : el;
    let startVal = start ? start.match(/(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)/) : null;
    let endVal = end ? end.match(/(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)/, (args) => {
      console.log(arguments);
      return arguments;
    }) : null;
    let diff = startVal && endVal ? endVal - startVal : null;

    this.core = core(points, duration, cb);

    function animation (val) {
      let change = val * diff;
      let newVal = startVal + change;
      $el.style[prop] = newVal;
    }
  };

  play (duration) {
    this.core.play(duration);
  }

  pause () {
    this.core.pause();
  }

  stop () {
    this.core.stop();
  }
}