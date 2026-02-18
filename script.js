function predictDelay() {
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const carrierInput = document.getElementById("carrier").value.trim();
  const carrier = carrierInput.toLowerCase();
  const transit = parseInt(document.getElementById("transit").value);

  const result = document.getElementById("result");
  const meterFill = document.getElementById("meterFill");
  const aiNote = document.getElementById("aiNote");
  const historyBody = document.getElementById("historyBody");

  if (!origin || !destination || !carrier || isNaN(transit)) {
    result.innerHTML = "⚠️ Please fill all fields correctly.";
    result.style.color = "red";
    return;
  }

  let riskScore = 0;

  // Transit logic
  if (transit > 28) riskScore += 50;
  else if (transit > 18) riskScore += 30;
  else riskScore += 10;

  // Carrier risk
  const riskyCarriers = ["unknown", "local", "small"];
  if (riskyCarriers.some(c => carrier.includes(c))) {
    riskScore += 25;
  }

  // Distance simulation
  if (origin !== destination) riskScore += 10;

  // Risk level
  let riskLevel = "";
  let color = "";

  if (riskScore >= 70) {
    riskLevel = "🔴 High Delay Risk";
    color = "#e74c3c";
  } else if (riskScore >= 40) {
    riskLevel = "🟠 Medium Delay Risk";
    color = "#f39c12";
  } else {
    riskLevel = "🟢 Low Delay Risk";
    color = "#27ae60";
  }

  // Result card
  result.innerHTML = `
    <div class="result-card">
      <h3>${riskLevel}</h3>
      <p><strong>Risk Score:</strong> ${riskScore}/100</p>
    </div>
  `;
  result.style.color = color;

  // Meter animation
  meterFill.style.width = riskScore + "%";
  meterFill.style.background = color;

  // AI-style explanation
  aiNote.innerHTML = `
    🤖 AI Insight: Based on transit time, carrier profile, 
    and route distance, this shipment shows <strong>${riskLevel.replace(/🔴|🟠|🟢/g, "")}</strong>.
  `;

  // Add to history
  const row = `
    <tr>
      <td>${origin}</td>
      <td>${destination}</td>
      <td>${carrierInput}</td>
      <td>${transit}</td>
      <td>${riskLevel.replace(/🔴|🟠|🟢/g, "")}</td>
    </tr>
  `;
  historyBody.insertAdjacentHTML("afterbegin", row);
}
