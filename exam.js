if (!JSON.parse(sessionStorage.getItem("currentUser"))) {
  window.location.href = "index.html";
}
history.pushState(null, null, location.href);
window.addEventListener("popstate", () => history.go(1));
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

  new Question(
    "Which programming language is primarily used for web development?",
    [
      new Answer("Python", false),
      new Answer("Java", false),
      new Answer("JavaScript", true),
      new Answer("C++", false),
    ]
  ),

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

  new Question(
    "Which JavaScript statement is used to make decisions in code?",
    [
      new Answer("if statement", true),
      new Answer("for loop", false),
      new Answer("function", false),
      new Answer("switch", false),
    ]
  ),

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

  new Question(
    "Which operator compares two values for equality in JavaScript?",
    [
      new Answer("==", true),
      new Answer("=", false),
      new Answer("+", false),
      new Answer("!=", false),
    ]
  ),

  new Question("Which loop repeats a block of code a fixed number of times?", [
    new Answer("for loop", true),
    new Answer("while loop", false),
    new Answer("if statement", false),
    new Answer("switch", false),
  ]),
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
  var nxtb = document.getElementById("nextBtn");
  var prevBtn = document.getElementById("prevBtn");

  if (currentIndex + 1 == 10) {
    nxtb.style.cursor = "default";
    nxtb.style.opacity = ".5";
  } else if (currentIndex + 1 == 1) {
    prevBtn.style.opacity = ".5";
    prevBtn.style.cursor = "default";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
    nxtb.style.cursor = "pointer";
    nxtb.style.opacity = "1";
  }

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
document.getElementById("btn-success").onclick = submitExam;
function submitExam() {
  let score = 0;
  questions.forEach((q) => {
    if (q.answers[q.selected]?.isCorrect) score++;
  });

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  sessionStorage.removeItem("currentUser");

  const progressValue = (score / questions.length) * 100;

  const dv = document.createElement("div");
  dv.className = "max-w-md mx-auto";

  dv.style.backgroundColor = "white";
  dv.style.padding = "42px";
  dv.style.borderRadius = "18px";
  dv.style.marginTop = "40px";
  dv.style.boxShadow = "0 0px 10px rgba(0,0,0,0.3)"; // Shadow قوي

  dv.innerHTML = `
    <div class="text-center space-y-4">
      <div class="radial-progress text-primary mx-auto" 
           style="--value:${progressValue}">
           ${Math.round(progressValue)}%
      </div>

      <h1 class="text-3xl font-extrabold text-gray-800 mt-2">🎓 Exam Completed</h1>

      <div class=" p-3 rounded-lg shadow-sm">
        <p class="text-lg font-semibold text-gray-700">${
          currentUser.userName
        }</p>
       

      <p class="text-xl text-gray-800 font-medium">
        Your score is <span class="font-bold text-primary">${score}</span> / ${
    questions.length
  }
      </p>

      <p class="text-gray-500 text-sm">
        Keep going! You're improving step by step 🚀
      </p>

 
    </div>
  `;

  document.body.innerHTML = "";
  document.body.appendChild(dv);
}

// ===== TIMER =====
setInterval(() => {
  if (timeLeft > 0) timeLeft--;
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById("timer").textContent = `${min}:${sec
    .toString()
    .padStart(2, "0")}`;
  /*
  if (timeLeft <= 0) {
    document.body.innerHTML = `
      <div style="color:white;text-align:center">
        <h1>Time Out</h1>
        <p>Sorry ${studentName}, time is over.</p>
      </div>
    `;
  }*/
}, 1000);

// INIT
renderQuestion();

var total_time = 600;
var step = 100 / total_time;
var bar = document.getElementById("bar");
var w = 0;
setInterval(function () {
  console.log(w);
  if (w > 100) {
    submitExam();
  }
  if (w >= 80) {
    bar.style.backgroundColor = "red";
  }
  if (w >= 70 && w < 80) {
    bar.style.backgroundColor = "rgb(237, 237, 1)";
  }
  w += step;

  bar.style.setProperty("width", `${w}%`);
}, 1000);
