var usersData = [];
var currentUser;
var login = document.getElementById("loginBtn");
var reg = document.getElementById("registerBtn");
var loginForm = document.getElementById("loginForm");
var regForm = document.getElementById("registerForm");

// ===== LOGIN FORM =====
var loginEmail = document.getElementById("loginEmail");
var emailSpan = document.getElementById("emailSpan");

var loginPassword = document.getElementById("loginPassword");
var passSpan = document.getElementById("passSpan");

// ===== REGISTER FORM =====
var regName = document.getElementById("regName");
var nameSpan = document.getElementById("nameSpan");

var regEmail = document.getElementById("regEmail");
var rEmailSpan = document.getElementById("rEmailSpan");

var regPassword = document.getElementById("regPassword");
var rPassSpan = document.getElementById("rPassSpan");

var regConfirm = document.getElementById("regConfirm");
var rPassConfirmSpan = document.getElementById("rPassConfirmSpan");

// ===== FORMS (اختياري لو محتاجهم) =====
var loginForm = document.getElementById("loginForm");
var loginSpan = document.getElementById("loginSpan");

var registerForm = document.getElementById("registerForm");

var loginSubmit = document.getElementById("loginSubmit");
var regSubmit = document.getElementById("regSubmit");

function validateRegName() {
  var reg = /^[^\d]+$/;

  if (regName.value === "") {
    regName.style.borderColor = "red";

    nameSpan.textContent = "this field is required";
  } else if (!reg.test(regName.value)) {
    regName.style.borderColor = "red";

    nameSpan.textContent = "this field must contain only chars";
  } else {
    regName.style.borderColor = "";

    nameSpan.textContent = "";
  }
}
regName.addEventListener("input", validateRegName);

function validateLoginEmail() {
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (loginEmail.value === "") {
    loginEmail.style.borderColor = "red";

    emailSpan.textContent = "This field is required";
  } else if (!emailRegex.test(loginEmail.value)) {
    loginEmail.style.borderColor = "red";

    emailSpan.textContent = "This is not matched email format";
  } else {
    loginEmail.style.borderColor = "";

    emailSpan.textContent = "";
  }
}

loginEmail.addEventListener("input", validateLoginEmail);

function validateRegEmail() {
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (regEmail.value === "") {
    regEmail.style.borderColor = "red";

    rEmailSpan.textContent = "This field is required";
  } else if (!emailRegex.test(regEmail.value)) {
    regEmail.style.borderColor = "red";

    rEmailSpan.textContent = "This is not matched email format";
  } else {
    regEmail.style.borderColor = "";

    rEmailSpan.textContent = "";
  }
}

regEmail.addEventListener("input", validateRegEmail);

function validateLoginPassword() {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (loginPassword.value === "") {
    loginPassword.style.borderColor = "red";

    passSpan.textContent = "This field is required";
  } else if (!passwordRegex.test(loginPassword.value)) {
    loginPassword.style.borderColor = "red";

    passSpan.textContent =
      "Password must be 8+ chars, include A-Z, a-z, number";
  } else {
    loginPassword.style.borderColor = "";

    passSpan.textContent = "";
  }
}

loginPassword.addEventListener("input", validateLoginPassword);

function validateRegPassword() {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regPassword.value === "") {
    regPassword.style.borderColor = "red";
    rPassSpan.textContent = "This field is required";
  } else if (!passwordRegex.test(regPassword.value)) {
    regPassword.style.borderColor = "red";

    rPassSpan.textContent =
      "Password must be 8+ chars, include A-Z, a-z, number";
  } else {
    regPassword.style.borderColor = "";

    rPassSpan.textContent = "";
  }

  // re-check confirm password
  if (regConfirm.value === regPassword.value && regConfirm.value !== "") {
    rPassConfirmSpan.textContent = "";
  }
}

regPassword.addEventListener("input", validateRegPassword);

function validateConfirmPassword() {
  if (regConfirm.value === "") {
    regConfirm.style.borderColor = "red";

    rPassConfirmSpan.textContent = "This field is required";
  } else if (regConfirm.value !== regPassword.value) {
    regConfirm.style.borderColor = "red";

    rPassConfirmSpan.textContent = "Doesn't match with password";
  } else {
    regConfirm.style.borderColor = "";
    rPassConfirmSpan.textContent = "";
  }
}
regConfirm.addEventListener("input", validateConfirmPassword);
if (localStorage.getItem("userData")) {
  usersData = JSON.parse(localStorage.getItem("userData"));
}
function foundUser(e, p) {
  console.log(usersData.length);

  for (i = 0; i < usersData.length; i++) {
    if (usersData[i].userEmail == e && usersData[i].userPassword == p) {
      return i;
    }
  }
  return -1;
}
// sessionStorage.clear();
// localStorage.clear();
loginForm.addEventListener("submit", function (e) {
  validateLoginEmail();
  validateLoginPassword();
  e.preventDefault();
  var userID = foundUser(loginEmail.value, loginPassword.value);

  if (
    passSpan.textContent === "" &&
    emailSpan.textContent === "" &&
    userID != -1
  ) {
    if (usersData[userID].isTry === "false") {
      console.log(passSpan.textContent, emailSpan.textContent);

      currentUser = usersData[userID];
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      usersData[userID].isTry = "true";
      localStorage.setItem("userData", JSON.stringify(usersData));
      loginSpan.textContent = "";
      window.location.replace("home.html");
    } else {
      loginSpan.textContent = "You have only one try.";
    }
  } else {
    e.preventDefault();
    loginSpan.textContent = "Invalid email or password.";
  }
});

regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateRegPassword();
  validateRegEmail();
  validateConfirmPassword();
  validateRegName();
  if (
    rPassConfirmSpan.textContent === "" &&
    nameSpan.textContent === "" &&
    rPassSpan.textContent === "" &&
    rEmailSpan.textContent === ""
  ) {
    usersData.push({
      userName: regName.value,
      userEmail: regEmail.value,
      userPassword: regPassword.value,
      isTry: "false",
    });
    var toast = document.getElementById("toast");
    toast.classList.add("opacity-100");
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      e.target.submit();
    }, 1000);

    localStorage.setItem("userData", JSON.stringify(usersData));
  } else {
    e.preventDefault();
  }
});

function f() {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginForm.style.display = "flex";
  regForm.style.display = "none";
  loginForm.style.justifyContent = "center";
  login.style.color = "white";
  login.style.background =
    " linear-gradient(135deg, #1f2fbf, #3b5bfd, #6f86ff)";
  reg.style.color = "black";
  reg.style.background = "#e0e0e0";
}
login.addEventListener("click", function () {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginForm.style.display = "flex";
  regForm.style.display = "none";
  loginForm.style.justifyContent = "center";
  login.style.color = "white";
  login.style.background =
    " linear-gradient(135deg, #1f2fbf, #3b5bfd, #6f86ff)";
  reg.style.color = "black";
  reg.style.background = "#e0e0e0";
});

reg.addEventListener("click", function () {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regForm.style.display = "flex";
  loginForm.style.display = "none";
  regForm.style.justifyContent = "center";

  reg.style.color = "white";
  reg.style.background = " linear-gradient(135deg, #1f2fbf, #3b5bfd, #6f86ff)";

  login.style.color = "black";
  login.style.background = "#e0e0e0";
});
