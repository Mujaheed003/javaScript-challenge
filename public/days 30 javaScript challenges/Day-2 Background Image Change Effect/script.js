const imgBox = document.querySelector(".img-box");
const imgWrap = document.querySelector(".img-wrap");
const line = document.getElementById("line");

let isDragging = false;

// Function to update slider position
function moveSlider(x) {
  const rect = imgBox.getBoundingClientRect();
  let position = x - rect.left;

  // Boundaries
  if (position < 0) position = 0;
  if (position > rect.width) position = rect.width;

  imgWrap.style.width = position + "px";
  line.style.left = position + "px";
}

// Mouse events
line.addEventListener("mousedown", () => (isDragging = true));
window.addEventListener("mouseup", () => (isDragging = false));
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  moveSlider(e.clientX);
});

// Touch events for mobile/tablet
line.addEventListener("touchstart", () => (isDragging = true));
window.addEventListener("touchend", () => (isDragging = false));
window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  moveSlider(e.touches[0].clientX);
});
