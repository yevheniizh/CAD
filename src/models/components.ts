import { IBasicComponent, IComponent, IComponents, IPage, IProps, IState, ISubElements } from "./typings";

export abstract class BasicComponent<P = IProps, S = IState> implements IBasicComponent<P, S> {
  state?: S;
  props?: P;
  element: HTMLElement | null = null;

  constructor( props?: P ) {
    if( props && Object.keys( props ).length ) this.props = props;
  }

  initEventListeners() {}; // not required
  
  removeEventListeners() {}; // not required

  abstract render(): void;

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();

    this.element = null;
  }
}

export abstract class Component<P = IProps, S = IState> extends BasicComponent<P, S> implements IComponent<P, S> {
  element: HTMLElement | null = null;
  subElements: ISubElements = {};

  constructor() {
    super();
  }

  abstract template(): string;

  render() {
    if ( this.element ) this.remove();
    
    const element = document.createElement('div');
    element.innerHTML = this.template();
    
    this.element = element.firstElementChild as HTMLElement;

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();
  }

  getSubElements( element: Element ) {
    const elements = Array.from( element.querySelectorAll('[data-element]') ) as HTMLElement[];

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element!] = subElement;

      return accum;
    }, {} as ISubElements);
  }

  destroy() {
    super.destroy();
    this.subElements = {};
  }
}

export abstract class Page extends Component implements IPage {
  components: IComponents = {};

  render() {
    super.render();

    this.initComponents();
    this.renderComponents();

    return this.element;
  }

  abstract initComponents(): void;

  renderComponent( component: keyof IComponents ) {
    const root = this.subElements[component];

    this.components[component].render();
    const { element } = this.components[component];

    root.append(element!);
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      this.renderComponent(component);
    });
  }

  destroy() {
    super.destroy();
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
