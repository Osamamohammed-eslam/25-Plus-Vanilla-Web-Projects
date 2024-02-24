const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error or success
function showError(input, message) {
  const formItem = input.parentElement;
  formItem.className = "form-item error";
  const small = formItem.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formItem = input.parentElement;
  formItem.className = "form-item success";
}

// Inputs Checker
function emptyFiled(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, `${filedName(input)} invalid`);
    } else {
      showSuccess(input);
    }
  });
}

// Email validation checker
function emailChecker(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Length checker
function lengthChecker(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${filedName(input)} must at least be ${min} characters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${filedName(input)} must not be more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Passwords match
function passwordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `${filedName(input2)} passwords does'nt matches`);
  }
}
// Error message filed name
function filedName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emptyFiled([username, email, password, password2]);
  lengthChecker(username, 3, 15);
  lengthChecker(password, 6, 20);
  passwordsMatch(password, password2);
  emailChecker(email)
});
