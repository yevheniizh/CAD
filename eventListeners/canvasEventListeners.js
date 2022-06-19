import Canvas from "../containers/canvas/canvas.js";
import {
  animationButton,
  clearButton,
  colorPickerButton,
  figureButton,
  wireframeButton,
} from "../constants/DOM.js";
import { materialsMap, primitivesMap } from "../constants/maps.js";

export class CanvasEventListeners {
  static initialize() {
    clearButton.addEventListener("click", this.removeAllFigures);
    figureButton.addEventListener("click", this.addPrimitive);
    wireframeButton.addEventListener("click", this.setWireframe);
    animationButton.addEventListener("click", this.toggleAnimation);
    colorPickerButton.addEventListener("change", this.setBackground);
  }

  /* SCENE EVENTS */
  static setBackground = (e) => {
    Canvas.SceneConfigurator.setBackground(e.target.value)
    colorPickerButton.value = window.config.background;
  }

  static toggleAnimation = () => Canvas.AnimationConfigurator.toggleAnimation();

  static setWireframe = () => Canvas.SceneConfigurator.setWireframe();

  static removeAllFigures = () => Canvas.GeometryConfigurator.removeAll();

  static addPrimitive = () => Canvas.GeometryConfigurator.addPrimitive( {
    geometry: {
      type: primitivesMap.torus,
      props: {
        radius: 10,
        tube: 3,
        radialSegments: 50,
        tubularSegments: 100,
      }
    },
    material: {
      type: materialsMap.standart,
      props: {
        color: 0xfcc742,
        emissive: 0x111111,
        metalness: 1,
        roughness: 0.55,
        wireframe: window.config.wireframe,
      }
    },
  } )
}
