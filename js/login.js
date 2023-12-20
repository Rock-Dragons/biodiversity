const actualPage = "login";

// get DOM elements
const singInBtnLink = document.querySelector(".singInBtn-link");
const singUpBtnLink = document.querySelector(".singUpBtn-link");
const wrapper = document.querySelector(".wrapper");
const names = document.querySelectorAll(".name input");
const passwords = document.querySelectorAll(".password input");
const btns = document.querySelectorAll(".submitBtn");


// toggle 'active' class on wrapper when signUp || signIn buttons are clicked
singUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

singInBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

// check name input lengths on form 
names.forEach((input) => {
  const form = input.closest("form");
  form.addEventListener("submit", () => {
    if (input.value.length < 3) {
      alert("Name can't be less than 3 characters");
    }
  });
});

//check password input lengths on form
passwords.forEach((input) => {
  const form = input.closest("form");
  form.addEventListener("submit", () => {
    if (input.value.length <= 5) {
      alert("Password must be longer than 5 charachters");
    }
  });
});

// add avent on button click within forms
btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const form = btn.closest("form");
    const nameInput = form.querySelector(".name input");
    const passwordInput = form.querySelector(".password input");

    // check name and password lengths before allowing access -> display welcome message and reload the page
    if (nameInput.value.length >= 3 && passwordInput.value.length >= 6) {
      alert(
        "Welcome to our biodiversity support group! Together, we aim to protect and celebrate the richness of our planet's ecosystems."
      );
      window.location.reload()

    }
  })
);