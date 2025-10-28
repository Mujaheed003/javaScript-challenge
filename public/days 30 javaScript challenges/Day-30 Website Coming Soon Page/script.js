// Set target date
const countDown = new Date("November 24, 2030 00:00:00").getTime();

// Update countdown every second
const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDown - now;

  // Time calculation
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Convert days to months and years
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  // Display results
  document.getElementById("years").innerHTML = years;
  document.getElementById("months").innerHTML = months;
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Plural helper
  function plural(value, word) {
    return value <= 1 ? word : word + "s";
  }

  document.querySelector("#yrs").textContent = plural(years, "Year");
  document.querySelector("#mons").textContent = plural(months, "Month");
  document.querySelector("#dys").textContent = plural(days, "Day");
  document.querySelector("#hrs").textContent = plural(hours, "Hour");
  document.querySelector("#mins").textContent = plural(minutes, "Minute");
  document.querySelector("#secs").textContent = plural(seconds, "Second");

  // When countdown ends
  if (distance < 0) {
    clearInterval(x);
    document.querySelector("h2").innerHTML =
      "Countdown <span>Completed!</span>";
    document.querySelector(".launching-time").style.display = "none";
    document.querySelector(".subtitle").style.display = "none";
  }
}, 1000);
