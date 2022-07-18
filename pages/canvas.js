// import Canvas from '../containers/canvas/Canvas.js';
import '../eventListeners/index.js';

export default class CanvasPage {
  element;
  subElements = {};
  components = {};

  async initComponents () {}

  get template () {
    return `<div class="canvas">
      <canvas class="canvas"></canvas>

      <div class="notification"></div>
      
      <!-- Tools panel -->
      <nav class="nav-area">
        <div class="nav-view-category">
          <button class="button accordion-button nav-area-button">View</button>
          <ul class="accordion-body nav-area-body">
            <li class="nav-item">
              <button class='button'>Show axes</button>
            </li>
            <li>
              <button class='button view-clear'>Clear scene</button>
            </li>
            <li>
              <button class='button accordion-button'>Background</button>
              <div class='colorpicker accordion-body'>
                <input class='color-input' type='color' />
              </div>
            </li>
            <li>
              <button class='button view-wireframe'>Wireframe</button>
            </li>
            <li>
              <button class='button'>Ground</button>
            </li>
            <li>
              <button class='button view-animation'>Animate</button>
            </li>
            <li>
              <button class='button view-figure'>Add figure</button>
            </li>
            <li>
              <button class='button view-undo'>Undo</button>
            </li>
            <li>
              <button class='button view-redo'>Redo</button>
            </li>
            <li>
              <button class='button google'>Google Sign In</button>
            </li>
          </ul>
        </div>
      </nav>

      <section class="history"></section>
    </div>`;
  }

  initEventListeners() {}

  removeEventListeners() {}

  async render () {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    await this.initComponents();

    this.renderComponents();

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();

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

  destroy () {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.removeEventListeners();
  }
}
