/**
 * 30 Days JavaScript Challenge Website - Vanilla JS Functionality
 *
 * Implements:
 * 1. Hero Slider (Fade Animation)
 * 2. Sticky Navbar & Hamburger Menu
 * 3. Smooth Scrolling
 * 4. Form Validation (Name/Email)
 * 5. Scroll Reveal Animation
 * 6. Counter Animation (About Section)
 */

// Function to check for WebP support
function supportsWebP() {
  const elem = document.createElement("canvas");
  if (!!(elem.getContext && elem.getContext("2d"))) {
    // was able or not to get WebP representation
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  } else {
    // very old browser incapable of canvas
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Helper function for query selectors
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  if (supportsWebP()) {
    document.body.classList.add("webp-supported");
  }

  /* =========================================================
   * 1. Hero Slider Implementation
   * ========================================================= */
  const year = $("#year");
  const slides = $$(".slide");
  let currentSlide = 0;

  year.textContent = new Date().getFullYear();

  // --- NEW: Function to force Home link active ---
  const activateHomeLink = () => {
    const homeLink = $('#navbar a[href="#home"]');
    const linksForScrollSpy = $$("#navbar .nav-links a");

    if (homeLink) {
      // 1. Ensure no other link is active
      linksForScrollSpy.forEach((link) => link.classList.remove("active"));
      // 2. Force Home link active
      homeLink.classList.add("active");
    }
  };

  // Function to show a specific slide
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      // Remove the subtle text animation class from all slides
      slide.querySelector(".slide-content").style.opacity = "0";
      slide.querySelector(".slide-content").style.transform =
        "translateY(20px)";

      if (i === index) {
        slide.classList.add("active");
        // Re-apply the subtle text animation
        setTimeout(() => {
          slide.querySelector(".slide-content").style.opacity = "1";
          slide.querySelector(".slide-content").style.transform =
            "translateY(0)";
        }, 50); // Small delay to ensure CSS transition runs
      }
    });
  };
  // Function to move to the next slide
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  // Start the slider auto-play
  if (slides.length > 0) {
    showSlide(currentSlide); // Initial display

    // FIX: Also run activateHomeLink here for the first slide immediately
    activateHomeLink();

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  /* =========================================================
   * 2. Sticky Navbar & Hamburger Menu
   * ========================================================= */
  const navbar = $("#navbar");
  const hamburger = $("#hamburger");
  const navLinks = $(".nav-links");

  // Sticky Navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });

  // Hamburger menu toggle for mobile

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.querySelector("i").classList.toggle("fa-bars");
      hamburger.querySelector("i").classList.toggle("fa-times");
    });
  }

  // Close mobile menu when a link is clicked
  $$(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.querySelector("i").classList.add("fa-bars");
        hamburger.querySelector("i").classList.remove("fa-times");
      }
    });
  });

  /* =========================================================
   * 2b. Modal Handling (Replacing the static Join section)
   * ========================================================= */
  const joinModal = $("#joinModal");
  const closeBtn = $(".close-btn");

  // Function to open the modal
  const openModal = (e) => {
    // Prevent default action if it came from a link click
    if (e && e.preventDefault) e.preventDefault();
    joinModal.style.display = "flex"; // Use flex to easily center the content
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  // Function to close the modal
  const closeModal = () => {
    joinModal.style.display = "none";
    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  // 1. Open modal when any 'Join' link is clicked (e.g., in the navbar)
  $$('a[href="#join"]').forEach((link) => {
    link.addEventListener("click", openModal);
  });

  // 2. Close modal when the 'x' button is clicked
  closeBtn.addEventListener("click", closeModal);

  // 3. Close modal when user clicks anywhere outside of the modal content
  window.addEventListener("click", (e) => {
    if (e.target === joinModal) {
      closeModal();
    }
  });

  /* =========================================================
   * 3. Smooth Scrolling
   * ========================================================= */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#join") {
        openModal(e);
      } else {
        e.preventDefault();

        // Ensure mobile menu closes after click
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.querySelector("i").classList.add("fa-bars");
          hamburger.querySelector("i").classList.remove("fa-times");
        }

        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  //* =========================================================
  //  * 8. ScrollSpy / Active Link Tracking (FIXED LOGIC)
  //  * ========================================================= */

  const linksForScrollSpy = $$("#navbar .nav-links a");
  const sections = $$("main section");

  if (linksForScrollSpy.length > 0 && sections.length > 0) {
    const observerOptions = {
      root: null,
      // FIX 1: Adjust rootMargin to be less aggressive.
      // Use 50% for the bottom margin to ensure a section is dominant before switching.
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0.1, // Set a small threshold
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const targetId = entry.target.id;
        const correspondingLink = $(`#navbar a[href="#${targetId}"]`);

        if (correspondingLink) {
          if (entry.isIntersecting) {
            // FIX 2: If the current intersecting element is NOT the Hero Section,
            // then we proceed with the normal ScrollSpy removal and activation.
            if (targetId !== "#home") {
              // Remove active class from all links
              linksForScrollSpy.forEach((link) =>
                link.classList.remove("active")
              );

              // Add active class to the current link
              correspondingLink.classList.add("active");
            }
          }
        }
      });
    }, observerOptions);

    // Start observing every main section
    sections.forEach((section) => {
      if (section.id) {
        sectionObserver.observe(section);
      }
    });
  }

  /* --- FIX 3: Guaranteed Initial Home Link Activation --- */
  // This runs once after all setup is complete, ensuring the Home link is active
  // before the user can scroll, and the ScrollSpy logic only takes over AFTER.
  activateHomeLink();

  /* =========================================================
   * 4. Form Validation & Submission (Join Section)
   * ========================================================= */
  const joinForm = $("#joinForm");
  const formMessage = $("#formMessage");

  // --- NEW: Elements for Success/Error Popups and Loading Overlay ---
  const body = $("body");

  // Create the Success/Error Popup dynamically
  const createNotification = (message, type) => {
    let notification = $("#notificationPopup");
    if (!notification) {
      notification = document.createElement("div");
      notification.id = "notificationPopup";
      body.appendChild(notification);
    }

    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.opacity = "1";

    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
    }, 3000);
  };

  // Create the Loading Overlay dynamically
  const createLoadingScreen = (name) => {
    let loadingOverlay = $("#loadingOverlay");
    if (!loadingOverlay) {
      loadingOverlay = document.createElement("div");
      loadingOverlay.id = "loadingOverlay";
      loadingOverlay.innerHTML = `
                <div class="loader-content">
                    <div class="network-loader"></div>
                    <h2>Welcome, ${name}!</h2>
                    <p>Preparing your 30-Day Challenge Dashboard...</p>
                </div>
            `;
      body.appendChild(loadingOverlay);
    }
    loadingOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = $("#name");
    const emailInput = $("#email");
    let isValid = true;
    let userName = nameInput.value.trim();

    // Reset previous states
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    formMessage.classList.remove("show");

    if (nameInput.value.trim() === "") {
      nameInput.classList.add("error");
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      // 1. Close the sign-up modal
      closeModal(); // Assumes closeModal() function is defined (it is)

      // 2. Display the successful popup notification for 3 seconds
      createNotification("Login Successful!", "success");

      // 3. Show the custom loading screen
      createLoadingScreen(userName);

      // 4. Simulate the 7-second loading process
      setTimeout(() => {
        // In a real application, you would send data to the server here.

        // Simulate displaying details and redirecting to the dashboard page
        // We use local storage to pass the user's name
        localStorage.setItem("loggedInUser", userName);

        // Redirect to the dashboard page
        window.location.href = "public/dashboard.html";
      }, 3000); // 3 seconds (3000ms)
    } else {
      // If validation fails, display an error popup
      createNotification("Submission Failed. Check fields.", "error");
    }
  });

  /* =========================================================
   * 5. Scroll Reveal Animation (Custom Vanilla JS)
   * ========================================================= */
  const revealElements = $$(
    ".about-card, .learning-item, .section-subtitle, .section-title, .join-form"
  ); // Add more selectors here

  const checkReveal = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // Pixels from bottom of viewport

    revealElements.forEach((el) => {
      // Check if the element has already been animated by another system (e.g., AOS)
      if (el.dataset.aos) return;

      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("visible");
      } else {
        // Optional: remove visible class if user scrolls up past the element
        el.classList.remove("visible");
      }
    });
  };

  // Attach reveal to scroll and load events
  window.addEventListener("scroll", checkReveal);
  window.addEventListener("load", checkReveal);
  checkReveal(); // Initial check on load

  /* =========================================================
   * 6. Counter Animation (About Section)
   * ========================================================= */
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const duration = 2000; // 2 seconds
          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            const value = Math.floor(percentage * target);

            counter.textContent = value;

            if (progress < duration) {
              window.requestAnimationFrame(step);
            } else {
              counter.textContent = target; // Ensure final value is exact
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(counter); // Stop observing once animated
        }
      });
    },
    { threshold: 0.8 }
  ); // Trigger when 80% of the element is visible

  $$(".counter").forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* =========================================================
   * 7. Testimonial Slider Loop (CSS Keyframes approach is simpler,
   * but this JS approach ensures seamless duplication and loop control)
   * ========================================================= */
  const slider = $("#testimonialSlider");
  if (slider) {
    // Duplicate cards for seamless infinite scroll
    const cards = $$(".testimonial-card");
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      slider.appendChild(clone);
    });

    // The infinite loop is best achieved with CSS keyframes for performance.
    // The CSS includes the `scroll-loop` animation.
  }

  /* =========================================================
   * NEW: 9. Timed Welcome Pop-up Modal (After 5 Seconds)
   * ========================================================= */

  const welcomeModal = $("#welcomeModal");
  const welcomeCloseBtn = $(".welcome-close");
  const welcomeExploreBtn = $("#welcomeBtn");

  // We can use the existing `closeModal` function for the signup form

  // --- New Functions for Welcome Modal ---
  const openWelcomeModal = () => {
    if (welcomeModal) {
      welcomeModal.style.display = "flex"; // Show it
      document.body.style.overflow = "hidden"; // Lock scroll
    }
  };

  const closeWelcomeModal = () => {
    if (welcomeModal) {
      welcomeModal.style.display = "none"; // Hide it
      document.body.style.overflow = "auto"; // Unlock scroll
    }
  };

  // 1. Close button event listener
  if (welcomeCloseBtn) {
    welcomeCloseBtn.addEventListener("click", closeWelcomeModal);
  }

  // 2. Explore button event listener (closes and scrolls)
  if (welcomeExploreBtn) {
    welcomeExploreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeWelcomeModal();

      // Smooth scroll to the projects section
      const targetElement = document.querySelector(
        e.target.getAttribute("href")
      );
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 3. Close when user clicks outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === welcomeModal) {
      closeWelcomeModal();
    }
  });

  // 4. The core logic to delay the popup (5 seconds)
  setTimeout(() => {
    // Only show if the modal is currently hidden
    if (welcomeModal && welcomeModal.style.display !== "flex") {
      openWelcomeModal();
    }
  }, 5000); // 5000 milliseconds = 5 seconds
});
