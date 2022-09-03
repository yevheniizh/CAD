export const EContainerName = {
  form: 'form',
  logo: 'logo',
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
          <h2 class="auth-form__title absolute-centered--ver">Log in</h2>
        </header>

        <button class="auth-form__google-button
          button button_large button_secondary
          fullwidth"
        >
          <img src="../../assets/icons/google.svg" alt="Google icon">
          <span>Log in with Google</span>
        </button>

        <div class="auth-form__divider">
          <i>or</i>
        </div>

        <form class="form">
          <div class="auth-form__input">
            <label class="label" for="email">
              <span class="label-text">Email</span>
              <input
                class="input"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              ></input>
              <div class="auth-form__input-info input-info">
                <img src="../../assets/icons/error.svg" alt="Error icon">
                <span class="hint">User is not found</span>
              </div>
            </label>
          </div>

          <div class="auth-form__input">
            <label class="label" for="password">
              <span class="label-text">Password</span>
              <input
                class="input"
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                minlength="6"
                minlength="20"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
              ></input>
              <div class="auth-form__input-info input-info">
                <img src="../../assets/icons/error.svg" alt="Error icon">
                <span class="hint">Wrong password</span>
              </div>
            </label>
          </div>

          <div class="auth-form__submit">
            <a class="link" href="/">Forgot the password?</a>
            <button type="submit" class="button button_large button_primary">Log in</button>
          </div>
        </form>
      </div>`
    );

    this.element = element.firstElementChild

    return this.element;
  }
}
