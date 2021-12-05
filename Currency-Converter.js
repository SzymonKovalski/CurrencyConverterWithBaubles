const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin,
                        output: process.stdout });
//base euro, some external API would also work
const currencyRate = [
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
const countryNames = [
    ['United States'],
    ['Japan'],
    ['Bulgaria'],
    ['Canada'],
    ['Croatia'],
    ['Norway'],
    ['England'],
    ['Ukraine'],
    ['Poland']
];

function getRate(Currency) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < currencyRate.length; i++) {
            //console.log(i);
            if (currencyRate[i][0] === Currency) {
                i;
                resolve(currencyRate[i][1]);
            }
        }
        reject();
    });
}

async function doExchangeRate(fromCurrency, toCurrency) {
   //awaits rate, gives back exchangeRate
   const fromRate = await getRate(fromCurrency);
   const toRate = await getRate(toCurrency);
   console.log(toRate / fromRate);
}

const getCountries = async toCurrency => {
    const responce = await countryNames[toCurrency];
    console.log(responce);
};


rl.question('What would you like to do?', userInput => {
    switch (userInput.trim()) {
        case ('doExchangeRate'):
            rl.on('line', from => {
                rl.on('line', to => {
                    doExchangeRate(from, to);
                    rl.close();//emits a event
                });
            });
            break;
        case ('getCountries'):
            rl.on('line', number => {
                getCountries(number);
                rl.close();
            });
            break;
        case (''):
            rl.close();
            break;
        default: rl.close();
    }
});

//askAboutExchangeRates();



