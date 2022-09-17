import * as THREE from "./threejs/three.module.js";

import { catchError } from '../../src/utils/error.util.js';
import { isAlreadyOnScene } from "./helpers.js";
import { ECanvasSubElements } from "./enums.js";

export class SceneConfigurator {
  scene;

  constructor (canvas) {
    this.canvas = canvas;
    
    this.scene = new THREE.Scene();
    this.renderScene();
  }

  renderScene( config = this.canvas.config ) {
    if( !!this.scene ) {
      // 1. Set background
      if (this.scene.background !== this.canvas.config.background) {
        catchError(this.setBackground.bind(this))();
      }
  
      // 2. Set fog - fading shape to a specific color based on the distance from the camera
      if (this.scene.background !== this.canvas.config.background) {
        catchError(this.setBackground.bind(this))();
      }
      this.scene.fog = new THREE.FogExp2(
        config.scene.fog.color,
        config.scene.fog.density,
      );

      // 3. Set lights
      config.scene.lights
        .filter( item => !isAlreadyOnScene.call(this, item) )
        .forEach( light => this.setLight( light ) );
    }
  }

  setLight( { uuid, color, position: { x, y, z } } ) {
    const spotLight = new THREE.SpotLight( color );
    spotLight.position.set( x, y, z );

    if ( uuid ) {
      spotLight.uuid = uuid; // overwrite uuid
    } else {
      this.canvas.config = {
        ...this.canvas.config,
        scene: {
          ...this.canvas.config.scene,
          lights: [
            ...this.canvas.config.scene.lights,
            {
              uuid: spotLight.uuid,
              color,
              position: { x, y, z }
            },
          ],
        },
      };
    }

    this.scene.add( spotLight );
  }

  setBackground( color = this.canvas.config.background ) {
    if ( !this.scene ) throw Error;

    this.scene.background = new THREE.Color( color );
    this.canvas.context.subElements[ECanvasSubElements.colorPickerButton].value = color;
  }
}
