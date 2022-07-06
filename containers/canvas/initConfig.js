import { EGeometriesMap, EMaterialsMap } from "../../constants/threeMaps.js";

export const initConfig = {
  background: "#ffffff",
  scene: {
    fog: {color: "#89b2eb", density: 0.002},
    lights: [{
      uuid: "05BD448F-3C6A-4D10-96AA-89E46417914D",
      color: "#eeeece",
      position: {x: 1000, y: 1000, z: 1000},
    }, {
      uuid: "1E40E10E-E279-4AC7-88B1-A96D14938320",
      color: "#ddddce",
      position: {x: -500, y: -500, z: -500},
    }],
  },
  shapes: [
    { uuid: "5C91267A-4D22-464E-8ADB-E4F176649484", // 'uuid' is rewritable ('id' is read-only)
      geometry: {
        type: EGeometriesMap.torus,
        props: {
          radius: 10,
          tube: 3,
          radialSegments: 50,
          tubularSegments: 100,
        }
      },
      material: {
        type: EMaterialsMap.standart,
        props: {
          color: 0xfcc742,
          emissive: 0x111111,
          metalness: 1,
          roughness: 0.55,
          wireframe: false,
        }
      },
      placement: {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    },
  ],
};