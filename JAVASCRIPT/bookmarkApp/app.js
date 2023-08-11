const addButton = document.querySelector("#addBookmarkBtn");
const bookmarkList = document.querySelector("#bookmarkList");
const clearAll = document.querySelector("#clear-all");

function addBookmark() {
  let urlId = document.querySelector("#bookmarkUrl").value;
  let urlName = document.querySelector("#bookmarkName").value;

  let urlList = `
        <div class="url-detail">
            <p>${urlName}</p>
            <a href="${urlId}" target="_blank">${urlId}</a>
            <i class="fa-solid fa-trash delete"></i>
        </div>
    `;

  bookmarkList.innerHTML += urlList;

  let storedURLs = JSON.parse(localStorage.getItem("urlList")) || [];
  storedURLs.push({ urlId, urlName });
  localStorage.setItem("urlList", JSON.stringify(storedURLs));

  document.querySelector("#bookmarkUrl").value = "";
  document.querySelector("#bookmarkName").value = "";

  if (bookmarkList.innerHTML === "") {
    clearAll.style.visibility = "hidden";
  } else {
    clearAll.style.visibility = "visible";
  }

  // Attach delete event listener to the new delete icon
  const deleteIcon = bookmarkList.lastElementChild.querySelector(".delete");
  deleteIcon.addEventListener("click", handleDelete);
}

function storedData() {
  const storedURLs = JSON.parse(localStorage.getItem("urlList")) || [];

  storedURLs.forEach((storedURL) => {
    const urlListItem = document.createElement("div");
    urlListItem.classList.add("url-detail");
    urlListItem.innerHTML = `
      <p>${storedURL.urlName}</p>
      <a href="${storedURL.urlId}" target="_blank">${storedURL.urlId}</a>
      <i class="fa-solid fa-trash delete"></i>
    `;

    bookmarkList.appendChild(urlListItem);

    // Attach delete event listener to the new delete icon
    const deleteIcon = urlListItem.querySelector(".delete");
    deleteIcon.addEventListener("click", handleDelete);
  });
}

function handleDelete(e) {
  const clickedDeleteIcon = e.target;
  const urlListItem = clickedDeleteIcon.parentElement;
  const urlId = urlListItem.querySelector("a").getAttribute("href");

  // Remove from displayed view
  bookmarkList.removeChild(urlListItem);

  // Remove from stored data
  let storedURLs = JSON.parse(localStorage.getItem("urlList")) || [];
  storedURLs = storedURLs.filter((storedURL) => storedURL.urlId !== urlId);
  localStorage.setItem("urlList", JSON.stringify(storedURLs));

  if (bookmarkList.innerHTML === "") {
    clearAll.style.visibility = "hidden";
  }
}

clearAll.addEventListener("click", () => {
  bookmarkList.innerHTML = "";
  localStorage.clear();
  clearAll.style.visibility = "hidden";
});

document.addEventListener("DOMContentLoaded", () => {
  storedData();

  if (bookmarkList.innerHTML === "") {
    clearAll.style.visibility = "hidden";
  } else {
    clearAll.style.visibility = "visible";
  }
});

addButton.addEventListener("click", addBookmark);
