// Footer Information
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Directory Controls
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

// Load Members Data
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch member data.");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.textContent = "⚠️ Unable to load directory at this time.";
    console.error(error);
  }
}

// Display Members as Cards
function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="${member.name}" />
      <p>📍 ${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>💎 Membership Level: ${member.membership}</p>
    `;
    membersContainer.appendChild(card);
  });
}

// View Toggle Controls
gridBtn.addEventListener("click", () => {
  membersContainer.className = "grid";
  membersContainer.querySelectorAll(".member-list").forEach(card => {
    card.className = "member-card";
  });
});

listBtn.addEventListener("click", () => {
  membersContainer.className = "list";
  membersContainer.querySelectorAll(".member-card").forEach(card => {
    card.className = "member-list";
  });
});

// Initialize on Load
getMembers();