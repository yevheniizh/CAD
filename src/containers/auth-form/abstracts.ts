export interface ISubElements {
  [key: string]: HTMLElement;
}

export interface IComponents {
  [key: string]: IComponent;
}

export interface IState {
  name: string;
}

export interface IProps {}

export interface IBasicComponent {
  element: HTMLElement | null;
  render(): void;
}

export interface IComponent extends IBasicComponent {
  state?: IState;
  props?: IProps;
  subElements: ISubElements;
  template(): string;
  initEventListeners(): void;
  removeEventListeners(): void;
  getSubElements( element: Element ): ISubElements;
  remove(): void;
  destroy(): void;
}

export abstract class Component implements IComponent {
  state?: IState;
  props?: IProps;
  element: HTMLElement | null = null;
  subElements: ISubElements = {};

  constructor( props: IProps = {} ) {
    if( Object.keys( props ).length ) this.props = props;
  }

  abstract template(): string;

  initEventListeners() {}; // not required
  
  removeEventListeners() {}; // not required

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

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();

    this.element = null;
    this.subElements = {};
  }
}

export interface IPage extends Omit<IComponent, 'state' | 'props'> {
  components: IComponents;
  renderComponent( component: string ): void;
  renderComponents(): void;
  initComponents(): void;
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
