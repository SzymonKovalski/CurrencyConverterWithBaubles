const currencyRate = input => {
    setTimeout(() => {
        switch (input) {
            case 'GBP': return 0.8;
            case 'JPY': return 128.2;
            case 'BGN': return 1.9;
            case 'CAD': return 1.4;
            case 'HRK': return 7.5;
            case 'NOK': return 10.2;
            case 'USD': return 1.1;
            case 'UAH': return 30.9;
            case 'PLN': return 4.6;
        }
    }, 1000);
};
// would probably have been an external API irl
function getRate(Currency) {
    return new Promise((resolve, reject) => {
        resolve(currencyRate(Currency));
        reject();
    });
}

// Variables
const startbtn = document.querySelector('#start');
const resetbtn = document.querySelector('#reset');
const recordbtn = document.querySelector('#record');
//const clearbtn = document.querySelector('#clear');

const recordList = document.querySelector('#record-list');


const confirmExchangeBtn = document.querySelector('#confirm');

const timer = new Timer();
const html = new HTMLUI();
const local = new LocalStorage();

// eslint-disable-next-line prefer-const
let timerdiv = document.querySelector('#timer');
let started = false;
let time;
let interval;

// Event listeners
function eventListen() {
    window.onunload = timer.unload;
    document.onkeypress = timer.keypress;

    startbtn.addEventListener('click', timer.start);
    resetbtn.addEventListener('click', timer.reset);
    recordbtn.addEventListener('click', timer.record);
}




// Objects
function Timer() {
    this.type = 'Timer';
}

function HTMLUI() {

}

function LocalStorage() {

}

Timer.prototype.start = toggleTimer;
Timer.prototype.reset = resetTimer;
Timer.prototype.record = recordTimer;
Timer.prototype.unload = unloadTimer;


HTMLUI.prototype.clear = clearRecords;
HTMLUI.prototype.records = showStorageRecords;

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

function showStorageRecords() {
    // eslint-disable-next-line prefer-const
    let currentRecord = local.getCurrentRecord();
    if (currentRecord !== null) {
        currentRecord.forEach(record => {
        recordList.innerHTML += `
            <li class='records list-group-item'>${record}</li>
        `;
        });
    }
}

function clearRecords() {
    recordList.innerHTML = '';
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
    recordList.innerHTML += `
            <li class='records list-group-item'>${timeToRecord}</li>`;
    local.record(timeToRecord);
}

function resetTimer() {
    time = 0;
    timerdiv.innerHTML = time;
    html.clear();
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
console.log(time);
eventListen();
html.records();
timerdiv.innerHTML = local.getTime();








async function doExchangeRate(fromCurrency, toCurrency) {
    const fromRate = await getRate(fromCurrency);
    const toRate = await getRate(toCurrency);
    return (toRate / fromRate);
}
function doExchange(fromCurrency, toCurrency, value) {
    const rate = doExchangeRate(fromCurrency, toCurrency);
    return (value * rate);
}


timer.reset();
confirmExchangeBtn.addEventListener('click', () => {
    const fromCurrency = document.getElementById('From').value;
    const toCurrency = document.getElementById('To').value;
    const value = document.getElementById('amount1').value;

    timer.start;

    console.log(doExchange(fromCurrency, toCurrency, value));

    timer.reset;

});
