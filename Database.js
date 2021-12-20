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