export interface ISubElements {
  [key: string]: HTMLElement;
}

export interface IComponents {
  [key: string]: IComponent | IBasicComponent;
}

export interface IState {
  name: string;
}

export interface IProps {}

export interface IBasicComponent<P = IProps, S = IState> {
  state?: S;
  props?: P;
  element: HTMLElement | null;
  initEventListeners(): void;
  removeEventListeners(): void;
  render(): void;
  remove(): void;
  destroy(): void;
}

export interface IComponent<P = IProps, S = IState> extends IBasicComponent<P, S> {
  subElements: ISubElements;
  template(): string;
  getSubElements( element: Element ): ISubElements;
}

export interface IPage extends Omit<IComponent, 'state' | 'props'> {
  components: IComponents;
  renderComponent( component: string ): void;
  renderComponents(): void;
  initComponents(): void;
}
