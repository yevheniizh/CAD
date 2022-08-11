export default class AuthPage {
  element;
  subElements = {};
  components = {};

  async initComponents () {}

  get template () {
    return `<div class="auth">
      <div class="content__top-panel">
        <h2 class="page-title">Log in</h2>
      </div>
      <div data-element="authForm">
        <!-- auth-form component -->

        <button class="button button_large button_secondary fullwidth">
          <img src="../../assets/icons/google.svg" alt="Google icon">
          <span>Log in with Google</span>
        </button>

        <form>
          <label for="email">Email</label>
          <input
            class="input"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          ></input>
          <div>
            <img src="../../assets/icons/error.svg" alt="Error icon">
            <span class="hint">User is not found</span>
          </div>
          <label for="password">Password</label>
          <input
            class="input"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            minlength="6"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
          ></input>
          <div>
            <img src="../../assets/icons/error.svg" alt="Error icon">
            <span class="hint">Wrong password</span>
          </div>
          <button type="submit" class="button button_large button_primary">Log in</button>
        </form>
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
