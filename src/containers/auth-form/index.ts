import { authPageStates } from './templates';
import { EAuthFormEmitterEvents, EAuthSubElements, EAuthPageStates } from './enums';
import EventEmitter from '../../utils/eventEmitter.util';
import { Component } from './abstracts';

export default class AuthForm extends Component {
  emitter: EventEmitter | null = new EventEmitter(); // to collect subscribers

  onForgotPasswordClick = ( event ) => {
    const title = event.target.closest(`[data-element=${EAuthSubElements.title}]`);
    if ( !title ) return;
    
    this.state = { ...this.state, name: EAuthPageStates.forgotPassword };
    super.render();

    this.emitter?.emit(EAuthFormEmitterEvents.render);
  }
  
  constructor() {
    super();
    this.state = { name: EAuthPageStates.logIn };
    super.render();
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

  template() {
    return this.getTemplate();
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

  getTemplate() {
    const { title, elements } = authPageStates[this.state?.name];

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
          ${this.state?.name === EAuthPageStates.logIn ? `<a class="link" href="/">${submitButton.description}</a>` : '' }
          <button type="submit" class="button button_large button_primary">${submitButton.text}</button>
        </div>
      </form>`
    );
  }

  initEventListeners() {
    this.element?.addEventListener('click', this.onForgotPasswordClick ); 
  }

  removeEventListeners() {
    this.element?.removeEventListener('click', this.onForgotPasswordClick );
  }

  destroy() {
    super.destroy();
    this.emitter = null;
  }
}
