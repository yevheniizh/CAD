import { camerasMap } from "../../constants/threeMaps.js";

export class CameraConfigurator {
  camera;

  constructor( canvas ) {
    this.canvas = canvas;
    this.SetCamera();
  }

  SetCamera() {
    this.camera = new camerasMap.perspective(75, 2, 0.1, 1000.0);
    this.camera.position.set(0, 0, 25);
  }
}
