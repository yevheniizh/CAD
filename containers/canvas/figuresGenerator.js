import * as THREE from "./threejs/three.module.js";

import Canvas from "./canvas.js";

export class FiguresGenerator {
  static addFigure(figure) {
    Canvas._entities = [...Canvas._entities, figure];
    Canvas._scene.add(figure.add(new THREE.AxesHelper(2)));
  }

  static addTorus( { geometry, material } ) {
    const { radius, tube, radialSegments, tubularSegments } = geometry;

    this.addFigure( new THREE.Mesh( 
      new THREE.TorusGeometry( radius, tube, radialSegments, tubularSegments ), 
      new THREE.MeshStandardMaterial( material )
    ) );
  }

  static addBox( { geometry, material } ) {
    const { width, height, depth, widthSegments, heightSegments, depthSegments } = geometry;

    this.addFigure( new THREE.Mesh( 
      new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ),
      new THREE.MeshStandardMaterial( material )
    ) );
  }
}
