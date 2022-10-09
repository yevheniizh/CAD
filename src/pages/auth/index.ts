import { Page } from "../../models/components";
import { IOwnState, viewes } from "../../containers/auth/templates";
import { AuthForm, AuthNav } from "../../containers/auth";
import EventEmitter, { EEmitterEvents } from "../../utils/eventEmitter.util";
import { ESubElements } from "../../containers/auth/enums";
import { EAuthPageComponents, EViews } from "./enums";

export default class AuthPage extends Page<undefined, IOwnState> {
  emitter: EventEmitter | null = new EventEmitter();

  constructor(){
    super();
    this.state = {
      name: 'auth', // TODO: enums
      view: { ...viewes[EViews.logIn] }
    };
  }

  initComponents() {
    const form = new AuthForm(this);
    const nav = new AuthNav(this);
    this.components[EAuthPageComponents.form] = form;
    this.components[EAuthPageComponents.nav] = nav;

    // Change page state & rerender components
    this.emitter!.subscribe(EEmitterEvents.setState, ( element: ESubElements ) => {
      const [component, subComponent] = element.split('_');
      const redirect  = this.state?.view.redirects?.[component][subComponent];

      console.log('OOO', {element, redirect});
      
      if ( redirect ) {
        this.setView( redirect );
      }
    } );
  }

  setView(view: EViews ) {
    this.state = { ...this.state, view: viewes[view] } as IOwnState;
    this.renderComponents();
  }

  template() {
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

  destroy() {
    super.destroy();
    this.emitter = null;
  }
}
