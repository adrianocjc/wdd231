// Footer Info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// DOM References
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const membersContainer = document.getElementById("members");
const toggleBtn = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// Membership Labels
const levels = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member"
};

// Load Data
async function loadMembers() {
  try {
    const res = await fetch("data/members.json");
    const members = await res.json();
    displayMembers(members);
  } catch (err) {
    membersContainer.innerHTML = "<p>⚠️ Unable to load members.</p>";
    console.error(err);
  }
}

// Render Members
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
      <p>💎 ${levels[member.membership]}</p>
    `;
    membersContainer.appendChild(card);
  });
}

// View Toggle (CodePen style)
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

loadMembers();