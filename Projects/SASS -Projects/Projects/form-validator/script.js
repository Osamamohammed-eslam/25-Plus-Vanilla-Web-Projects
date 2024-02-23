const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show success, error
function showError(input, message) {
  const formController = input.parentElement;
  formController.classList = "form-controller error";
  const small = formController.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formController = input.parentElement;
  formController.className = "form-controller success";
}

// check email
function checkEmail(input) {
  re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is Not Valid");
  }
}

// check required
function checkRequired(InputArr) {
  InputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, `${toUpperCase(input)} input required`);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${toUpperCase(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${toUpperCase(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value || input2.value === "") {
    showError(input2, "The passwords doesn't match");
  } else {
    showSuccess(input2);
  }
}

// error message first letter upper case
function toUpperCase(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([form, username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
