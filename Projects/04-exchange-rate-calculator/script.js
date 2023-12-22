const currenceyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById('amount-one')
const currenceyEl_two = document.getElementById('currency-two')
const amountEl_two = document.getElementById('amount-two')


const rateEl = document.getElementById('rate'); 
const swap = document.getElementById('swap')


// Fetch exchange rates ande update the DOM 

function calculate() {
  const currency_one = currenceyEl_one.value;
  const currency_two = currenceyEl_two.value;
  fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //  console.log(data);
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners

currenceyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currenceyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

swap.addEventListener("click", () => {
  const temp = currenceyEl_one.value;
  currenceyEl_one.value = currenceyEl_two.value;
  currenceyEl_two.value = temp;
  calculate();
});


calculate();