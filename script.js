// TEST CHANGE
function predictDelay() {
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const carrier = document.getElementById("carrier").value.trim().toLowerCase();
  const transit = parseInt(document.getElementById("transit").value);

  const result = document.getElementById("result");

  // Validation
  if (!origin || !destination || !carrier || isNaN(transit)) {
    result.innerHTML = "⚠️ Please fill all fields correctly.";
    result.style.color = "red";
    return;
  }

  let riskScore = 0;

  // Transit days logic
  if (transit > 28) riskScore += 50;
  else if (transit > 18) riskScore += 30;
  else riskScore += 10;

  // Carrier risk simulation
  const riskyCarriers = ["unknown", "local", "small"];
  if (riskyCarriers.some(c => carrier.includes(c))) {
    riskScore += 25;
  }

  // Long distance simulation
  if (origin !== destination) {
    riskScore += 10;
  }

  // Risk level decision
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

  result.innerHTML = `
    <div class="result-card">
      <h3>${riskLevel}</h3>
      <p><strong>Risk Score:</strong> ${riskScore}/100</p>
    </div>
  `;
  result.style.color = color;
}
