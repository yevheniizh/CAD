import AuthForm from "../../containers/auth-form/index";
import { EEmitterEvents } from "../../containers/auth-form/enums";
import { Page } from "../../containers/auth-form/abstracts";

export const EAuthPageComponents = {
  form: 'form',
  logo: 'logo',
  nav: 'nav',
}

export default class AuthPage extends Page {
  initComponents () {
    const form = new AuthForm();
    this.components[EAuthPageComponents.form] = form;
    // listen to internal render call, and paste rerendered component to the page
    form.emitter!.subscribe(EEmitterEvents.render, () => this.renderComponent(EAuthPageComponents.form) );
  }

  template () {
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
}
