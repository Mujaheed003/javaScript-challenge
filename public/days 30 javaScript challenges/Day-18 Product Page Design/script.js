const productImg = document.querySelector("#productImg");
const btns = document.querySelectorAll(".btn");
const addToCartBtn = document.querySelector("#addToCart");
const cartCount = document.querySelector("#cartCount");
const form = document.querySelector("#orderForm");
const alertBox = document.querySelector("#alertBox");

let cart = 0;

// Image switcher
btns.forEach((button, index) => {
  button.addEventListener("click", function () {
    productImg.style.opacity = 0;
    setTimeout(() => {
      productImg.src = `img/img${index + 1}.jpg`;
      productImg.style.opacity = 1;
    }, 300);

    btns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// Add to Cart functionality
addToCartBtn.addEventListener("click", () => {
  cart++;
  cartCount.textContent = cart;
  addToCartBtn.textContent = "Added!";
  addToCartBtn.style.background = "#28a745";

  // Custom popup alert
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 15000); // 15 seconds

  setTimeout(() => {
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.style.background = "#6f42c1";
  }, 1000);
});

// Prevent form reload on "Buy Now"
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alertBox.textContent = "🛍️ Thank you for your purchase!";
  alertBox.style.background = "#ff4081";
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.style.background = "#28a745";
    alertBox.textContent = "✅ Item added to cart successfully!";
  }, 10000);
});
