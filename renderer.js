const information = document.getElementById("info");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchForm = document.getElementById("search-form");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  // package data for main process
  const data = {
    format: formData.get("searchFormat"),
    term: formData.get("searchTerm"),
    field: formData.get("searchField"),
  };

  const response = await window.sendQueryData.sendQueryData(
    "sendQueryData",
    data,
  );

  console.log(await response);

  // after remove the optional ? below
  response?.forEach((obj) => {
    const p = document.createElement("p");
    p.innerText = `${obj.id} - ${obj.artist} - ${obj.title} - ${obj.location}`;
    information.appendChild(p);
  });
  // document.body.style.backgroundColor = "#202020";
  searchForm.reset();
});

const dialogEl = document.getElementById("pw-dialog");
dialogEl.showModal();
const pwForm = document.querySelector("#pw-dialog form");
const pwInput = document.getElementById("postgresPw");
pwForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.password.password(pwInput.value);
  dialogEl.close();
});

// can access data stored in preload.js
// console.log(window.sillyness.silly1());
// console.log(window.sillyness.silly2());
// console.log(window.sillyness.silly3());
// console.log(window.sillyness.silly4());

// generate a random "error" which gets its msg from our custom errors message obj
const rndNum = Math.ceil(Math.random() * 5);
switch (rndNum) {
  case 1:
    console.log(window.errors.errorType1);
    break;
  case 2:
    console.log(window.errors.errorType2);
    break;
  case 3:
    console.log(window.errors.errorType3);
    break;
  case 4:
    console.log(window.errors.errorType4);
    break;
  case 5:
    console.log(window.errors.errorType5);
    break;
  default:
    break;
}
