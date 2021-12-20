
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
