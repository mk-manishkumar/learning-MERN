function calculateBMI() {
  const weight = Number(document.querySelector("#weight").value);
  const height = Number(document.querySelector("#height").value);

  const bmi = weight / Math.pow(height / 100, 2);
  const formattedBMI = bmi.toFixed(2);

  document.getElementById("bmiResult").value = "BMI: " + formattedBMI;
}
