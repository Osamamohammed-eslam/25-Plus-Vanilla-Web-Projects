const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((accordionHeader) => {
  accordionHeader.addEventListener("click", () => {
    const activeAccordion = document.querySelector(".accordion-header.active");
    if (activeAccordion && activeAccordion !== accordionHeader) {
      activeAccordion.classList.toggle("active");
      activeAccordion.nextElementSibling.style.maxHeight = 0;
    }

    accordionHeader.classList.toggle("active");

    const accordionBodyContent = accordionHeader.nextElementSibling;
    if (accordionHeader.classList.contains("active")) {
      accordionBodyContent.style.maxHeight =
        accordionBodyContent.scrollHeight + "px";
    } else {
      accordionBodyContent.style.maxHeight = 0;
    }
  });
});
