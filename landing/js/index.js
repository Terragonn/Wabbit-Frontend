const state = { open: false };

const hamburger = document.querySelector(".hamburger");
const navParent = document.querySelector(".nav");
const nav = navParent.querySelector("ul");

function open() {
    nav.style.display = "flex";
    state.open = !state.open;
}

function close() {
    nav.style.display = "none";
    state.open = !state.open;
}

hamburger.addEventListener("click", () => {
    if (!state.open) open();
    else close();
});
