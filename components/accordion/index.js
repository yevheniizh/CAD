import Canvas from "../canvas/index.js";
import { app } from "../../constants/DOM.js";

// Delegate to expand/collapse accordion to all accordion buttons
app.addEventListener("click", ( e ) => {
  const accordionButton = e.target.closest(".accordion-button");

  if (accordionButton) {
    accordionButton.classList.toggle("active");
    const panel = accordionButton.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
} )

// Wireframe button
const wireframeButton = document.querySelector(".button.wireframe");
wireframeButton.addEventListener("click", () => Canvas.setWireframe());
