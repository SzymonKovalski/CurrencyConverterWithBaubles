// would probably have been an external API irl
const currencyRate = {
    'GBP': 0.8,
    'JPY': 128.2,
    'BGN': 1.9,
    'CAD': 1.4,
    'HRK': 7.5,
    'NOK': 10.2,
    'USD': 1.1,
    'UAH': 30.9,
    'PLN': 4.6,
};



async function getRateFromDatabase(Currency) {
    const rate = currencyRate[Currency];
    console.log(rate);
    return rate;
}
async function doExchange(fromCurrency, toCurrency, value, Callback) {
    //timer.start;
    //faking a delay between database

    const fromRate = getRateFromDatabase(fromCurrency);
    const toRate = getRateFromDatabase(toCurrency);
    console.log(fromRate);
    console.log(toRate);
    Promise.all([fromRate, toRate])
    .then(([from, to]) => {
        const result = value / from * to;
        console.log(result);
        return result;
    })
    .then(r => {
        Callback(r);
    })
    .catch();
}
