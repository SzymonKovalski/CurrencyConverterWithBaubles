const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin,
                        output: process.stdout });
//base euro
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

function getRate(Currency) { //promices to give rate
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
   console.log(await toRate / await fromRate);
}

//callback command line



doExchangeRate('USD', 'PLN');





rl.question('What would you like to do?', userInput => {
    switch (userInput.trim()) {
        case ('Bread'):
            setTimeout(() => {
                console.log('pain means bread in france');
            }, 3000);
            rl.close();//emits a event
            break;
        case (''):
            rl.close();
            break;
    }
});
rl.on('', () => { //listens for  event
    console.log('thank you');
});





