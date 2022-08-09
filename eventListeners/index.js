/**
 * @name toggleAccordion
 * @type {function} - event listener
 */
export function toggleAccordion( event ) {
  const accordionButton = event.target.closest(".a-button");

  if (accordionButton) {
    accordionButton.parentNode.classList.toggle("active");
  }
}
