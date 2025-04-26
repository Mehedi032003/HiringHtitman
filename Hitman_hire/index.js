const tiers = [
    { name: "F", minAgents: 7, maxAgents: 9, price: 5000 },
    { name: "E", minAgents: 6, maxAgents: 8, price: 10000 },
    { name: "D", minAgents: 5, maxAgents: 7, price: 25000 },
    { name: "C", minAgents: 4, maxAgents: 6, price: 50000 },
    { name: "B", minAgents: 5, maxAgents: 7, price: 100000 },
    { name: "A", minAgents: 3, maxAgents: 5, price: 200000 },
    { name: "S", minAgents: 3, maxAgents: 3, price: 1000000 }
  ];
  
  const greekRanks = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ"];
  
  const brutalDescriptions = [
    "Known for vanishing targets without a trace.",
    "Leaves only fear and destruction behind.",
    "A silent predator in the night.",
    "Feared across borders for unmatched precision.",
    "Specializes in 'accidents' that raise no suspicion.",
    "Brutal and efficient; no mercy, no survivors.",
    "A walking nightmare; whispers follow his trail.",
    "Master of disguise and silent eliminations.",
    "Records show zero failed missions in the last decade.",
    "Operates like a shadow, unseen and unstoppable."
  ];
  
  // Custom agent names
  const customNames = [
    "Viper",
    "Shadow",
    "Raven",
    "Phantom",
    "Siren",
    "Hunter",
    "Mercenary",
    "Specter",
    "Widow",
    "Falcon"
  ];
  
  // Agent images (you can replace these with real image URLs)
  const agentImages = [
    "https://via.placeholder.com/100?text=Agent1",
    "https://via.placeholder.com/100?text=Agent2",
    "https://via.placeholder.com/100?text=Agent3",
    "https://via.placeholder.com/100?text=Agent4",
    "https://via.placeholder.com/100?text=Agent5",
    "https://via.placeholder.com/100?text=Agent6",
    "https://via.placeholder.com/100?text=Agent7",
    "https://via.placeholder.com/100?text=Agent8",
    "https://via.placeholder.com/100?text=Agent9",
    "https://via.placeholder.com/100?text=Agent10"
  ];
  
  const recordsTemplates = [
    (kills, missions) => `${kills} confirmed kills, ${missions} successful missions.`,
    (kills, missions) => `Involved in ${missions} black ops, ${kills} assassinations.`,
    (kills, missions) => `Responsible for eliminating ${kills} high-value targets.`,
  ];
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function createAgent(tier, index) {
    const agentDiv = document.createElement("div");
    agentDiv.classList.add("agent");
  
    // Randomly choose a name and image for each agent
    const name = customNames[getRandomInt(0, customNames.length - 1)];
    const image = agentImages[getRandomInt(0, agentImages.length - 1)];
  
    const price = tier.price + getRandomInt(0, 10000);
    const description = brutalDescriptions[Math.floor(Math.random() * brutalDescriptions.length)];
    const kills = getRandomInt(10, 300);
    const missions = kills + getRandomInt(0, 100);
    const record = recordsTemplates[Math.floor(Math.random() * recordsTemplates.length)](kills, missions);
  
    agentDiv.innerHTML = `
      <img src="${image}" alt="${name}" class="agent-img"/>
      <h3>${name}</h3>
      <p><strong>Tier:</strong> ${tier.name}</p>
      <p><strong>Rank:</strong> ${greekRanks[index % greekRanks.length]}</p>
      <p><strong>Price:</strong> $${price.toLocaleString()}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Past Records:</strong> ${record}</p>
      <button class="hire-button">Hire Agent</button>
    `;
  
    agentDiv.querySelector('.hire-button').addEventListener('click', () => {
      openHirePopup(name, price);
    });
  
    return agentDiv;
  }
  
  function buildTiers() {
    const container = document.getElementById("tiers");
  
    tiers.forEach(tier => {
      const section = document.createElement("section");
      section.classList.add("tier");
  
      const title = document.createElement("h2");
      title.classList.add("tier-title");
      title.textContent = `Tier ${tier.name}`;
      section.appendChild(title);
  
      const agentsContainer = document.createElement("div");
      agentsContainer.classList.add("agents");
  
      const numAgents = getRandomInt(tier.minAgents, tier.maxAgents);
      for (let i = 0; i < numAgents; i++) {
        agentsContainer.appendChild(createAgent(tier, i));
      }
  
      section.appendChild(agentsContainer);
      container.appendChild(section);
    });
  }
  
  function openHirePopup(agentName, price) {
    const modal = document.createElement('div');
    modal.classList.add('popup-overlay');
  
    modal.innerHTML = `
      <div class="popup">
        <h2>⚠️ WARNING ⚠️</h2>
        <p>You are about to hire <strong>${agentName}</strong> for <strong>$${price.toLocaleString()}</strong>.</p>
        <p>This action cannot be undone. Blood will be spilled. Lives will be lost.</p>
        <p>Are you sure you want to proceed?</p>
        <p><em>(You can pay using money or organs.)</em></p>
        <div class="popup-buttons">
          <button id="pay-money">Pay with Money 💵</button>
          <button id="pay-organs">Pay with Organs 🫀</button>
          <button id="cancel">Cancel ❌</button>
        </div>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    document.getElementById('pay-money').addEventListener('click', () => {
      alert(`Transaction Complete.  
  Agent ${agentName} has been dispatched.  
  Pray they never return for you.`);
      document.body.removeChild(modal);
    });
  
    document.getElementById('pay-organs').addEventListener('click', () => {
      alert(`Organ Donation Accepted.  
  You will be harvested upon delivery.  
  Thank you for your sacrifice.`);
      document.body.removeChild(modal);
    });
  
    document.getElementById('cancel').addEventListener('click', () => {
      alert(`Wise choice. Not everyone survives.`);
      document.body.removeChild(modal);
    });
  }
  
  buildTiers();
  