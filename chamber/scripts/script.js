// ✅ Footer Information
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ Mobile Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// ✅ View Toggle Buttons (Grid & List)
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const membersContainer = document.getElementById("members");

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// ✅ Membership Level Labels
const levels = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member"
};

// ✅ Fetch and Render Chamber Members
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = "<p>⚠️ Unable to load member data.</p>";
    console.error("Fetch error:", error);
  }
}

// ✅ Display Members
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.className = "member-card";

    const name = member.name || "Unnamed Business";
    const image = member.image || "images/placeholder.jpg";
    const altText = member.name ? member.name : "Business logo";
    const level = levels[member.membership] || "Community Partner";

    card.innerHTML = `
      <h3>${name}</h3>
      <img src="${image}" alt="${altText}" loading="lazy">
      <p>📍 ${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      <p>💎 ${level}</p>
    `;

    membersContainer.appendChild(card);
  });
}

// ✅ Load members on page load
loadMembers();