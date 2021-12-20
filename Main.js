import './Currency-Converter.js';

const confirmExchangeBtn = document.querySelector('#confirm');

confirmExchangeBtn.addEventListener('click', async () => {
    //start timer

    const fromCurrency = document.getElementById('From').value;
    const toCurrency = document.getElementById('To').value;
    const value = document.getElementById('amount1').value;

    //Fetch converter
    doExchange(fromCurrency, toCurrency, value, () => {
        //stop timer

        //show things
    });
});











