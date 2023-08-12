const apiUrl = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getquote(url) {
  const response = await fetch(url);
  let data = await response.json();

  quote.innerHTML = data.content;
  author.innerHTML = data.author;
}

getquote(apiUrl);

function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      quote.innerHTML +
      "----by " +
      author.innerHTML,
    "Tweet Window"
  );
}
