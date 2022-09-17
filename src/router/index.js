export default class Router {
  page;
  notFoundPagePath;

  constructor() {
    this.routes = []; // array of { path, page }
    this.initEventListeners();
  }

  static instance() {
    if (!this._instance) {
      this._instance = new Router();
    }
    return this._instance;
  }

  initEventListeners() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');

      if (href && href.startsWith('/')) {
        event.preventDefault();
        this.onNavigate(href);
      }
    });
  }

  onNavigate(path) {
    history.pushState(null, null, path);
    this.route();
  }

  async route() {
    let match;

    for (let route of this.routes) {
      match = ( window.location.pathname ) === ( route.path );

      if (match) {
        this.page = route.page;
        break;
      }
    }

    if (!match) {
      this.page = this.routes.find(
        ({ path }) => this.notFoundPagePath === path
      )?.page;
    }

    if ( this.page ) {
      const element = await this.page.render();
      const contentNode = document.querySelector('#page-content');

      contentNode.innerHTML = '';
      contentNode.append(element);
    }
  }

  addRoute(path, page) {
    this.routes.push( { path, page } );
    return this;
  }

  setNotFoundPagePath (path) {
    this.notFoundPagePath = path;
    return this;
  }

  listen() {
    window.addEventListener('popstate', () => this.route() );
    this.route();
  }
}
