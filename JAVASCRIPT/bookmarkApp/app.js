const addButton = document.querySelector("#addBookmarkBtn");

function addBookmark() {
  let urlId = document.querySelector("#bookmarkUrl").value;
  let urlName = document.querySelector("#bookmarkName").value;
  const bookmarkList = document.querySelector("#bookmarkList");

  let urlList = `
        <div class="url-detail">
            <p>${urlName}</p>
            <a href="${urlId}" target="_blank">${urlId}</a>
        </div>
    `;

  bookmarkList.innerHTML += urlList;

  let storedURLs = JSON.parse(localStorage.getItem("urlList")) || [];
  storedURLs.push({ urlId, urlName });
  localStorage.setItem("urlList", JSON.stringify(storedURLs));

  document.querySelector("#bookmarkUrl").value = "";
  document.querySelector("#bookmarkName").value = "";
}

function storedData() {
  const storedURLs = JSON.parse(localStorage.getItem("urlList")) || [];
  const bookmarkList = document.querySelector("#bookmarkList");

  storedURLs.forEach((storedURL) => {
    const urlListItem = document.createElement("div");
    urlListItem.classList.add("url-detail");
    urlListItem.innerHTML = `
      <p>${storedURL.urlName}</p>
      <a href="${storedURL.urlId}" target="_blank">${storedURL.urlId}</a>
    `;

    bookmarkList.appendChild(urlListItem);
  });
}

document.addEventListener("DOMContentLoaded", storedData);

addButton.addEventListener("click", addBookmark);
