import { camerasMap } from "./maps.js";

export class CameraConfigurator {
  constructor( canvas ) {
    this.canvas = canvas;
    this._SetCamera();
  }

  _SetCamera() {
    this.canvas.camera = new camerasMap.perspective(75, 2, 0.1, 1000.0);
    this.canvas.camera.position.set(0, 0, 25);
  }
}
