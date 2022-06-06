import Canvas from "../canvas/index.js";

// Wireframe button
const wireframeButton = document.querySelector(".button.view-wireframe");
wireframeButton.addEventListener("click", () => Canvas.setWireframe());

// Colorpicker button
const colorpicker = document.querySelector(".colorpicker .color-input");
colorpicker.value = window.config.background;
colorpicker.addEventListener("change", (e) => Canvas.setBackground(e.target.value));
