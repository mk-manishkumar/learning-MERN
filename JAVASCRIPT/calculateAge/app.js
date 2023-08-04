// Leap Year is not considered here.

const inputDOB = document.querySelector("#input");
const calculateEl = document.querySelector(".calculate");
const displayEl = document.querySelector("#display");
const refreshEl = document.querySelector(".refresh");

function displayAge() {
  let date_of_birth = inputDOB.value;

  //   Birth date
  const dobDate = new Date(date_of_birth);

  const dob_year = dobDate.getFullYear();
  const dob_month = dobDate.getMonth() + 1;
  const dob_day = dobDate.getDate();

  //   current day
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the current month (1 - 12).
  const day = currentDate.getDate();

  let age;

  if (year > dob_year) {
    age = year - dob_year;
    displayEl.value = `${age} years`;
  } else if (year === dob_year && month > dob_month) {
    age = month - dob_month;
    displayEl.value = `${age} months`;
  } else if (year === dob_year && month === dob_month && day > dob_day) {
    age = day - dob_day;
    displayEl.value = `${age} days`;
  } else if (year === dob_year && month === dob_month && day === dob_day) {
    displayEl.value = "He is born today.";
  } else {
    alert("Invalid Date of Birth");
  }
}

calculateEl.addEventListener("click", displayAge);
refreshEl.addEventListener("click", () => location.reload());
