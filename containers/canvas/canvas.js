import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";

import { SceneConfigurator } from "./sceneConfigurator.js";

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
  canvas = document.querySelector(".canvas");
  _renderer;
  _camera;
  _controls;
  _entities = []; // all geometry will be located here

  constructor( config = window.config ) {
    this.config = config;

    this.SceneConfigurator = new SceneConfigurator(this);
    this.scene = this.SceneConfigurator.scene;

    this._Initialize();
  }
  
  _Initialize() {
    this._SetRenderer();
    this._SetCamera();
    this._SetControls();
    this._Animate();
  }

  _SetRenderer() {
    this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
  }

  _SetCamera() {
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 0, 25);
  }

  _SetControls() {
    const canvas = this._renderer.domElement;
    this._controls = new OrbitControls(this._camera, canvas);
  }

  _ResizeRendererToDisplaySize() {
    const pixelRatio = window.devicePixelRatio;
    const canvasWidth = (this.canvas.clientWidth * pixelRatio) | 0;
    const canvasHeight = (this.canvas.clientHeight * pixelRatio) | 0;

    const needResize =
      this.canvas.width !== canvasWidth || this.canvas.height !== canvasHeight;
    if (needResize) {
      const updateStyle = false; // prevents style changes to the output canvas
      this._renderer.setSize(canvasWidth, canvasHeight, updateStyle);

      /* ALTERNATIVE WAY TO SET PIXEL RATIO */
      // this._renderer.setPixelRatio(pixelRatio)
    }

    return needResize;
  }

  _Animate(time) {
    time *= 0.001; // get time in seconds

    this._entities.forEach((entity) => {
      entity.rotation.x += 0.01;
      entity.rotation.y += 0.005;
      entity.rotation.z += 0.01;
    });

    const needResize = this._ResizeRendererToDisplaySize();
    if (needResize) {
      this._camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this._camera.updateProjectionMatrix(); // doesn't distort view when resize
    }

    this._controls.update();
    this._renderer.render(this.scene, this._camera);

    requestAnimationFrame(this._Animate.bind(this)); // starts animation loop
  }
}

export default new Canvas();
