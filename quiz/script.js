const quizData = [
  {
    question: "1) Number of primitive data types in java are ?",
    options: ["7", "8", "3", "10"],
    answer: "7",
  },
  {
    question:
      "2) Automatic type conversion is possible in which of the possible cases?",
    options: ["byte to int", "int to long", "long to int", "short to int"],
    answer: "int to long",
  },
  {
    question: "3) Which of the following is not an OOPS concept in Java?",
    options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
    answer: "Compilation",
  },
  {
    question: "4) What is the extension of compiled java classes?",
    options: [".txt", ".java", ".class", ".js"],
    answer: ".class",
  },
  {
    question: "5) Which of these are selection statements in Java?",
    options: ["break", "continue", "for()", "if()"],
    answer: "if()",
  },
  {
    question: "6) Which of these keywords is used to define interfaces in Java?",
    options: ["intf", "Intf", "Interface", "interface"],
    answer: "interface",
  },
  {
    question: "7) Which of the following is a superclass of every class in Java?",
    options: ["arraylist", "abstract class", "object class", "string"],
    answer: "object class",
  },
  {
    question:
      "8) Which of these packages contains the exception Stack Overflow in Java?",
    options: ["java.io", "java.system", "java.util", "java.lang"],
    answer: "java.lang",
  },
  {
    question:
      "9) Which of these keywords are used for the block to be examined for exceptions?",
    options: ["check", "throw", "catch", "try"],
    answer: "try",
  },
  {
    question: "10) Which one of the following is not an access modifier?",
    options: ["protected", "void", "private", "public"],
    answer: "void",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You Scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
    <p> 
    <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
    <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
    <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
    </p>
    `;
  }
  resultContainer.innerHTML = `
  <p>You Scored ${score} out of ${quizData.length}!</p>
  <p>Incorrect Answers:</p>
  ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
