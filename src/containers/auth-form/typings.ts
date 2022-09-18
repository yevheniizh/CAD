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

export interface IComponent<P = IProps, S = IState> extends IBasicComponent {
  state?: S;
  props?: P;
  subElements: ISubElements;
  template(): string;
  initEventListeners(): void;
  removeEventListeners(): void;
  getSubElements( element: Element ): ISubElements;
  remove(): void;
  destroy(): void;
}

export interface IPage extends Omit<IComponent, 'state' | 'props'> {
  components: IComponents;
  renderComponent( component: string ): void;
  renderComponents(): void;
  initComponents(): void;
}
