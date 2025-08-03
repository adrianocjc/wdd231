document.addEventListener("DOMContentLoaded", function () {
  // ✅ Hamburger toggle
  const toggleButton = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  // ✅ Form submission handling
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");

  if (form && confirmation) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.style.display = "none";
      confirmation.style.display = "block";
    });
  }

  // ✅ Footer info update
  const yearSpan = document.getElementById("year");
  const modifiedSpan = document.getElementById("lastModified");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});