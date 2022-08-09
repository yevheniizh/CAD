/* MOUSE EVENTS */

export function orbitOrPanCursor( event ) {
  switch (event.button) {
    case 0:
      return this.element.style.cursor = 'alias'
    case 2:
    default:
      return this.element.style.cursor = 'move'
  }
}

export function zoom( event ) {
  this.element.style.cursor = event.wheelDelta > 0 ? 'zoom-in' : 'zoom-out';
  window.clearTimeout( window.isScrolling );
  window.isScrolling = setTimeout( () => this.element.style.cursor = 'auto', 50 );
}

export function defaultCursor() {
  this.element.style.cursor = 'auto';
}

/* SCENE EVENTS */

export function setBackground(event) {
  this.canvas.SceneConfigurator.setBackground(event.target.value);
}

export function toggleAnimation() {
  this.canvas.AnimationConfigurator.toggleAnimation();
}
