import { INavState, navStates } from "../templates";
import { EStates } from "../enums";
import { BasicComponent } from "../abstracts";

export default class AuthNav extends BasicComponent<undefined, INavState> {
  constructor() {
    super();
    this.state = { ...navStates[EStates.logIn] } as INavState;
    this.render();
  }

  render () {
    if ( this.element ) this.remove();

    const element = document.createElement('div');

    const { navButton } = this.state!.elements;

    element.innerHTML = (
      `<div class="auth-form__submit">
        ${ navButton.description ? `<span>${navButton.description}</span>` : '' }
        <button class="button button_medium button_primary">${navButton.text}</button>
      </div>`
    );

    this.element = element.firstElementChild as HTMLElement;
  }
}
