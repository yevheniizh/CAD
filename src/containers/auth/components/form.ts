import { Component } from '../../../models/components';
import { IInputData, IOwnState } from '../templates';
import { ESubElements } from '../enums';
import { EEmitterEvents } from '../../../utils/eventEmitter.util';
import { EAuthPageComponents } from '../../../pages/auth/enums';

export default class AuthForm extends Component<undefined, IOwnState> {
  onSubElementClick = ( event ) => {
    const { element } = event.target.closest( '[data-element]' )?.dataset;
    
    if ( element /* && element.clickable */) {
      this.page.emitter?.emit(EEmitterEvents.setState, element );
    }
  }

  page: any;

  constructor( page ) {
    super();
    this.page = page;
  }

  emailInputTemplate( { label, placeholder }: IInputData ) {
    return (
      `<label class="label" for="email">
        <span class="label-text">${label}</span>
        <input
          class="input"
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
    } = this.page.state.view.components.form;

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
          ${navButton ? `<a class="link" data-element=${EAuthPageComponents.form}_${ESubElements.navButton}>${navButton.text}</a>` : '' }
          <button type="submit" class="button button_large button_primary">${submitButton.text}</button>
        </div>
      </form>`
    );
  }

  initEventListeners() {
    this.element?.addEventListener('click', this.onSubElementClick );
  }

  removeEventListeners() {
    this.element?.removeEventListener('click', this.onSubElementClick );
  }
}
