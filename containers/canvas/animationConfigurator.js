export class AnimationConfigurator {
  constructor( canvas ) {
    this.canvas = canvas;
    this._Animate();
  }

  _Animate(time) {
    time *= 0.001; // get time in seconds

    this.canvas._entities.forEach((entity) => {
      entity.rotation.x += 0.01;
      entity.rotation.y += 0.005;
      entity.rotation.z += 0.01;
    });

    const needResize = this._ResizeRendererToDisplaySize();
    if (needResize) {
      this.canvas._camera.aspect = this.canvas.domElement.clientWidth / this.canvas.domElement.clientHeight;
      this.canvas._camera.updateProjectionMatrix(); // doesn't distort view when resize
    }

    this.canvas._controls.update();
    this.canvas._renderer.render(this.canvas.scene, this.canvas._camera);

    requestAnimationFrame(this._Animate.bind(this)); // starts animation loop
  }

  _ResizeRendererToDisplaySize() {
    const pixelRatio = window.devicePixelRatio;
    const canvasWidth = (this.canvas.domElement.clientWidth * pixelRatio) | 0;
    const canvasHeight = (this.canvas.domElement.clientHeight * pixelRatio) | 0;

    const needResize =
      this.canvas.domElement.width !== canvasWidth || this.canvas.domElement.height !== canvasHeight;
    if (needResize) {
      const updateStyle = false; // prevents style changes to the output canvas
      this.canvas._renderer.setSize(canvasWidth, canvasHeight, updateStyle);

      /* ALTERNATIVE WAY TO SET PIXEL RATIO */
      // this.canvas._renderer.setPixelRatio(pixelRatio)
    }

    return needResize;
  }
}
