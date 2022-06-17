import * as THREE from "./threejs/three.module.js";

export class SceneConfigurator {
  scene;

  constructor (canvas) {
    this.canvas = canvas;
    this.setScene();
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.setBackground();
    this.scene.fog = new THREE.FogExp2( 0x89b2eb, 0.002 ); // fading geometry to a specific color based on the distance from the camera

    this.setLight(0xeeeece, {x: 1000, y: 1000, z: 1000} );
    this.setLight(0xddddce, {x: -500, y: -500, z: -500} );
  }

  setLight(color, {x, y, z}) {
    const spotLight = new THREE.SpotLight( color );
    spotLight.position.set( x, y, z );
    this.scene.add( spotLight );
  }

  setBackground( color ) {
    if ( this.scene ) {
      if ( color ) window.config.background = color;
      this.scene.background = new THREE.Color( color || this.canvas.config.background );
    } else {
      console.log( 'Something went wrong while set background' );
    }
  }

  setWireframe( value = !window.config.wireframe ) {
    if ( this.scene ) {
      this.canvas._entities.forEach( entity => entity.material.wireframe = value );
      window.config.wireframe = value;
    } else {
      console.log( 'Something went wrong while set wireframe' );
    }
  }
}
