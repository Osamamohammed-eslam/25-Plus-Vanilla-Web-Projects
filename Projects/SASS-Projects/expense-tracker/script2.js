const balance = document.getElementById("Balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const itemName = document.querySelector(".item-name");
const itemAmount = document.querySelector(".item-amount");
const btn = document.querySelector(".main-btn");

// const dummyTransactions = [
//   { id: 1, text: "flower", amount: 35 },
//   { id: 2, text: "cup", amount: -40 },
//   { id: 3, text: "photo", amount: 25 },
//   { id: 4, text: "rice", amount: -10 },
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem("transaction"));

let transactions =
  localStorage.getItem("transaction") !== null ? localStorageTransaction : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (itemName.value === "" || itemAmount === "") {
    alert("please enter a name and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: itemName.value,
      amount: +itemAmount.value,
    };
    transactions.push(transaction);

    addTransactionDom(transaction);

    updateValues();
    updateLocalStorage();

    itemName.value = " ";
    itemAmount.value = " ";
  }
}

// Generate a random number
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// Add transactions to DOM list
function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on Value
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onClick='removeTransaction(${
    transaction.id
  })'>x</button>`;

  list.appendChild(item);
}

// Update Values
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const incomeTotal = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expenseTotal = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item * -1, 0)
    .toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `$${incomeTotal}`;
  expense.innerText = `$${expenseTotal}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transaction", JSON.stringify(transactions));
}
// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDom);
  updateValues();
}

init();

// Add event transaction
form.addEventListener("submit", addTransaction);
