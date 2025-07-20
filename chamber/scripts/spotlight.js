async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // 🎖️ Filter Gold and Silver members (membership level 3 or 2)
    const spotlightEligible = members.filter(member =>
      member.membership === 3 || member.membership === 2
    );

    // 🔀 Randomize and select 2–3 members
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selected = spotlightEligible
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    // 🧱 Render cards
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.className = "member-card";

      const levelText = member.membership === 3 ? "Gold" : "Silver";

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" class="spotlight-img">
        <h3>${member.name}</h3>
        <p><strong>📍</strong> ${member.address}</p>
        <p><strong>📞</strong> ${member.phone}</p>
        <p><strong>🔗</strong> <a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><em>Membership Level: ${levelText}</em></p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

fetchSpotlights();