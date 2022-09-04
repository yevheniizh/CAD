import { authPageStates, EAuthPageStates } from './templates.js';

export const EContainerName = {
  form: 'form',
  logo: 'logo',
  nav: 'nav',
}

export const EAuthSubElements = {
  googleButton: 'googleButton',
  title: 'title',
  description: 'description',
  emailInput: 'emailInput',
  passwordInput: 'passwordInput',
  repeatPasswordInput: 'repeatPasswordInput',
  submitButton: 'submitButton',
}

class Observer {
  events = [];  // observers

  subscribe (fn) {
    this.events.push(fn);
  }

  unsubscribe(fn) {
    this.events = this.events.filter( (event) => event !== fn );
  }

  fire(args) {
    this.events.forEach(function (event) {
      event.call(null, args);
    });
  }
}

export default class AuthForm {
  element;
  subElements = {};
  observer = new Observer();

  constructor({state = EAuthPageStates.logIn} = {}) {
    this.render(state);
    this.initEventListeners();
  }

  emailInputTemplate() {
    return (
      `<label class="label" for="email">
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
      </label>`
    );
  }

  passwordInputTemplate({isRepeat = false} = {}) {
    const action = isRepeat ? 'Repeat' : 'Enter';

    return (
      `<label class="label" for="password">
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
      </label>`
    );
  }

  getTemplate(state) {
    const { title, elements } = authPageStates[state];
    const { googleButton, divider, description, emailInput, passwordInput, repeatPasswordInput, submitButton } = elements;

    return (
      `<form class="auth-form">
        <header class="auth-form__header" data-element=${EAuthSubElements.title}>
          <h2 class="auth-form__title">${title}</h2>
        </header>
        ${googleButton
          ? (`<button
                class="auth-form__google-button button button_large button_secondary fullwidth"
                data-element=${EAuthSubElements.googleButton}
              >
                <img src="../../assets/icons/google.svg" alt="Google icon">
                <span>${title} with Google</span>
              </button>`)
          : ''}
        ${description
          ? (`<p class="auth-form__description" data-element=${EAuthSubElements.description}>${description.text}</p>`)
          : ''}
        ${divider
          ? (`<div class="auth-form__divider">
                <i>or</i>
              </div>`)
          : ''}
        ${emailInput
          ? (`<div class="auth-form__input" data-element=${EAuthSubElements.emailInput}>
                ${this.emailInputTemplate()}
              </div>`)
          : ''}
        ${passwordInput
          ? (`<div class="auth-form__input" data-element=${EAuthSubElements.passwordInput}>
                ${this.passwordInputTemplate()}
              </div>`)
          : ''}
        ${repeatPasswordInput
          ? (`<div class="auth-form__input" data-element=${EAuthSubElements.repeatPasswordInput}>
              ${this.passwordInputTemplate({ isRepeat: true })}
            </div>`)
          : ''}
        <div class="auth-form__submit" data-element=${EAuthSubElements.submitButton}>
          ${state === EAuthPageStates.logIn ? `<a class="link" href="/">${submitButton.description}</a>` : '' }
          <button type="submit" class="button button_large button_primary">${submitButton.text}</button>
        </div>
      </form>`
    );
  }

  render(state) {
    if (this.element) {
      this.remove();
    }
    
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate(state);
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {
    const { title } = this.subElements;

    title.addEventListener('click', () => {
      this.render(EAuthPageStates.linkSent);
      this.observer.fire(this.render, this.element);
    } );
  }

  remove() {
    this.element.remove();
  }
}
