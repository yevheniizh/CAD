export default class AuthPage {
  element;
  subElements = {};
  components = {};

  async initComponents () {}

  get template () {
    return `<div class="auth">
      <div class="content__top-panel">
        <h2 class="page-title">Auth</h2>
      </div>
      <div data-element="authForm">
        <!-- auth-form component -->
      </div>
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