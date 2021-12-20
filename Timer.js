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
