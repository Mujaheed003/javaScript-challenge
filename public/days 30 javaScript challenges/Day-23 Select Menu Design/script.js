const selectorField = document.querySelector("#selectorField");
const selectText = document.querySelector("#selectText");
const options = document.querySelectorAll(".options");
const list = document.querySelector("#list");
const arrowIcon = document.querySelector("#arrowIcon");

selectorField.addEventListener("click", () => {
  list.classList.toggle("hide");
  arrowIcon.classList.toggle("rotate");
});

// Close and set text when an option is selected
options.forEach((option) => {
  option.addEventListener("click", function () {
    selectText.textContent = this.querySelector("p").textContent;
    list.classList.add("hide");
    arrowIcon.classList.remove("rotate");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!selectorField.contains(e.target) && !list.contains(e.target)) {
    list.classList.add("hide");
    arrowIcon.classList.remove("rotate");
  }
});
