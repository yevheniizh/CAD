import { authPageStates, EAuthPageStates } from './templates.js';
import EventEmitter from '../../utils/eventEmitter.util.js';

export const EAuthSubElements = {
  googleButton: 'googleButton',
  title: 'title',
  description: 'description',
  emailInput: 'emailInput',
  passwordInput: 'passwordInput',
  repeatPasswordInput: 'repeatPasswordInput',
  submitButton: 'submitButton',
}

export default class AuthForm {
  element;
  subElements = {};
  emitter = new EventEmitter(); // to collect subscribers

  onForgotPasswordClick = ( event ) => {
    const title = event.target.closest(`[data-element=${EAuthSubElements.title}]`);
    if (!title) return;
    
    this.render(EAuthPageStates.forgotPassword);
    this.emitter.emit('render'); // fire 
  }

  constructor({state = EAuthPageStates.logIn} = {}) {
    this.render(state);
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
          autocomplete
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
          autocomplete
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
    if (this.element) this.remove();
    
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate(state);
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onForgotPasswordClick );
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.onForgotPasswordClick );
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();

    this.element = null;
    this.subElements = {};
    this.emitter = null;
  }
}
