// ✅ Grid/List View Toggle for Discover Page
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const membersContainer = document.getElementById("members");

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
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
          <h3>${spot.title}</h3>
          <p>${spot.description}</p>
          <address>📍 ${spot.address}</address>
          <a href="${spot.link}" target="_blank" rel="noopener noreferrer">Learn more</a>
        `;

        membersContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("❌ Failed to load Discover data:", error);
      membersContainer.innerHTML = "<p>⚠️ Unable to load Discover content. Please try again later.</p>";
    });
}