import {IBasicComponent} from  "../containers/auth-form/abstracts";

export default class implements IBasicComponent {
  element;

  async render () {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="error-404">
        <h1 class="page-title">Page not found</h1>
        <p>Sorry, page doesn't exist</p>
      </div>
    `;

    this.element = element.firstElementChild

    return this.element;
  }
}
