export class AnimationConfigurator {
  constructor( canvas ) {
    this.canvas = canvas;
    this.Animate();

    this.config = {
      x: 0.01,
      y: 0.005,
      z: 0.01,
    }
  }

  Animate(time) {
    time *= 0.001; // get time in seconds

    this.canvas.entities.forEach((entity) => {
      entity.rotation.x += this.config.x;
      entity.rotation.y += this.config.y;
      entity.rotation.z += this.config.z;
    });

    const needResize = this.ResizeRendererToDisplaySize();
    if (needResize) {
      this.canvas.camera.aspect = this.canvas.domElement.clientWidth / this.canvas.domElement.clientHeight;
      this.canvas.camera.updateProjectionMatrix(); // doesn't distort view when resize
    }

    this.canvas.controls.update();
    this.canvas.renderer.render(this.canvas.scene, this.canvas.camera);

    requestAnimationFrame(this.Animate.bind(this)); // starts animation loop
  }

  ResizeRendererToDisplaySize() {
    const pixelRatio = window.devicePixelRatio;
    const canvasWidth = (this.canvas.domElement.clientWidth * pixelRatio) | 0;
    const canvasHeight = (this.canvas.domElement.clientHeight * pixelRatio) | 0;

    const needResize =
      this.canvas.domElement.width !== canvasWidth || this.canvas.domElement.height !== canvasHeight;
    if (needResize) {
      const updateStyle = false; // prevents style changes to the output canvas
      this.canvas.renderer.setSize(canvasWidth, canvasHeight, updateStyle);

      /* ALTERNATIVE WAY TO SET PIXEL RATIO */
      // this.canvas.renderer.setPixelRatio(pixelRatio)
    }

    return needResize;
  }

  toggleAnimation() {
    this.config = (
      this.config.x === 0
        ? {
            x: 0.01,
            y: 0.005,
            z: 0.01,
          }
        : {
            x: 0,
            y: 0,
            z: 0,
          }
    );
  }
}
