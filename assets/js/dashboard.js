// ===== Display Logged-In User's Name on Dashboard =====
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll(".nav-link-item");
  const userNameDisplay = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");
  const counters = document.querySelectorAll(".counter");
  const speed = 500;

  year.innerHTML = new Date().getFullYear();

  // --- Show Logged-in Username ---
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (userNameDisplay) {
    userNameDisplay.textContent = loggedInUser || "Guest";
  }

  // --- Highlight active link on click ---
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // --- Highlight current page on load ---
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // --- Hamburger Toggle for Mobile ---
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // --- Logout Button ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      const statusMsg = document.createElement("div");
      statusMsg.textContent = "You have been logged out (simulated).";
      statusMsg.style.cssText =
        "position:fixed; top:20px; right:20px; background:green; color:white; padding:10px; border-radius:5px; z-index:1500;";
      document.body.appendChild(statusMsg);
      setTimeout(() => {
        statusMsg.remove();
        window.location.href = "../index.html";
      }, 3000);
    });
  }

  // --- Counter Animation ---
  const animateCounters = () => {
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  animateCounters();
});

// Highlight the active link based on current page
const currentPage = window.location.pathname.split("/").pop(); // e.g., "dashboard.html"
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
