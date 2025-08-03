// ✅ Hamburger Menu Toggle for Mobile Navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// ✅ Grid/List View Toggle for Discover Page
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const membersContainer = document.getElementById("members");

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    // Add active state styling
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    // Add active state styling
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });

  // Set default active state
  gridBtn.classList.add("active");
}

// ✅ Visitor Message Logic
const visitorMessage = document.getElementById("visitor-message");

if (visitorMessage) {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitorMessage.textContent = `You last visited ${daysBetween} day${daysBetween === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

// ✅ Load Discover Locations from discover.json
if (membersContainer) {
  fetch("data/discover.json")
    .then((res) => res.json())
    .then((spots) => {
      membersContainer.innerHTML = ""; // Clear any existing content

      spots.forEach((spot) => {
        const card = document.createElement("div");
        card.className = "member-card";

        card.innerHTML = `
          <img src="${spot.image}" alt="${spot.title}" loading="lazy">
          <div class="member-info">
            <h3>${spot.title}</h3>
            <p>${spot.description}</p>
            <address>📍 ${spot.address}</address>
            <a href="${spot.link}" target="_blank" rel="noopener noreferrer">Learn more</a>
            ${spot.map ? `<a href="${spot.map}" target="_blank" rel="noopener noreferrer">📍 View on Map</a>` : ""}
          </div>
        `;

        membersContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("❌ Failed to load Discover data:", error);
      membersContainer.innerHTML = "<p>⚠️ Unable to load Discover content. Please try again later.</p>";
    });
}

// ✅ Footer Dynamic Content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;