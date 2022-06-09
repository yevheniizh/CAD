import { FiguresGenerator } from "../canvas/figuresGenerator.js";
import Canvas from "../canvas/index.js";

// Wireframe button
const wireframeButton = document.querySelector(".button.view-wireframe");
wireframeButton.addEventListener("click", () => Canvas.setWireframe());

// Colorpicker button
const colorpicker = document.querySelector(".colorpicker .color-input");
colorpicker.value = window.config.background;
colorpicker.addEventListener("change", (e) => Canvas.setBackground(e.target.value));

// Add figure button
const addFigureButton = document.querySelector(".figure");
addFigureButton.addEventListener("click", () => FiguresGenerator.addBox( {
    geometry: {
      width: 20,
      height: 30,
      depth: 15,
      widthSegments: 40,
      heightSegments: 60,
      depthSegments: 30,
    },
    material: {
      color: 0xfcc742,
      emissive: 0x111111,
      metalness: 1,
      roughness: 0.55,
      wireframe: window.config.wireframe,
    },
  } )
);

// addFigureButton.addEventListener("click", () => FiguresGenerator.addTorus( {
//     geometry: {
//       radius: 10,
//       tube: 3,
//       radialSegments: 50,
//       tubularSegments: 100,
//     },
//     material: {
//       color: 0xfcc742,
//       emissive: 0x111111,
//       metalness: 1,
//       roughness: 0.55,
//       wireframe: window.config.wireframe,
//     },
//   } )
// );
