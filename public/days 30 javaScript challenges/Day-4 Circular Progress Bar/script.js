function animateProgress(id, circleClass, percent, duration = 2000) {
  const number = document.getElementById(id);
  const circle = document.querySelector(`.${circleClass}`);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  let current = 0;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = percent / steps;

  const interval = setInterval(() => {
    current += increment;
    if (current >= percent) {
      current = percent;
      clearInterval(interval);
    }

    number.textContent = Math.round(current) + "%";
    const offset = circumference - (current / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }, stepTime);
}

// Run animations for each bar
animateProgress("num1", "circle1", 100);
animateProgress("num2", "circle2", 75);
animateProgress("num3", "circle3", 50);
