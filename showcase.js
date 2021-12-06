
// Variables
const startbtn = document.querySelector('#start');
const resetbtn = document.querySelector('#reset');
const recordbtn = document.querySelector('#record');
//const clearbtn = document.querySelector('#clear');

const recordList = document.querySelector('#record-list');

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
Timer.prototype.keypress = keypress;

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

function keypress(e) {
    switch (e.keyCode) {
        case 114:
            resetbtn.click();
            break;
        case 115:
            startbtn.click();
            break;
        case 116:
            recordbtn.click();
            break;
        default:
            break;
    }
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
