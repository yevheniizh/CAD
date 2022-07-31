```js
// Page structure convension

export default Page {
  element; // HTML-page entity
  subElements = {}; // Component wrappers from the 'element', HTML-nodes. The main benefit of this is the reaching sub-elemens out on the js-level (not DOM)
  components = {}; // Initiated HTML-components and easy access to them

  initComponents () {
    // ...
  }

  /** HTML-page boilerplate */
  get template () {
    // ...
  }

  /** To initiate page creating. Returns 'element' */
  render () {
    // ...
  }

  /** Get subElements (HTML-nodes) and put initiated components into them, technically into the page */
  renderComponents () {
    // ...
  }

  /** Get all component wrappers from the 'element' and put them to 'subElements' */
  getSubElements ($element) {
    // ...
  }

  initEventListeners () {
    // ...
  }

  removeEventListeners() {
    // ...
  }

  /** To initiate page destroying. Remove event listeners and page */
  destroy () {
    // ...
  }
}

```