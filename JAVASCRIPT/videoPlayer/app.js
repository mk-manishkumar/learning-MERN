const uploadBtn = document.querySelector(".upload");
const videoFolder = document.querySelector(".video_folder");
const mainPage = document.querySelector(".main");

uploadBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  location.reload();
});

videoFolder.addEventListener("click", () => {
  mainPage.style.display = "none";
});
