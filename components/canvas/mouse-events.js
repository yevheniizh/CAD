import { canvas } from "../../constants/DOM.js";

/**
 * Zoom - zoom-in / zoom-out cursor
 */
let isScrolling;

function zoom(e) {
  canvas.style.cursor = e.wheelDelta > 0 ? 'zoom-in' : 'zoom-out';
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout( () => canvas.style.cursor = 'auto', 50 );
}

// Scroll events - Chrome, Firefox 
canvas.addEventListener( 'wheel', zoom );
// Scroll events - Safari
canvas.addEventListener('gesturestart', zoom);
canvas.addEventListener('gesturechange', zoom);
canvas.addEventListener('gestureend', zoom);

/**
 * Orbit - alias cursor
 * Pan - move cursor
 */
canvas.addEventListener( 'mousedown', ( e ) => {
  switch (e.button) {
    case 0:
      return canvas.style.cursor = 'alias'
    case 2:
      return canvas.style.cursor = 'move'
    default:
      return canvas.style.cursor = 'move'
  }
} );
canvas.addEventListener( 'mouseup', () => canvas.style.cursor = 'auto' );
