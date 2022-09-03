import * as THREE from "./threejs/three.module.js";

export const EGeometriesMap = {
  box: 'box',
  cone: 'cone',
  torus: 'torus',
  sphere: 'sphere',
}

export const geometriesMap = {
  [EGeometriesMap.box]: THREE.BoxGeometry,
  [EGeometriesMap.cone]: THREE.ConeGeometry,
  [EGeometriesMap.torus]: THREE.TorusGeometry,
  [EGeometriesMap.sphere]: THREE.SphereGeometry,
}

export const EMaterialsMap = {
  basic: 'basic',
  lambert: 'lambert',
  standart: 'standart',
}

export const materialsMap = {
  [EMaterialsMap.basic]: THREE.MeshBasicMaterial,
  [EMaterialsMap.lambert]: THREE.MeshLambertMaterial,
  [EMaterialsMap.standart]: THREE.MeshStandardMaterial,
}

export const ECamerasMap = {
  perspective: 'perspective',
  orthographic: 'orthographic',
}

export const camerasMap = {
  [ECamerasMap.perspective]: THREE.PerspectiveCamera,
  [ECamerasMap.orthographic]: THREE.OrthographicCamera,
}

export const ECanvasSubElements = {
  animationButton: 'animationButton',
  canvas: 'canvas',
  clearButton: 'clearButton',
  colorPickerButton: 'colorPickerButton',
  figureButton: 'figureButton',
  historyPanel: 'historyPanel',
  redoButton: 'redoButton',
  undoButton: 'undoButton',
  wireframeButton: 'wireframeButton',
  signOutButton: 'signOutButton',
}
