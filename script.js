/* =========================
   SLIDER LOGIC (UNCHANGED)
========================= */
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const formBox = document.querySelector(".form-box");

loginBtn.addEventListener("click", () => {
  formBox.classList.remove("show-register");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  formBox.classList.add("show-register");
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
});