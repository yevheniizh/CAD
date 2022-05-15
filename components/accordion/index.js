import App from '../../js/index.js';

const elements = document.querySelectorAll(".accordion");

elements.forEach( element =>
  element.addEventListener("click", () => {
    element.classList.toggle("active");
    const panel = element.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  } )
);

// Wireframe button
const button = document.querySelector(".button.wireframe");

button.addEventListener("click", () => App.setWireframe());
