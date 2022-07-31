import Router from "./router/index.js";

import CanvasPage from "./pages/canvas/index.js";
import AuthPage from "./pages/auth.js";
import ErrorPage from "./pages/error404.js";

import { toggleAccordion } from "./eventListeners/index.js";

class MainPage {
  constructor () {
    this.router = Router.instance();
    this.render();

    this.addEventListeners();
  }

  get template () {
    return (
      `<main>
        <!-- Page content -->
        <section class="content" id="content">
        
        </section>
      </main>`
    );
  }

  render () {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    document.body.append(this.element);
  }

  initializeRouter() {
    this.router
      .addRoute('/', new CanvasPage())
      .addRoute('/auth', new AuthPage())
      .addRoute('/404', new ErrorPage())
      .setNotFoundPagePath('/404')
      .listen();
  }

  addEventListeners() {
    document.addEventListener("click", toggleAccordion);
  }
}

const mainPage = new MainPage();

mainPage.initializeRouter();
