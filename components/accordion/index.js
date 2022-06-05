import App from "../../js/index.js";

const navArea = document.querySelector(".nav-area");

// Delegate to expand/collapse accordion to all nav-area buttons
navArea.addEventListener("click", ( e ) => {
  const navButton = e.target.closest(".accordion-button");

  if (navButton) {
    navButton.classList.toggle("active");
    const panel = navButton.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
} )

// Wireframe button
const button = document.querySelector(".button.wireframe");
button.addEventListener("click", () => App.setWireframe());
