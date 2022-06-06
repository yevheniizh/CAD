import { app } from "../../constants/DOM.js";

// Delegate to expand/collapse accordion to all accordion buttons
app.addEventListener("click", ( e ) => {
  const accordionButton = e.target.closest(".accordion-button");

  if (accordionButton) {
    accordionButton.classList.toggle("active");
    const accordionBody = accordionButton.nextElementSibling; // .accordion-body

    if (accordionBody.style.maxHeight) {
      accordionBody.style.maxHeight = null;
    } else {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    } 
  }
} )
