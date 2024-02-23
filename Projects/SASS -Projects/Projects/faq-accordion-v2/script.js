const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((accordionHeader) => {
  accordionHeader.addEventListener("click", () => {
    const currentlyActive = document.querySelector(".accordion-header.active");
    if (currentlyActive && currentlyActive !== accordionHeader) {
      currentlyActive.classList.toggle("active");
      currentlyActive.nextElementSibling.style.maxHeight = 0;
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
