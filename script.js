btn = document.getElementById("test-btn");
btn.addEventListener("click", () => {
  const el = document.createElement("p");
  el.textContent = "I think we got it!";

  document.body.appendChild(el);
});
