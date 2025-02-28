// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const formulaire = document.getElementById("form");
  const champs = formulaire.querySelectorAll("input, textarea, button");
  modal.style.display = "flex";
  if (champs.length > 0) {
    champs[0].focus();
  }
}
// eslint-disable-next-line no-unused-vars
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const regexOnlyLetter =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const form = document.getElementById("form");
const headerTitle = document.getElementById("header_title");
const confirmation = document.getElementsByClassName("confirmation_content");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const fieldsValidation = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

function validateField(field, message, condition) {
  const fieldId = field.id;
  const errorContainer = field.parentElement.querySelector(".errorMsg");
  if (condition()) {
    errorContainer.innerHTML = message;
    fieldsValidation[fieldId] = false;
  } else {
    errorContainer.innerHTML = "";
    fieldsValidation[fieldId] = true;
  }
}

/* Verify firstname */
firstName.addEventListener("input", (event) => {
  validateField(event.target, "Veuillez renseigner un prénom valide", () => {
    return regexOnlyLetter.test(firstName.value) === false;
  });
});

/* Verify lastname */
lastName.addEventListener("input", (event) => {
  validateField(event.target, "Veuillez renseigner un nom valide", () => {
    return regexOnlyLetter.test(lastName.value) === false;
  });
});

/* Verify email */
email.addEventListener("input", (event) => {
  validateField(event.target, "Veuillez renseigner un email valide", () => {
    return regexEmail.test(email.value) === false;
  });
});

/* Verify message */
message.addEventListener("input", (event) => {
  validateField(event.target, "Veuillez renseigner un message", () => {
    return !message.value;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allFieldsAreValid = Object.values(fieldsValidation).every(
    (value) => value === true
  );
  if (allFieldsAreValid) {
    form.style.display = "none";
    headerTitle.style.display = "none";

    confirmation[0].style.display = "flex";
  } else {
    alert("Veuillez remplir le formulaire");
  }
});

function closeKey(event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }
}

document.addEventListener("keydown", closeKey);

document.addEventListener("DOMContentLoaded", function () {
  const formulaire = document.getElementById("form");
  const champs = formulaire.querySelectorAll("input, textarea, button");
  formulaire.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      const focusableElements = Array.from(champs).filter(function (element) {
        return !element.disabled && !element.readOnly;
      });
      const currentIndex = focusableElements.indexOf(document.activeElement);
      if (currentIndex !== -1) {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
      }
    }
  });
});
