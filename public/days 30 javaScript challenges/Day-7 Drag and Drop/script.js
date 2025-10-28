const lists = document.querySelectorAll(".list");
const rightBox = document.querySelector("#right");
const leftBox = document.querySelector("#left");

// ===== MOUSE DRAG & DROP =====
lists.forEach((list) => {
  list.addEventListener("dragstart", (e) => {
    let selected = e.target;

    rightBox.addEventListener("dragover", (e) => e.preventDefault());
    rightBox.addEventListener("drop", () => {
      rightBox.appendChild(selected);
      selected = null;
    });

    leftBox.addEventListener("dragover", (e) => e.preventDefault());
    leftBox.addEventListener("drop", () => {
      leftBox.appendChild(selected);
      selected = null;
    });
  });
});

// ===== TOUCH DRAG & DROP =====
lists.forEach((item) => {
  item.addEventListener("touchstart", handleTouchStart);
});

function handleTouchStart(e) {
  const item = e.target.closest(".list");
  if (!item) return;

  const touch = e.touches[0];
  const offsetX = touch.clientX - item.getBoundingClientRect().left;
  const offsetY = touch.clientY - item.getBoundingClientRect().top;

  const ghost = item.cloneNode(true);
  ghost.style.position = "fixed";
  ghost.style.left = `${touch.clientX - offsetX}px`;
  ghost.style.top = `${touch.clientY - offsetY}px`;
  ghost.style.width = `${item.offsetWidth}px`;
  ghost.style.pointerEvents = "none";
  ghost.style.opacity = "0.7";
  ghost.style.zIndex = "999";
  document.body.appendChild(ghost);

  const move = (moveEvent) => {
    const touchMove = moveEvent.touches[0];
    ghost.style.left = `${touchMove.clientX - offsetX}px`;
    ghost.style.top = `${touchMove.clientY - offsetY}px`;
  };

  const end = (endEvent) => {
    const touchEnd = endEvent.changedTouches[0];
    const target = document.elementFromPoint(
      touchEnd.clientX,
      touchEnd.clientY
    );

    if (target && (target.id === "right" || target.id === "left")) {
      target.appendChild(item);
    }

    ghost.remove();
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", end);
  };

  document.addEventListener("touchmove", move);
  document.addEventListener("touchend", end);
}
