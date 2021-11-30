//base euro
const Currency = () => {
    const currencyRate = () => [
    ['GBP', 0.8],
    ['JPY', 128.2],
    ['BGN', 1.9],
    ['CAD', 1.4],
    ['HRK', 7.5],
    ['NOK', 10.2],
    ['USD', 1.1],
    ['UAH', 30.9],
    ['PLN', 4.6]
    ];
    // eslint-disable-next-line no-unused-vars
    const getRate = Currency => {
        const exchangeRate =
        currencyRate[this.currencyRate.indexOf(Currency), 1];
        console.log(exchangeRate);
    };
};
/*const countryNames = [
    ['United States'],
    ['Japan'],
    ['Bulgaria'],
    ['Canada'],
    ['Croatia'],
    ['Norway'],
    ['England'],
    ['Ukraine'],
    ['Poland']
];*/

/*const getExchangeRate = (fromCurrency, toCurrency) => {
    const fromRate = Currency.getRate(fromCurrency);
    const toRate = Currency.getRate(toCurrency);
    console.log(toRate / fromRate);
};*/
Currency.getRate('USD');
