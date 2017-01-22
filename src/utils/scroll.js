import { easeOutQuad } from "./math";
import store from "./../store";

export class AnimateHorizontalScroll {
  constructor(selector, target, duration) {
    this.source = document.querySelector(selector);
    this.depart = this.source.scrollLeft;
    this.destination = target - this.depart;
    this.target = target;
    this.duration = duration;
    this.startTime = Date.now();
    this.easing = easeOutQuad;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    const now = Date.now();
    const current = now - this.startTime;
    const position = this.easing(current, this.depart, this.destination, this.duration);

    this.source.scrollLeft = position;
    current < this.duration ? requestAnimationFrame(this.animate.bind(this)) : this.end()
  }
  end() {
    this.source.scrollLeft = this.target;
  }
}
