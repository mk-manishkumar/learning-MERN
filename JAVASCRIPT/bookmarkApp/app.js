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

  document.querySelector("#bookmarkUrl").value = "";
  document.querySelector("#bookmarkName").value = "";
}

addButton.addEventListener("click", addBookmark);
