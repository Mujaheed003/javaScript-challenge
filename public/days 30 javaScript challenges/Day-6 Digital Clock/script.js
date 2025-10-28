const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

setInterval(() => {
  const currenTime = new Date();

  hours.textContent =
    (currenTime.getHours() < 10 ? "0" : "") + currenTime.getHours();
  minutes.textContent =
    (currenTime.getMinutes() < 10 ? "0" : "") + currenTime.getMinutes();
  seconds.textContent =
    (currenTime.getSeconds() < 10 ? "0" : "") + currenTime.getSeconds();
}, 1000);
