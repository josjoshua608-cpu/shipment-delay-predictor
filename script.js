function predictDelay() {
  const transit = document.getElementById("transit").value;
  const result = document.getElementById("result");

  let risk = "Low Risk ✅";

  if (transit > 25) {
    risk = "High Risk 🔴";
  } else if (transit > 15) {
    risk = "Medium Risk 🟠";
  }

  result.innerText = "Delay Prediction: " + risk;
}
