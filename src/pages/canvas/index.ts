import { defaultCursor, orbitOrPanCursor, setBackground, toggleAnimation, zoom } from "./eventListeners";

import { ECanvasSubElements } from "../../models/canvas-manager/enums";
import { formSignOut } from "../../firebase/auth";

import CanvasManager from "../../models/canvas-manager/index";
import CommandManager from "../../models/command-manager/index";
import { Page } from "../../containers/auth-form/abstracts";

export default class CanvasPage extends Page {
  canvasManager: CanvasManager | null = null;
  commandManager: CommandManager | null = null;

  template () {
    return (
      `<div class="canvas-page page">
        <canvas class="canvas" data-element=${ECanvasSubElements.canvas}></canvas>
        
        <!-- Tools panel -->
        <nav class="nav-area">
          <div class="nav-subarea accordion">
            <button class="button a-button nav-button">View</button>
            <ul class="a-panel nav-panel">
              <li class="nav-item">
                <button class='button'>Show axes</button>
              </li>
              <li>
                <button
                  class='button view-clear'
                  data-element=${ECanvasSubElements.clearButton}
                >Clear scene</button>
              </li>
              <li class='accordion'>
                <button class='button a-button'>Background</button>
                <div class='colorpicker a-panel'>
                  <input class='color-input' type='color' data-element=${ECanvasSubElements.colorPickerButton} />
                </div>
              </li>
              <li>
                <button
                  class='button view-wireframe'
                  data-element=${ECanvasSubElements.wireframeButton}
                >Wireframe</button>
              </li>
              <li>
                <button class='button'>
                  Ground
                </button>
              </li>
              <li>
                <button
                  class='button view-animation'
                  data-element=${ECanvasSubElements.animationButton}
                >Animate</button>
              </li>
              <li>
                <button
                  class='button view-figure'
                  data-element=${ECanvasSubElements.figureButton}
                >Add figure</button>
              </li>
              <li>
                <button
                  class='button view-undo'
                  data-element=${ECanvasSubElements.undoButton}
                >Undo</button>
              </li>
              <li>
                <button
                  class='button view-redo'
                  data-element=${ECanvasSubElements.redoButton}
                >Redo</button>
              </li>
              <li>
                <button
                  class='button google'
                  data-element=${ECanvasSubElements.signOutButton}
                >Google Sign In</button>
              </li>
            </ul>
          </div>
        </nav>

        <section
          class="history"
          data-element=${ECanvasSubElements.historyPanel}
        ></section>
      </div>`
    );
  }

  initComponents () {}

  render () {
    super.render()

    this.canvasManager = new CanvasManager( { context: this } );
    this.commandManager = new CommandManager( this.canvasManager );

    return this.element;
  }

  initEventListeners() {
    /* MOUSE EVENTS */
    console.log('XXX',  this.subElements);
      // Zoom - zoom-in / zoom-out cursor
      this.subElements[ECanvasSubElements.canvas].addEventListener('wheel', zoom.bind(this)); // Chrome, Firefox
      this.subElements[ECanvasSubElements.canvas].addEventListener('gesturestart', zoom.bind(this)); // Safari
      this.subElements[ECanvasSubElements.canvas].addEventListener('gesturechange', zoom.bind(this));
      this.subElements[ECanvasSubElements.canvas].addEventListener('gestureend', zoom.bind(this));

      // Orbit - alias cursor, Pan - move cursor
      this.subElements[ECanvasSubElements.canvas].addEventListener('mousedown', orbitOrPanCursor.bind(this));
      this.subElements[ECanvasSubElements.canvas].addEventListener('mouseup', defaultCursor.bind(this));

    /* SCENE EVENTS */
      this.subElements[ECanvasSubElements.animationButton].addEventListener('click', toggleAnimation.bind(this))
      this.subElements[ECanvasSubElements.colorPickerButton].addEventListener('change', setBackground.bind(this));
      this.subElements[ECanvasSubElements.signOutButton].addEventListener('click', formSignOut);
  }

  removeEventListeners() {
    /* MOUSE EVENTS */
      // Zoom - zoom-in / zoom-out cursor
      this.subElements[ECanvasSubElements.canvas].removeEventListener('wheel', zoom.bind(this)); // Chrome, Firefox
      this.subElements[ECanvasSubElements.canvas].removeEventListener('gesturestart', zoom.bind(this)); // Safari
      this.subElements[ECanvasSubElements.canvas].removeEventListener('gesturechange', zoom.bind(this));
      this.subElements[ECanvasSubElements.canvas].removeEventListener('gestureend', zoom.bind(this));

      // Orbit - alias cursor, Pan - move cursor
      this.subElements[ECanvasSubElements.canvas].removeEventListener('mousedown', orbitOrPanCursor.bind(this));
      this.subElements[ECanvasSubElements.canvas].removeEventListener('mouseup', defaultCursor.bind(this));

    /* SCENE EVENTS */
      this.subElements[ECanvasSubElements.animationButton].addEventListener('click', toggleAnimation.bind(this))
      this.subElements[ECanvasSubElements.colorPickerButton].addEventListener('change', setBackground.bind(this));
      this.subElements[ECanvasSubElements.signOutButton].addEventListener('click', formSignOut);
  }
}
