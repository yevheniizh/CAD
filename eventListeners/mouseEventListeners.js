import { canvas } from "../constants/DOM.js";

export class MouseEventListeners {
  static initialize() {
    // Zoom - zoom-in / zoom-out cursor
    canvas.addEventListener('wheel', this.zoom); // Chrome, Firefox
    canvas.addEventListener('gesturestart', this.zoom); // Safari
    canvas.addEventListener('gesturechange', this.zoom);
    canvas.addEventListener('gestureend', this.zoom);

    // Orbit - alias cursor, Pan - move cursor
    canvas.addEventListener('mousedown', this.orbitOrPanCursor);
    canvas.addEventListener('mouseup', this.defaultCursor);
  }

  static orbitOrPanCursor = ( e ) => {
    switch (e.button) {
      case 0:
        return canvas.style.cursor = 'alias'
      case 2:
      default:
        return canvas.style.cursor = 'move'
    }
  }

  static zoom = (e) => {
    canvas.style.cursor = e.wheelDelta > 0 ? 'zoom-in' : 'zoom-out';
    window.clearTimeout( window.isScrolling );
    window.isScrolling = setTimeout( () => this.defaultCursor(), 50 );
  }
  
  static defaultCursor = () => canvas.style.cursor = 'auto';
}
