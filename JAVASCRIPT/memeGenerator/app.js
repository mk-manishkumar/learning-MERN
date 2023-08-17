const memeApiUrl = "https://api.imgflip.com/get_memes";
let currentMemeIndex = 0;
let memes = [];

async function fetchMemes() {
  try {
    const response = await fetch(memeApiUrl);
    const data = await response.json();
    memes = data.data.memes; // Assuming the API returns an array of meme objects
    displayMeme(currentMemeIndex);
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

function displayMeme(index) {
  const imgElement = document.getElementById("myImg");
  imgElement.src = memes[index].url; // Update to the correct meme URL property
}

function nextMeme() {
  currentMemeIndex = (currentMemeIndex + 1) % memes.length;
  displayMeme(currentMemeIndex);
}

// Attach nextMeme function to the button click event
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".btn");
  button.addEventListener("click", nextMeme);

  fetchMemes(); // Fetch memes when the page loads
});
