export const EContainerName = {
  form: 'form',
  logo: 'logo',
}

export const EAuthPageStates = {
  logIn: 'logIn',
  signUp: 'signUp',
  forgotPassword: 'forgotPassword',
  changePassword: 'changePassword',
  passwordChanged: 'passwordChanged',
  linkSent: 'linkSent',
}

export default class AuthForm {
  element = undefined;
  states = {
    [EAuthPageStates.logIn]: {
      title: 'Log in',
      elements: {
        googleButton: true,
        divider: true,
        description: false,
        emailInput: true,
        passwordInput: true,
        repeatPasswordInput: false,
        button: {
          text: 'Log in',
        },
      },
    },
    [EAuthPageStates.signUp]: {
      title: 'Sign up',
      elements: {
        googleButton: true,
        divider: true,
        description: false,
        emailInput: true,
        passwordInput: true,
        repeatPasswordInput: true,
        button: {
          text: 'Sign up',
        },
      },
    },
    [EAuthPageStates.forgotPassword]: {
      title: 'Forgot password',
      elements: {
        googleButton: false,
        divider: false,
        description: {
          text: 'Don’t worry! Just enter your email and we’ll send you a recovery link.'
        },
        emailInput: true,
        passwordInput: false,
        repeatPasswordInput: false,
        button: {
          text: 'Send a recovery link',
        },
      },
    },
    [EAuthPageStates.changePassword]: {
      title: 'Change password',
      elements: {
        googleButton: false,
        divider: false,
        description: false,
        emailInput: false,
        passwordInput: true,
        repeatPasswordInput: true,
        button: {
          text: 'Save new password',
        },
      },
    },
    [EAuthPageStates.passwordChanged]: {
      title: 'Password is changed!',
      elements: {
        googleButton: false,
        divider: false,
        description: {
          text: 'Please try loging in using your new password.'
        },
        emailInput: false,
        passwordInput: false,
        repeatPasswordInput: false,
        button: {
          text: 'Back to Log in',
        },
      },
    },
    [EAuthPageStates.linkSent]: {
      title: 'Link is sent!',
      elements: {
        googleButton: false,
        divider: false,
        description: {
          text: 'Please check your email and follow the instruction on how to change your password.'
        },
        emailInput: false,
        passwordInput: false,
        repeatPasswordInput: false,
        button: {
          text: 'Go to Log in',
        },
      },
    },
  }

  constructor() {
    this.render();
    // this.initEventListeners();
  }

  getGoogleButton(title) {
    return (
      `<button class="auth-form__google-button button button_large button_secondary fullwidth">
          <img src="../../assets/icons/google.svg" alt="Google icon">
          <span>${title} with Google</span>
        </button>`
    );
  }

  get emailInputTemplate() {
    return (
      `<div class="auth-form__input">
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
      </div>`
    );
  }

  passwordInputTemplate({isRepeat = false} = {}) {
    const action = isRepeat ? 'Repeat' : 'Enter';

    return (
      `<div class="auth-form__input">
        <label class="label" for="password">
          <span class="label-text">${action} password</span>
          <input
            class="input"
            id="password"
            type="password"
            placeholder="${action} your password"
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
      </div>`
    );
  }

  getTemplate(state = EAuthPageStates.linkSent) {
    const { title, elements } = this.states[state];
    const { googleButton, divider, description, emailInput, passwordInput, repeatPasswordInput, button } = elements;

    return (
      `<form class="auth-form">
        <header class="auth-form__header">
          <h2 class="auth-form__title absolute-centered--ver">${title}</h2>
        </header>

        ${googleButton ? this.getGoogleButton(title) : ''}
        ${description ? `<p class="auth-form__description">${description.text}</p>` : ''}
        ${divider
          ? (`<div class="auth-form__divider">
                <i>or</i>
              </div>`)
          : ''
        }
        ${emailInput ? this.emailInputTemplate : ''}
        ${passwordInput ? this.passwordInputTemplate() : ''}
        ${repeatPasswordInput ? this.passwordInputTemplate({ isRepeat: true }) : ''}

        <div class="auth-form__submit">
          ${state === EAuthPageStates.logIn ? '<a class="link" href="/">Forgot the password?</a>' : '' }
          <button type="submit" class="button button_large button_primary">${button.text}</button>
        </div>
      </form>`
    );
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    return this.element;
  }

  // getSubElements ($element) {
  //   const elements = $element.querySelectorAll('[data-element]');

  //   return [...elements].reduce((accum, subElement) => {
  //     accum[subElement.dataset.element] = subElement;

  //     return accum;
  //   }, {});
  // }

  // on

  // initEventListeners() {
  //   const { thumbLeft } = this.subElements;

  //   thumbLeft.addEventListener('pointerdown', event => {
  //     this.element.remove();
  //     this.render(false);
  //   });
  // }

  // removeEventListeners() {
  //   thumbLeft.addEventListener('pointerdown', event => {
  //     this.element.remove();
  //     this.render(false);
  //   });
  // }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeEventListeners();
  }
}
