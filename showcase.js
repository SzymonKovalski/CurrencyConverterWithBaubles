const currencyRate = input => {
    setTimeout(() => {
        let result;
        switch (input) {
            case 'GBP': result = 0.8; break;
            case 'JPY': result = 128.2; break;
            case 'BGN': result = 1.9; break;
            case 'CAD': result = 1.4; break;
            case 'HRK': result = 7.5; break;
            case 'NOK': result = 10.2; break;
            case 'USD': result = 1.1; break;
            case 'UAH': result = 30.9; break;
            case 'PLN': result = 4.6; break;
        }
        return result;
    }, 1000);
};
// would probably have been an external API irl


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







function getRate(Currency) {
    //return new Promise((resolve, reject) => {
        const err = false;
        if (!err) {
            return currencyRate(Currency);
        } else {
            console.log('failure');
        }
    //});
}
function doExchange(fromCurrency, toCurrency, value, Callback) {
    let fromRate;
    let toRate;
    const fromRateP = Promise.resolve(getRate(fromCurrency)).then(val1 => {
        fromRate = val1;
    });
    const toRateP = Promise.resolve(getRate(toCurrency)).then(val2 => {
        toRate = val2;
    });
    fromRateP;
    toRateP;
    console.log(toRate);
    const result = value * fromRate / toRate;
    Callback(result);
}

timer.reset();
confirmExchangeBtn.addEventListener('click', async () => {
    const fromCurrency = document.getElementById('From').value;
    const toCurrency = document.getElementById('To').value;
    const value = document.getElementById('amount1').value;

    timer.start;

    doExchange(fromCurrency, toCurrency, value, result => {
        timer.start;
        timer.record;
        timer.reset;
        console.log(result);
    });
});
console.log(currencyRate('UAH'));
