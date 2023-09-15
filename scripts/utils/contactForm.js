function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const regexOnlyLetter =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const modal = document.getElementsByClassName("modal");
const form = document.getElementById("form");
const headerTitle = document.getElementById("header_title");
const formData = document.getElementsByClassName("form_data");
const confirmation = document.getElementsByClassName("confirmation_content");

const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
let firstNameCheck = false;
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
let lastNameCheck = false;
const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");
let emailCheck = false;
const message = document.getElementById("message");
const messageError = document.getElementById("textareaErrorMsg");
let messageCheck = false;

const fieldsValidation = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

function validateField(field, message, condition) {
  console.log(field);
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
    modal[0].style.height = "90%";
  } else {
    alert("Veuillez remplir le formulaire");
  }
});
