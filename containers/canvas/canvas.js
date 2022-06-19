import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";

import { SceneConfigurator } from "./sceneConfigurator.js";
import { GeometryConfigurator } from "./geometryConfigurator.js";
import { AnimationConfigurator } from "./animationConfigurator.js";

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
  domElement = document.querySelector(".canvas");

  _renderer;
  _camera;
  _controls;

  SceneConfigurator;
  scene;

  AnimationConfigurator;

  _entities = []; // all geometry will be located here

  constructor( config = window.config ) {
    this.config = config;
    this._Initialize();
  }
  
  _Initialize() {
    // Geometry
    this.GeometryConfigurator = new GeometryConfigurator(this);

    // Scene
    this.SceneConfigurator = new SceneConfigurator(this);
    this.scene = this.SceneConfigurator.scene;

    // Camera
    this._SetCamera();

    // Renderer
    this._SetRenderer();

    // Controls 
    this._SetControls();

    // Animation
    this.AnimationConfigurator = new AnimationConfigurator(this);
  }

  _SetRenderer() {
    this._renderer = new THREE.WebGLRenderer({ canvas: this.domElement, antialias: true });
  }

  _SetCamera() {
    this._camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000.0);
    this._camera.position.set(0, 0, 25);
  }

  _SetControls() {
    this._controls = new OrbitControls(this._camera, this.domElement);
  }
}

export default new Canvas();
