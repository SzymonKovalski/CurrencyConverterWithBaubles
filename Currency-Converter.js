const fromCurrencyEL = document.getElementById('fromCurrency');
const toCurrencyEL = document.getElementById('toCurrency');
const fromAmountEL = document.getElementById('fromAmount');
const toAmountEL = document.getElementById('toAmount');

const rateEL = document.getElementById('rate');
const swapEL = document.getElementById('Swap');

// fetch currency rates

function calculate() {
    const fromCurrency = fromCurrencyEL.value;
    const toCurrency = toCurrencyEL.value;

    fetch(`https://v6.exchangerate-api.com/v6/e8c3ed2bdb2608062e5d5a95/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        const rate = data.conversion_rates;
        rateEL.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
    });
}













fromCurrencyEL.addEventListener('change', calculate);
toCurrencyEL.addEventListener('change', calculate);
fromAmountEL.addEventListener('input', calculate);
toAmountEL.addEventListener('input', calculate);
calculate();
