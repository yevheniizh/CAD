import * as THREE from "./threejs/three.module.js";

export const primitives = {
  box: THREE.BoxGeometry,
  cone: THREE.ConeGeometry,
  torus: THREE.TorusGeometry,
  sphere: THREE.SphereGeometry,
}

export const materials = {
  basic: THREE.MeshBasicMaterial,
  lambert: THREE.MeshLambertMaterial,
  standart: THREE.MeshStandardMaterial,
}

export class GeometryConfigurator {
  constructor(canvas){
    this.canvas = canvas;
  }

  injectFigure(figure) {
    this.canvas._entities = [...this.canvas._entities, figure];
    this.canvas.scene.add(figure.add(new THREE.AxesHelper(2)));
  }

  removeAll() {
    // NOTE: '.clear()' also works, but removes all the light settings
    this.canvas._entities.forEach(figure => this.canvas.scene.remove(figure));
    this.canvas._entities = [];
  }

  addPrimitive( {geometry, material} ) {
    this.injectFigure(
      new THREE.Mesh( 
        new geometry.type( ...Object.values(geometry.props) ),
        new material.type( material.props ),
      )
    );
  }
}
