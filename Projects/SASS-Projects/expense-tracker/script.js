const balance = document.getElementById("Balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const listsParent = document.getElementById("list");
const form = document.getElementById("form");
const itemName = document.querySelector(".item-name");
const itemAmount = document.querySelector(".item-amount");

const btn = document.querySelector(".main-btn");

let totalIncome = 0;
let totalExpense = 0;
items = [];



// Save data to local storage
function saveData() {
  localStorage.setItem("total-income", totalIncome);
  localStorage.setItem("total-expense", totalExpense);
  localStorage.setItem("items", JSON.stringify(items));
}

// Load data from local storage
function loadData() {
  totalIncome = parseFloat(localStorage.getItem("total-income")) || 0;
  totalExpense = parseFloat(localStorage.getItem("total-expense")) || 0;
  items = JSON.parse(localStorage.getItem("items"));

  income.innerText = `$${totalIncome.toFixed(2)}`;
  expense.innerText = `$${totalExpense.toFixed(2)}`;

  updateBalance();
}

// Render items on the UI
// function renderItems() {
//   listsParent.innerHTML = ''
//   items.forEach(item => {

//   });
// }

// Show item name and amount and if it's positive or negative
function itemNameAndAmount(sign, className) {
  const name = itemName.value;
  const amount = +itemAmount.value;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "x";
  deleteBtn.classList.add("delete-btn");

  const spanAmount = document.createElement("span");
  spanAmount.innerHTML = sign + amount;

  const item = document.createElement("li");
  item.classList.add("history", `${className}`);

  item.innerHTML = `${name} `;
  item.appendChild(deleteBtn);
  item.appendChild(spanAmount);
  listsParent.appendChild(item);

  // Event listener delete button
  deleteBtn.addEventListener("click", () => {
    item.remove(); // Remove the item from the list

    // Update total income or expense if item deleted
    if (sign === "+") {
      totalIncome -= amount;
      income.innerText = `$${totalIncome.toFixed(2)}`;
    } else {
      totalExpense -= amount;
      expense.innerText = `$${totalExpense.toFixed(2)}`;
    }

    updateBalance();
  });

  // Update total income or expense if item added
  if (sign === "+") {
    totalIncome += amount;
    income.innerText = `$${totalIncome.toFixed(2)}`;
  } else {
    totalExpense += amount;
    expense.innerText = `$${totalExpense.toFixed(2)}`;
  }

  updateBalance();
}

// Update Balance
function updateBalance() {
  const theBalance = totalIncome + totalExpense;
  balance.innerText = `$${theBalance.toFixed(2)}`;
}

// Reset form after deploying Item
function formReset() {
  itemName.value = "";
  itemAmount.value = "";
}

// Event listeners
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = itemName.value;
  const amount = itemAmount.value;

  if (name.trim() === "" || amount.trim() === "") {
    alert("Please enter a name and an amount");
  } else {
    if (amount >= 0) {
      itemNameAndAmount("+", "plus");
    } else {
      itemNameAndAmount("", "minus");
    }
    saveData();
    formReset();
  }
});

// Load data when the page loads
window.addEventListener("load", () => {
  loadData();
});
