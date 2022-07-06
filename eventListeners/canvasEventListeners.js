import Canvas from "../containers/canvas/Canvas.js";
import {
  animationButton,
  colorPickerButton,
} from "../constants/DOM.js";

export class CanvasEventListeners {
  static initialize() {
    animationButton.addEventListener("click", this.toggleAnimation);
    colorPickerButton.addEventListener("change", this.setBackground);
  }

  /* SCENE EVENTS */
  static setBackground = (e) => Canvas.SceneConfigurator.setBackground(e.target.value);

  static toggleAnimation = () => Canvas.AnimationConfigurator.toggleAnimation();
}
