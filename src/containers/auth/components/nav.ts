import { INavState, navStates } from "../templates";
import { EStates, ESubElements } from "../enums";
import { Component } from "../../../models/components";

export default class AuthNav extends Component<undefined, INavState> {
  constructor() {
    super();
    this.state = { ...navStates[EStates.logIn] } as INavState;
  }

  template() {
    const { navButton } = this.state!.elements;

    return (
      `<div class="auth-form__submit">
        ${ navButton.description ? `<span>${navButton.description}</span>` : '' }
        <button class="button button_medium button_primary" data-attribute=${ESubElements.navButton}>${navButton.text}</button>
      </div>`
    );
  }
}
