const questions = [
  {
    question: "Who is the current President of Nigeria as of October 2025?",
    answers: [
      { text: "Atiku Abubakar", correct: false },
      { text: "Bola Ahmed Tinubu", correct: true },
      { text: "Peter Obi", correct: false },
      { text: "Muhammadu Buhari", correct: false },
    ],
  },
  {
    question:
      "Which Nigerian city recently hosted the National Economic Summit in October 2025?",
    answers: [
      { text: "Abuja", correct: true },
      { text: "Lagos", correct: false },
      { text: "Port Harcourt", correct: false },
      { text: "Kano", correct: false },
    ],
  },
  {
    question:
      "What major partnership is Nigeria considering to revive the Ajaokuta Steel Plant?",
    answers: [
      { text: "With Russia", correct: false },
      { text: "With China", correct: true },
      { text: "With Germany", correct: false },
      { text: "With South Africa", correct: false },
    ],
  },
  {
    question:
      " Which Nigerian activist was recently granted posthumous clemency by President Tinubu?",
    answers: [
      { text: "Gani Fawehinmi", correct: false },
      { text: "Ken Saro-Wiwa", correct: true },
      { text: "Fela Kuti", correct: false },
      { text: "Dele Giwa", correct: false },
    ],
  },
  {
    question:
      "What global event did Nigeria mark on October 16, 2025, with calls for food regulation?",
    answers: [
      { text: "World Health Day", correct: false },
      { text: "World Food Day", correct: true },
      { text: "Earth Day", correct: false },
      { text: "Global Nutrition Week", correct: false },
    ],
  },
  {
    question:
      "Which terrorist groups were mentioned in recent discussions about insecurity in Nigeria?",
    answers: [
      { text: "Al-Shabaab and Boko Haram", correct: false },
      { text: "Boko Haram and ISIS", correct: true },
      { text: "ISWAP and Taliban", correct: false },
      { text: "ISIS and Al-Qaeda", correct: false },
    ],
  },
  {
    question:
      "Which country did President Tinubu recently send condolences to over the death of a prominent leader?",
    answers: [
      { text: "Ghana", correct: false },
      { text: "Kenya", correct: true },
      { text: "South Africa", correct: false },
      { text: "Ethiopia", correct: false },
    ],
  },
  {
    question:
      "Which Nigerian state is currently facing renewed calls for environmental justice due to oil pollution?",
    answers: [
      { text: "Delta", correct: false },
      { text: "Rivers", correct: false },
      { text: "Bayelsa", correct: true },
      { text: "Ogun", correct: false },
    ],
  },
  {
    question:
      "What is the name of the adviser to U.S. President Trump who commented on Nigeria’s religious conflict?",
    answers: [
      { text: "Jared Kushner ", correct: false },
      { text: "Massad Boulos", correct: true },
      { text: "Mike Pompeo", correct: false },
      { text: "John Bolton", correct: false },
    ],
  },
  {
    question:
      "Which Nigerian media outlet published the top headlines on October 18, 2025?",
    answers: [
      { text: "Vanguard", correct: false },
      { text: "Punch", correct: false },
      { text: "Naija News", correct: true },
      { text: "The Guardian", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  updateProgress();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  updateProgress();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `🎉 You scored <b>${score}</b> out of <b>${questions.length}</b>!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  progressBar.style.width = "100%";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function updateProgress() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

// Next button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// 🔥 Enter key support
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && nextButton.style.display === "block") {
    nextButton.click();
  }
});

startQuiz();
