// const information = document.getElementById("info");
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
  console.log(response);
});
