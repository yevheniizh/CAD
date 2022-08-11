export const EContainerName = {
  authForm: 'authForm',
}

export default class AuthForm {
  element = undefined;

  constructor() {
    this.render();
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = (
      `<div class="auth-form">
        <header class="auth-form__header">
          <h2 class="auth-form__title pos-centered--ver">Log in</h2>
        </header>

        <button class="button button_large button_secondary fullwidth">
          <img src="../../assets/icons/google.svg" alt="Google icon">
          <span>Log in with Google</span>
        </button>

        <form class="form">
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
      </div>`
    );

    this.element = element.firstElementChild

    return this.element;
  }
}
