import Canvas from "../canvas/index.js";

// Colorpicker button
const button = document.querySelector(".button.background");

button.addEventListener("click", () => {
  button.classList.toggle("active");
  const colorpicker = button.nextElementSibling;

  if (button.classList.contains("active")) {
    colorpicker.style.display = 'block';
  } else {
    colorpicker.style.display = 'none';
  } 
} );

// Colorpicker
const colorpicker = document.querySelector(".colorpicker .color-input");
colorpicker.value = window.config.background;

colorpicker.addEventListener("change", (e) => Canvas.setBackground(e.target.value));
