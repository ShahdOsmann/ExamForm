// ===== STUDENT NAME =====
const studentName = localStorage.getItem("studentName") || "Student";

// ===== OBJECTS =====
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
    this.selected = null;
    this.marked = false;
  }
}

class Answer {
  constructor(text, isCorrect) {
    this.text = text;
    this.isCorrect = isCorrect;
  }
}

// ===== QUESTIONS =====
let questions = [
  new Question("Which language is mainly used to style web pages?", [
    new Answer("HTML", false),
    new Answer("CSS", true),
    new Answer("JavaScript", false),
    new Answer("Python", false),
  ]),

  new Question("Which programming language is primarily used for web development?", [
    new Answer("Python", false),
    new Answer("Java", false),
    new Answer("JavaScript", true),
    new Answer("C++", false),
  ]),

  new Question("Which keyword declares a variable in JavaScript?", [
    new Answer("var", true),
    new Answer("int", false),
    new Answer("define", false),
    new Answer("letvar", false),
  ]),

  new Question("What does HTML stand for?", [
    new Answer("Hyper Text Markup Language", true),
    new Answer("High Text Machine Language", false),
    new Answer("Home Tool Markup Language", false),
    new Answer("Hyperlinks Text Mark Language", false),
  ]),

  new Question("Which JavaScript statement is used to make decisions in code?", [
    new Answer("if statement", true),
    new Answer("for loop", false),
    new Answer("function", false),
    new Answer("switch", false),
  ]),

  new Question("Which attribute gives an element a unique identifier?", [
    new Answer("id", true),
    new Answer("class", false),
    new Answer("name", false),
    new Answer("style", false),
  ]),

  new Question("Which function prints messages to the browser console?", [
    new Answer("console.log()", true),
    new Answer("print()", false),
    new Answer("alert()", false),
    new Answer("write()", false),
  ]),

  new Question("Which data type stores true or false values?", [
    new Answer("Boolean", true),
    new Answer("String", false),
    new Answer("Number", false),
    new Answer("Object", false),
  ]),

  new Question("Which operator compares two values for equality in JavaScript?", [
    new Answer("==", true),
    new Answer("=", false),
    new Answer("+", false),
    new Answer("!=", false),
  ]),

  new Question("Which loop repeats a block of code a fixed number of times?", [
    new Answer("for loop", true),
    new Answer("while loop", false),
    new Answer("if statement", false),
    new Answer("switch", false),
  ])
];


// RANDOMIZE
questions.sort(() => Math.random() - 0.5);

// ===== STATE =====
let currentIndex = 0;
let timeLeft = 600;

// ===== ELEMENTS =====
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const indicator = document.getElementById("questionIndicator");
const markedList = document.getElementById("markedList");
const markBtn = document.getElementById("markBtn");

// ===== RENDER =====
function renderQuestion() {
  const q = questions[currentIndex];
  indicator.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionText.textContent = q.text;
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" ${q.selected === i ? "checked" : ""}>
      ${ans.text}
    `;
    label.querySelector("input").addEventListener("change", () => {
      q.selected = i;
    });
    answersDiv.appendChild(label);
  });

  updateMarkButton();
}

// ===== MARK / UNMARK =====
markBtn.onclick = () => {
  questions[currentIndex].marked = !questions[currentIndex].marked;
  updateMarkedList();
  updateMarkButton();
};

function updateMarkButton() {
  markBtn.textContent = questions[currentIndex].marked ? "Unmark" : "Mark";
}

function updateMarkedList() {
  markedList.innerHTML = "";
  questions.forEach((q, i) => {
    if (q.marked) {
      const li = document.createElement("li");
      li.textContent = `Question ${i + 1}`;
      li.onclick = () => {
        currentIndex = i;
        renderQuestion();
      };
      markedList.appendChild(li);
    }
  });
}

// ===== NAVIGATION =====
document.getElementById("nextBtn").onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
};

// ===== SUBMIT =====
document.getElementById("submitBtn").onclick = submitExam;

function submitExam() {
  let score = 0;
  questions.forEach(q => {
    if (q.answers[q.selected]?.isCorrect) score++;
  });

  document.body.innerHTML = `
    <div style="color:white;text-align:center">
      <h1>Exam Submitted</h1>
      <p>${studentName}, your score is ${score} / ${questions.length}</p>
    </div>
  `;
}

// ===== TIMER =====
setInterval(() => {
  timeLeft--;
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${min}:${sec.toString().padStart(2, "0")}`;

  if (timeLeft <= 0) {
    document.body.innerHTML = `
      <div style="color:white;text-align:center">
        <h1>Time Out</h1>
        <p>Sorry ${studentName}, time is over.</p>
      </div>
    `;
  }
}, 1000);

// INIT
renderQuestion();
