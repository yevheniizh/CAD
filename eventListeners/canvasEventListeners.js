import Canvas from "../containers/canvas/Canvas.js";
import {
  animationButton,
  colorPickerButton,
  googleButton,
} from "../constants/DOM.js";
import { formGoogleSignIn } from "../auth/firebase-auth.js";

export class CanvasEventListeners {
  static initialize() {
    animationButton.addEventListener("click", this.toggleAnimation);
    colorPickerButton.addEventListener("change", this.setBackground);
    googleButton.addEventListener("click", this.googleSignIn);
  }

  /* SCENE EVENTS */
  static setBackground = (e) => Canvas.SceneConfigurator.setBackground(e.target.value);

  static toggleAnimation = () => Canvas.AnimationConfigurator.toggleAnimation();
  static googleSignIn = () => formGoogleSignIn();
}
