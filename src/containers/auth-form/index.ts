import { IInputData, IOwnState, states } from './templates';
import { EEmitterEvents, ESubElements, EStates } from './enums';
import EventEmitter from '../../utils/eventEmitter.util';
import { Component } from './abstracts';

export default class AuthForm extends Component<undefined, IOwnState> { 
  emitter: EventEmitter | null = new EventEmitter(); // to collect subscribers

  onForgotPasswordClick = ( event ) => {
    const title = event.target.closest(`[data-element=${ESubElements.navButton}]`);
    if ( !title ) return;
    
    this.state = { ...this.state, ...states[EStates.forgotPassword] };
    super.render();

    this.emitter?.emit(EEmitterEvents.render);
  }
  
  constructor() {
    super();
    this.state = { ...states[EStates.logIn] };
    super.render();
  }

  emailInputTemplate( { label, placeholder }: IInputData ) {
    return (
      `<label class="label" for="email">
        <span class="label-text">${label}</span>
        <input
          class="input"
          id="email"
          type="email"
          placeholder="${placeholder}"
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

  passwordInputTemplate( { label, placeholder }: IInputData ) {
    return (
      `<label class="label" for="password">
        <span class="label-text">${label}</span>
        <input
          class="input"
          id="password"
          type="password"
          placeholder="${placeholder}"
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
    const {
      title, googleButton, divider, description,
      emailInput, passwordInput, repeatPasswordInput, submitButton, navButton,
    } = states[this.state!.name].elements;

    return (
      `<form class="auth-form">
        <header class="auth-form__header" data-element=${ESubElements.title}>
          <h2 class="auth-form__title">${title}</h2>
        </header>

        ${googleButton
          ? (`<button
                class="auth-form__google-button button button_large button_secondary fullwidth"
                data-element=${ESubElements.googleButton}
              >
                <img src="../../assets/icons/google.svg" alt="Google icon">
                <span>${title} with Google</span>
              </button>`)
          : ''}

        ${description
          ? (`<p class="auth-form__description" data-element=${ESubElements.description}>${description.text}</p>`)
          : ''}

        ${divider
          ? (`<div class="auth-form__divider" data-element=${ESubElements.divider}>
                <i>or</i>
              </div>`)
          : ''}

        ${emailInput
          ? (`<div class="auth-form__input" data-element=${ESubElements.emailInput}>
                ${this.emailInputTemplate( emailInput )}
              </div>`)
          : ''}

        ${passwordInput
          ? (`<div class="auth-form__input" data-element=${ESubElements.passwordInput}>
                ${this.passwordInputTemplate( passwordInput )}
              </div>`)
          : ''}

        ${repeatPasswordInput
          ? (`<div class="auth-form__input" data-element=${ESubElements.repeatPasswordInput}>
              ${this.passwordInputTemplate( repeatPasswordInput )}
            </div>`)
          : ''}

        <div class="auth-form__submit" data-element=${ESubElements.submitButton}>
          ${navButton ? `<a class="link" data-element=${ESubElements.navButton}>${navButton.text}</a>` : '' }
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
