const canvas = document.querySelector('.canvas');

let isScrolling;

function zoom(e) {
  canvas.style.cursor = e.wheelDelta > 0 ? 'zoom-in' : 'zoom-out';
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout( () => canvas.style.cursor = 'auto', 50 );
}

// Chrome, Firefox scroll event
canvas.addEventListener( 'wheel', zoom );
// Safari scroll events
canvas.addEventListener('gesturestart', zoom);
canvas.addEventListener('gesturechange', zoom);
canvas.addEventListener('gestureend', zoom);

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
