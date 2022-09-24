import { Page } from "../../models/components";
import { navStates, states } from "../../containers/auth/templates";
import { AuthForm, AuthNav } from "../../containers/auth";
import { EEmitterEvents } from "../../utils/eventEmitter.util";
import { EAuthPageComponents } from "./typings";

export default class AuthPage extends Page {
  initComponents () {
    const form = new AuthForm();
    const nav = new AuthNav();
    this.components[EAuthPageComponents.form] = form;
    this.components[EAuthPageComponents.nav] = nav;

    // Change component state & render
    form.emitter!.subscribe(EEmitterEvents.render, ([state]: any[]) => {
      this.components[EAuthPageComponents.form].state = states[state];
      this.renderComponent(EAuthPageComponents.form );
    } );

    // Change component state & render
    form.emitter!.subscribe(EEmitterEvents.render, ([state]: any[]) => {
      this.components[EAuthPageComponents.nav].state = navStates[state];
      this.renderComponent(EAuthPageComponents.nav );
    } );
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
        </div>
      </div>`
    );
  }
}
