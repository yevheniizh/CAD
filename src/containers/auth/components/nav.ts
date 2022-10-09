import { IOwnState } from "../templates";
import { ESubElements } from "../enums";
import { Component } from "../../../models/components";
import { EEmitterEvents } from "../../../utils/eventEmitter.util";
import { EAuthPageComponents } from "../../../pages/auth/enums";

export default class AuthNav extends Component<undefined, IOwnState> {
  page: any;
  
  onSubElementClick = ( event ) => {
    const { element } = event.target.closest( '[data-element]' )?.dataset;

    if ( element /* && element.clickable */) {
      this.page.emitter?.emit(EEmitterEvents.setState, element );
    }
  }

  constructor( page ) {
    super();
    this.page = page;
  }

  template() {
    const { navButton, description } = this.page.state.view.components.nav;

    return (
      `<div class="auth-form__submit">
        ${ description?.text ? `<span>${description.text}</span>` : '' }
        <button class="button button_medium button_primary" data-element=${EAuthPageComponents.nav}_${ESubElements.navButton}>${navButton.text}</button>
      </div>`
    );
  }

  initEventListeners() {
    this.element?.addEventListener('click', this.onSubElementClick );
  }

  removeEventListeners() {
    this.element?.removeEventListener('click', this.onSubElementClick );
  }
}
