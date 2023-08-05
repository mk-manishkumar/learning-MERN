const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const reset = document.querySelector(".reset");

const countValue = document.querySelector("#count-value");
const countJump = document.querySelector("#count-jump");

function countervalueColor() {
  if (countValue.textContent > 0) {
    countValue.style.color = "#120E43";
  } else if (countValue.textContent < 0) {
    countValue.style.color = "#E21717";
  } else {
    countValue.style.color = "#fff";
  }
}

increase.addEventListener("click", () => {
  countValue.textContent =
    Number(countValue.textContent) + Number(countJump.value);
  countervalueColor();
});

decrease.addEventListener("click", () => {
  countValue.textContent =
    Number(countValue.textContent) - Number(countJump.value);
  countervalueColor();
});

reset.addEventListener("click", () => {
  countValue.textContent = 0;
  countervalueColor();
});
