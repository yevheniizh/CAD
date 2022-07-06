import * as THREE from "./threejs/three.module.js";
import { geometriesMap, materialsMap } from "../../constants/threeMaps.js";
import { isAlreadyOnConfig, isAlreadyOnScene, isShape } from "../../helpers/index.js";

export class ShapesConfigurator {
  constructor(canvas){
    this.canvas = canvas;
  }

  addShape( shape ) {
    if ( isAlreadyOnScene.call(this, shape.uuid) ) return;
    this.renderShape(shape);
  }

  renderShape( {uuid, geometry, material, placement} ) {
    const shape = new THREE.Mesh( 
      new geometriesMap[geometry.type]( ...Object.values(geometry.props) ),
      new materialsMap[material.type]( material.props ),
    );
    
    // if already exists on config, set original uuid
    if ( uuid ) {
      shape.uuid = uuid; // overwrite uuid
    }
    
    if ( placement ) {
      shape.position.x = placement.position.x;
      shape.position.y = placement.position.y;
      shape.position.z = placement.position.z;
      
      shape.rotation.x = placement.rotation.x;
      shape.rotation.y = placement.rotation.y;
      shape.rotation.z = placement.rotation.z;
    }

    if ( !isAlreadyOnConfig.call(this, shape.uuid) ) {
      this.canvas.config = {
        ...this.canvas.config,
        shapes: [...this.canvas.config.shapes, {
          uuid: shape.uuid, geometry, material,
        }],
      };
    }

    shape.add(new THREE.AxesHelper(2)); // add XYZ axes
    this.canvas.scene.add(shape); // moves to -> this.canvas.scene.children: [meshes, lights, axes, etc.]
  }

  removeShape( shape ) {
    const shapeToRemove =
      this.canvas.scene.children.find(child => child.uuid === shape.uuid)
    const filteredShapesConfig = this.canvas.config.shapes
      .filter( child => child.uuid !== shape.uuid );

      
    if (!!shapeToRemove) {
      this.canvas.scene.remove(shapeToRemove);

      this.canvas.config = {
        ...this.canvas.config,
        shapes: filteredShapesConfig,
      };
    }
  }

  removeAll() {
    // NOTE: '.clear()' also works, but removes all the settings, except lights
    this.canvas.scene.children
      .filter(isShape)
      .forEach(shape => this.canvas.scene.remove(shape));

    this.canvas.config = {
      ...this.canvas.config,
      shapes: [],
    };
  }

  setWireframe() {
    // TEMP: sets wireframe to all shapes
    this.canvas.scene.children
      .filter( isShape)
      .forEach( shape => shape.material.wireframe = !shape.material.wireframe );

    this.canvas.config = {
      ...this.canvas.config,
      shapes: this.canvas.config.shapes
        .map( shape => ( {
          ...shape,
          material: {
            ...shape.material,
            props: {
              ...shape.material.props,
              wireframe: !shape.material.wireframe,
            },
          },
        } )
      ),
    };
  }

  getPlacement(uuid) {
    const {position, rotation}
      = this.canvas.scene.children.find( child => child.uuid === uuid );

    return {
      position: {
        x: position.x,
        y: position.y,
        z: position.z,
      }, rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      }
    }
  }
}
