const state = { open: false };

const hamburger = document.querySelector(".hamburger");
const navParent = document.querySelector(".nav");
const nav = navParent.querySelector("ul");

const navLinks = nav.querySelectorAll("li");

function open() {
  nav.style.display = "flex";
  state.open = !state.open;
}

function close() {
  nav.style.display = "none";
  state.open = !state.open;
}

for (const navLink of navLinks) {
  navLink.addEventListener("click", close);
}

hamburger.addEventListener("click", () => {
  if (!state.open) open();
  else close();
});
