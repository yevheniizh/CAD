/* ALTERNATIVE IMPORT */
// import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";

import { SceneConfigurator } from "./SceneConfigurator.js";
import { ShapesConfigurator } from "./ShapesConfigurator.js";
import { AnimationConfigurator } from "./AnimationConfigurator.js";
import { CameraConfigurator } from "./CameraConfigurator.js";

import { CommandManager } from "../command/CommandManager.js";

import { initConfig } from "./initConfig.js";
import { ECanvasSubElements } from "../../pages/canvas/enums.js";

/**
 * 
 * TODO: 
 * 1) Create config shape (camera, scene, etc)
 * 2) Add constants (colors, shapes, etc)
 * 3) Add panels (shapes, light, animation?)
 * 4) Add objects factory
 * 5) Add special context menu? -> shortcuts
 * 6) Camera type (perspective, orthogonal)?
 * 7) Login page?
 * 
 * */

export default class Canvas {
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

    // Command listeners
    new CommandManager(this);
  }
}
