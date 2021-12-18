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
doExchange('UAH', 'PLN', 1000, () => {});



// Variables
//const clearbtn = document.querySelector('#clear');
const confirmExchangeBtn = document.querySelector('#confirm');

const timer = new Timer();
const local = new LocalStorage();

// eslint-disable-next-line prefer-const
let timerdiv = document.querySelector('#timer');
let started = false;
let time;
let interval;

// Event listeners





// Objects
function Timer() {
    this.type = 'Timer';
}

function LocalStorage() {

}

Timer.prototype.start = toggleTimer;
Timer.prototype.reset = resetTimer;
Timer.prototype.record = recordTimer;
Timer.prototype.unload = unloadTimer;

LocalStorage.prototype.getCurrentRecord = function() {
    return JSON.parse(localStorage.getItem('recordedTime'));
};
LocalStorage.prototype.clear = function() {
    localStorage.removeItem('recordedTime');
};
LocalStorage.prototype.record = addTimeStorage;
LocalStorage.prototype.setTime = setCurrentTime;
LocalStorage.prototype.getTime = getCurrentTime;

// Functions

function setCurrentTime() {
    localStorage.setItem('time', (parseFloat(time) / 100).toFixed(2));
}

function getCurrentTime() {
    return localStorage.getItem('time');
}

function addTimeStorage(time) {
    let currentRecord = local.getCurrentRecord();

    if (currentRecord === null) {
        currentRecord = [];
    }
    currentRecord.push(time);
    localStorage.setItem('recordedTime', JSON.stringify(currentRecord));
}


function unloadTimer() {
    if (started === true) {
        toggleTimer();
    }
    local.setCurrentTime();
}

function recordTimer() {
    // eslint-disable-next-line prefer-const
    let timeToRecord = parseFloat(time) / 100;
    local.record(timeToRecord);
}

function resetTimer() {
    time = 0;
    timerdiv.innerHTML = time;
    local.clear();
}

function toggleTimer() {
    if (started === false) {
        interval = setInterval(() => {
            console.log(time);
            time++;
            timerdiv.innerHTML = parseFloat(time++) / 100;
            local.setTime(time);
        }, 10);
        started = true;
    } else {
        clearInterval(interval);
        started = false;
    }
    return 0;
}
time = parseFloat(local.getTime()) * 100 || 0;
timerdiv.innerHTML = local.getTime();









timer.reset();
confirmExchangeBtn.addEventListener('click', async () => {
    const fromCurrency = document.getElementById('From').value;
    const toCurrency = document.getElementById('To').value;
    const value = document.getElementById('amount1').value;

    doExchange(fromCurrency, toCurrency, value, result => {
        timer.start;
        timer.record;
        timer.reset;
        console.log(result); //NaN
    });
});
