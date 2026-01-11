const information = document.getElementById("info");
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

// const func = async () => {
//   const response = await window.versions.ping();
//   console.log(response); // prints out 'pong'
// };

// func();

const testInput = document.getElementById("test-input");
const testBtn = document.getElementById("test-btn");

testBtn.addEventListener("click", async () => {
  const response = await window.testFuncs.getData("getData", {
    id: testInput.value,
  });
  response.forEach((obj) => {
    const p = document.createElement("p");
    p.innerText = `${obj.id} - ${obj.artist} - ${obj.title}`;
    information.appendChild(p);
  });
  document.body.style.backgroundColor = "#202020";
});
