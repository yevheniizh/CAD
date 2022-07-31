/**
 * @name toggleAccordion
 * @type {function} - event listener
 */
export function toggleAccordion( event ) {
  const accordionButton = event.target.closest(".accordion-button");

  if (accordionButton) {
    accordionButton.classList.toggle("active");
    const accordionBody = accordionButton.nextElementSibling; // .accordion-body

    if (accordionBody.style.maxHeight) {
      accordionBody.style.maxHeight = null;
    } else {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    } 
  }
}