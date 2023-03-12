import * as THREE from "../../libs/three.module.js";

export function isAlreadyOnScene(uuid) {
  return !!this.canvas?.scene?.children.some(item => item.uuid === uuid );
}

export function isAlreadyOnConfig(uuid) {
  return !!this.canvas?.config?.shapes.some( item => item.uuid === uuid );
}

export const isShape = (item) => item.isMesh;

export const setUuid = () => THREE.Math.generateUUID();

export function wrapper(fn, context = this) {
  return function (...args) {
    return fn.apply(context, args);
  };
}
