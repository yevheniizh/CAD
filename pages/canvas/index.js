import { defaultCursor, orbitOrPanCursor, setBackground, toggleAnimation, zoom } from "./eventListeners.js";

import { ECanvasSubElements } from "../../models/canvas-manager/enums.js";
import { formGoogleSignIn } from "../../auth/firebase-auth.js";

import CanvasManager from "../../models/canvas-manager/index.js";
import CommandManager from "../../models/command-manager/index.js";

export default class CanvasPage {
  element;
  subElements = {};
  components = {};

  canvasManager = null;
  commandManager = null;

  async initComponents () {}

  get template () {
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
                  data-element=${ECanvasSubElements.googleButton}
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

  async render () {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    await this.initComponents();

    this.renderComponents();

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();

    this.canvasManager = new CanvasManager({context: this});
    this.commandManager = new CommandManager(this.canvasManager);

    return this.element;
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {
    /* MOUSE EVENTS */
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
      this.subElements[ECanvasSubElements.googleButton].addEventListener('click', formGoogleSignIn);
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
      this.subElements[ECanvasSubElements.googleButton].addEventListener('click', formGoogleSignIn);
  }

  destroy () {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.removeEventListeners();
  }
}
