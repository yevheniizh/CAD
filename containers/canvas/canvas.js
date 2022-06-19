import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";

import { SceneConfigurator } from "./sceneConfigurator.js";
import { GeometryConfigurator } from "./geometryConfigurator.js";
import { AnimationConfigurator } from "./animationConfigurator.js";
import { CameraConfigurator } from "./cameraConfigurator.js";

import { canvas } from "../../constants/DOM.js";

/* ALTERNATIVE IMPORT */
// import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

window.config = {
  background: '#ffffff',
  wireframe: false,
};

/**
 * 
 * TODO: 
 * 1) Create config shape (camera, scene, etc)
 * 2) Add constants (colors, geometry, etc)
 * 3) Add panels (geometry, light, animation?)
 * 4) Add objects factory
 * 5) Add special context menu? -> shortcuts
 * 6) Camera type (perspective, orthogonal)
 * 
 * */

class Canvas {
  domElement = canvas;
  entities = []; // all geometry will be located here

  constructor( config = window.config ) {
    this.config = config;
    
    // Renderer
    this._SetRenderer();
    
    // Scene
    this.SceneConfigurator = new SceneConfigurator(this);
    this.scene = this.SceneConfigurator.scene;
    
    // Camera
    this.CameraConfigurator = new CameraConfigurator(this);
    this.camera = this.CameraConfigurator.camera;
    
    // Controls 
    this._SetControls();
    
    // Geometry
    this.GeometryConfigurator = new GeometryConfigurator(this);

    // Animation
    this.AnimationConfigurator = new AnimationConfigurator(this);
  }

  _SetRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.domElement, antialias: true });
  }

  _SetControls() {
    this.controls = new OrbitControls(this.camera, this.domElement);
  }
}

export default new Canvas();
