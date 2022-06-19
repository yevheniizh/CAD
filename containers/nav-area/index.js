import Canvas from "../canvas/index.js";

import { primitivesMap, materialsMap } from "../canvas/maps.js";

// Wireframe button
document.querySelector(".button.view-wireframe")
  .addEventListener("click", () => Canvas.SceneConfigurator.setWireframe());

// Colorpicker button
const colorpicker = document.querySelector(".colorpicker .color-input");
colorpicker.value = window.config.background;
colorpicker.addEventListener("change", (e) => Canvas.SceneConfigurator.setBackground(e.target.value));

// Add figure button
// document.querySelector(".view-figure")
//   .addEventListener("click", () => Canvas.GeometryConfigurator.addPrimitive( {
//     geometry: {
//       type: primitivesMap.box,
//       props: {
//         width: 20,
//         height: 30,
//         depth: 15,
//         widthSegments: 40,
//         heightSegments: 60,
//         depthSegments: 30,
//       },
//     },
//     material: {
//       type: materialsMap.standart,
//       props: {
//         color: 0xfcc742,
//         emissive: 0x111111,
//         metalness: 1,
//         roughness: 0.55,
//         wireframe: window.config.wireframe,
//       }
//     },
//   } )
// );

// Add figure button
document.querySelector(".view-figure")
  .addEventListener("click", () => Canvas.GeometryConfigurator.addPrimitive( {
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
);

// Remove all geometry button
document.querySelector(".view-clear")
  .addEventListener("click", () => Canvas.GeometryConfigurator.removeAll());

// Remove all geometry button
document.querySelector(".view-animation")
  .addEventListener("click", () => Canvas.AnimationConfigurator.toggleAnimation());
