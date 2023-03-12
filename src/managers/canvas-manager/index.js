/* ALTERNATIVE IMPORT */
// import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

import * as THREE from "../../libs/three.module.js";
import { OrbitControls } from "../../libs/OrbitControls.js";

import { SceneConfigurator } from "./SceneConfigurator.js";
import { ShapesConfigurator } from "./ShapesConfigurator.js";
import { AnimationConfigurator } from "./AnimationConfigurator.js";
import { CameraConfigurator } from "./CameraConfigurator.js";

import { initConfig } from "./initConfig.js";
import { ECanvasSubElements } from "./enums.js";

export default class CanvasManager {
  constructor( { config = {...initConfig}, context } = {} ) {
    this.config = config;
    this.context = context;
    this.domElement = context.subElements[ECanvasSubElements.canvas];

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.domElement, antialias: true });
    
    // Scene
    this.SceneConfigurator = new SceneConfigurator(this);
    this.scene = this.SceneConfigurator.scene;
    
    // Camera
    this.CameraConfigurator = new CameraConfigurator(this);
    this.camera = this.CameraConfigurator.camera;
    
    // Controls 
    this.controls = new OrbitControls(this.camera, this.domElement);
    
    // Shapes
    this.ShapesConfigurator = new ShapesConfigurator(this);
    this.config.shapes.forEach(shape => this.ShapesConfigurator.addShape(shape));

    // Animation
    this.AnimationConfigurator = new AnimationConfigurator(this);
  }
}
