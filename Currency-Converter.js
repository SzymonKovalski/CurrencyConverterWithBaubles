const fromCurrencyEL = document.getElementById('fromCurrency');
const toCurrencyEL = document.getElementById('toCurrency');
const fromAmountEL = document.getElementById('fromAmount');
const toAmountEL = document.getElementById('toAmount');

const rateEL = document.getElementById('rate');
const swapEL = document.getElementById('swap');

function calculate() {
    const fromCurrency = fromCurrencyEL.value;
    const toCurrency = toCurrencyEL.value;
    //returns a promise
    fetch(`https://v6.exchangerate-api.com/v6/e8c3ed2bdb2608062e5d5a95/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[toCurrency];
        rateEL.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;

        toAmountEL.value = (fromAmountEL.value * rate).toFixed(2);
    });
}

class Timer {
    constructor(root) {
        
    }
}





fromCurrencyEL.addEventListener('change', calculate);
toCurrencyEL.addEventListener('change', calculate);
fromAmountEL.addEventListener('input', calculate);
toAmountEL.addEventListener('input', calculate);
swapEL.addEventListener('click', () => {
    const temp = fromCurrencyEL.value;
    fromCurrencyEL.value = toCurrencyEL.value;
    toCurrencyEL.value = temp;
    calculate();
  });
calculate();
