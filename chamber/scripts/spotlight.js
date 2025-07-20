// scripts/spotlight.js

async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // Filter gold/silver members
    const qualified = data.members.filter(m =>
      m.membership === "Gold" || m.membership === "Silver"
    );

    // Shuffle and pick 2–3 members
    const selected = qualified
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>📞</strong> ${member.phone}</p>
        <p><strong>📍</strong> ${member.address}</p>
        <a href="${member.url}" target="_blank">Visit Website</a>
        <p><em>${member.membership} Member</em></p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

fetchSpotlights();