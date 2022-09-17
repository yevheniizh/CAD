import AuthForm from "../../containers/auth-form/index.js";

export const EAuthPageComponents = {
  form: 'form',
  logo: 'logo',
  nav: 'nav',
}

export default class AuthPage {
  element;
  subElements = {};
  components = {};

  initComponents () {
    const form = new AuthForm();
    this.components[EAuthPageComponents.form] = form;
    form.emitter.subscribe('render', () => this.renderComponent(EAuthPageComponents.form));
  }

  get template () {
    return (
      `<div class="auth-page grid">
        <div class="auth-page__logo col-2/3" data-element="${EAuthPageComponents.logo}">
          <img class="logo__img" src="../../assets/icons/logo.svg" alt="App logo">
        </div>
        <div class="auth-page__form col-5/8" data-element="${EAuthPageComponents.form}">
          <!-- Auth-form component -->
        </div>
        <div class="auth-page__nav col-9/11" data-element="${EAuthPageComponents.nav}">
          <!-- Auth nav component -->
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

    return this.element;
  }

  renderComponent(component) {
    const root = this.subElements[component];
    const { element } = this.components[component];

    root.append(element);
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      this.renderComponent(component);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  removeEventListeners() {}

  destroy () {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.removeEventListeners();
  }
}
