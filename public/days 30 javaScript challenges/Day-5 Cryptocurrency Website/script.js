// Mobile menu toggle
const menuIcon = document.querySelector(".menu-toggle i");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuIcon.classList.toggle("fa-xmark");
});

// Close the menu when a link is clicked
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

// Crypto API integration
const btc = document.querySelector("#bitcoin");
const bnb = document.querySelector("#binance");
const ada = document.querySelector("#cardano");
const dog = document.querySelector("#dogecoin");
const eth = document.querySelector("#ethereum");
const ltc = document.querySelector("#litecoin");
const dot = document.querySelector("#polkadot");
const xrp = document.querySelector("#ripple");
const shib = document.querySelector("#shiba");
const sol = document.querySelector("#solana");

const settings = {
  async: true,
  crossDomain: true,
  url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Cbinancecoin%2Csolana%2Ccardano%2Cripple%2Clitecoin%2Cpolkadot%2Cshiba-inu&vs_currencies=usd",
  method: "GET",
  headers: {},
};

$.ajax(settings).done(function (response) {
  btc.innerHTML = response.bitcoin.usd;
  eth.innerHTML = response.ethereum.usd;
  dog.innerHTML = response.dogecoin.usd;
  bnb.innerHTML = response.binancecoin.usd;
  sol.innerHTML = response.solana.usd;
  ada.innerHTML = response.cardano.usd;
  xrp.innerHTML = response.ripple.usd;
  ltc.innerHTML = response.litecoin.usd;
  dot.innerHTML = response.polkadot.usd;
  shib.innerHTML = response["shiba-inu"].usd;
});
