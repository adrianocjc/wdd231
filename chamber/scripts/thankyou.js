const params = new URLSearchParams(window.location.search);

document.getElementById("confirm-first").textContent = params.get("first") || "—";
document.getElementById("confirm-last").textContent = params.get("last") || "—";
document.getElementById("confirm-email").textContent = params.get("email") || "—";
document.getElementById("confirm-phone").textContent = params.get("phone") || "—";
document.getElementById("confirm-organization").textContent = params.get("organization") || "—";
document.getElementById("confirm-timestamp").textContent = params.get("timestamp")
  ? new Date(params.get("timestamp")).toLocaleString()
  : "—";

document.getElementById("first-name-display").textContent = params.get("first") || "Friend";
document.getElementById("year").textContent = new Date().getFullYear();