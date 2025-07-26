// Set hidden timestamp field
document.addEventListener("DOMContentLoaded", function () {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Footer year
  const yearField = document.getElementById("year");
  if (yearField) {
    yearField.textContent = new Date().getFullYear();
  }
});

// Modal Functions
function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "block";
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

// Optional: Close modal on outside click
window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});