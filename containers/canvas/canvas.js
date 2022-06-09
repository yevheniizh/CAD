import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";

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
 * 
 * */

class Canvas {
  canvas;
  _renderer;
  _camera;
  _scene;
  _controls;
  _entities = []; // all geometry will be located here

  constructor( config = window.config ) {
    this.config = config;
    this._Initialize();
  }
  
  _Initialize() {
    this._SetRenderer();
    this._SetCamera();
    this._SetScene();
    this._SetControls();
    this._Animate();
  }

  _SetRenderer() {
    this.canvas = document.querySelector(".canvas");
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

  /**
   * @param {string} color HEX color
   * @example '#ffffff'
   * */
  setBackground(color) {
    if (this._scene) {
      this._scene.background = new THREE.Color(color || this.config.background);
      if (color) this.config.background = color;
    } else {
      console.log('Something went wrong while set background');
    }
  }

  /**
   * @param {boolean} value should show wireframe
   * */
  setWireframe(value = !this.config.wireframe) {
    if (this._scene) {
      this._entities.forEach(entity => entity.material.wireframe = value);
      this.config.wireframe = value;
    } else {
      console.log('Something went wrong while set wireframe');
    }
  }

  _SetScene() {
    this._scene = new THREE.Scene();
    this.setBackground();
    this._scene.fog = new THREE.FogExp2(0x89b2eb, 0.002); // fading geometry to a specific color based on the distance from the camera

    const spotLight = new THREE.SpotLight(0xeeeece);
    spotLight.position.set(1000, 1000, 1000);
    this._scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xddddce);
    spotLight2.position.set(-500, -500, -500);
    this._scene.add(spotLight2);
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

    {
      this._entities.forEach((entity) => {
        entity.rotation.x += 0.01;
        entity.rotation.y += 0.005;
        entity.rotation.z += 0.01;
      });
    }

    const needResize = this._ResizeRendererToDisplaySize();
    if (needResize) {
      this._camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this._camera.updateProjectionMatrix(); // doesn't distort view when resize
    }

    this._controls.update();
    this._renderer.render(this._scene, this._camera);

    requestAnimationFrame(this._Animate.bind(this)); // starts animation loop
  }
}

export default new Canvas();
