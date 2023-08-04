const body = document.querySelector("body");
const button = document.querySelector("button");
const startMsg = document.querySelector("p");

startMsg.style.display = "none";

let intervalId = setInterval(() => {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  let rgb = `${red}, ${green}, ${blue}`;

  body.style.backgroundColor = `rgb(${rgb})`;

  //   console.log(rgb);
}, 1000);

function stopChange() {
  clearInterval(intervalId);
  button.textContent = body.style.backgroundColor;
  startMsg.style.display = "block";
}

startMsg.addEventListener("click", () => {
  location.reload();
});

button.addEventListener("click", stopChange);
