const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

// Footer Info
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Fetch member data
async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

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

gridBtn.addEventListener("click", () => {
  membersContainer.className = "grid";
});

listBtn.addEventListener("click", () => {
  membersContainer.className = "list";
  const cards = membersContainer.querySelectorAll(".member-card");
  cards.forEach(card => {
    card.className = "member-list";
  });
});

getMembers();