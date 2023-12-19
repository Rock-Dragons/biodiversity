const actualPage = "login";

const singInBtnLink = document.querySelector(".singInBtn-link");
const singUpBtnLink = document.querySelector(".singUpBtn-link");
const wrapper = document.querySelector(".wrapper");
const names = document.querySelectorAll(".name input");
const passwords = document.querySelectorAll(".password input");
const btns = document.querySelectorAll(".submitBtn");

singUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

singInBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

names.forEach((input) => {
  const form = input.closest("form");
  form.addEventListener("submit", () => {
    if (input.value.length < 3) {
      alert("Name can't be less than 3 characters");
    }
  });
});

passwords.forEach((input) => {
  const form = input.closest("form");
  form.addEventListener("submit", () => {
    if (input.value.length <= 5) {
      alert("Password must be longer than 5 charachters");
    }
  });
});

btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const form = btn.closest("form");
    const nameInput = form.querySelector(".name input");
    const passwordInput = form.querySelector(".password input");

    if (nameInput.value.length >= 3 && passwordInput.value.length >= 6) {

      alert(
        "Welcome to our biodiversity support group! Together, we aim to protect and celebrate the richness of our planet's ecosystems."
      );
      window.location.reload()

    }
  })
);