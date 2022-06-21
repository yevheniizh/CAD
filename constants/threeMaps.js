import * as THREE from "../containers/canvas/threejs/three.module.js";

export const primitivesMap = {
  box: THREE.BoxGeometry,
  cone: THREE.ConeGeometry,
  torus: THREE.TorusGeometry,
  sphere: THREE.SphereGeometry,
}

export const materialsMap = {
  basic: THREE.MeshBasicMaterial,
  lambert: THREE.MeshLambertMaterial,
  standart: THREE.MeshStandardMaterial,
}

export const camerasMap = {
  perspective: THREE.PerspectiveCamera,
  orthographic: THREE.OrthographicCamera,
}
