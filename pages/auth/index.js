import AuthForm, { EContainerName } from "../../containers/auth-form/index.js";

export default class AuthPage {
  element;
  subElements = {};
  components = {};

  initComponents () {
    const authForm = new AuthForm();

    this.components[EContainerName.authForm] = authForm;
  }

  get template () {
    return (
      `<div class="auth">
        <div class="content__top-panel">
          <img src="../../assets/icons/WebCAD-logo.svg" alt="App logo">
        </div>
        <div data-element="${EContainerName.authForm}">
          <!-- auth-form component -->
        </div>
      </div>`
    );
  }

  render () {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.initComponents();

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

  initEventListeners() {}

  removeEventListeners() {}

  destroy () {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.removeEventListeners();
  }
}
