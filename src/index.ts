import Router from "./router/index.js";

import CanvasPage from "./pages/canvas/index.js";
import AuthPage from "./pages/auth/index.js";
import ErrorPage from "./pages/error404.js";

class RootPage {
  router!: Router;
  element!: Element;

  onToggleAccordion( event ) {
    const accordionButton = event.target.closest(".a-button");
    accordionButton?.parentNode.classList.toggle("active");
  }

  constructor () {
    this.router = Router.instance();
    this.render();

    this.addEventListeners();
  }

  get template () {
    return (
      `<div class="root-page grid">
        <!-- Some static elements can be added here as well: header, footer, aside, etc. -->
        <main class="page-content col-1/12" id="page-content">
          <!-- Page content -->
        </main>
      </div>`
    );
  }

  render () {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild!;
    document.body.append(this.element);
  }

  initializeRouter() {
    this.router
      // .addRoute('/', new CanvasPage())
      .addRoute('/', new AuthPage())
      .addRoute('/auth', new AuthPage())
      .addRoute('/404', new ErrorPage())
      .setNotFoundPagePath('/404')
      .listen();
  }

  addEventListeners() {
    document.addEventListener("click", this.onToggleAccordion);
  }
}

const rootPage = new RootPage();

rootPage.initializeRouter();
