// Menu toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("active");
});

// Inline form confirmation
const form = document.getElementById("contact-form");
const confirmation = document.getElementById("confirmation-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  form.style.display = "none";
  confirmation.style.display = "block";
});

// Footer year & last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;