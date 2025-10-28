const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
navLinks.classList.toggle('show');
toggle.textContent = toggle.textContent === '☰' ? '✖' : '☰';
});


var themeIcon = document.getElementById("theme-icon");
var logo = document.getElementById("logo")

themeIcon.onclick = function() {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.src = "img/sun.png";
        logo.src = "img/dark-logo.png";
    }
    else {
        themeIcon.src = "img/moon.png";
        logo.src = "img/light-logo.png";
    }
}