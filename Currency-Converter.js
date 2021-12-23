const fromCurrencyEL = document.getElementById('fromCurrency');
const toCurrencyEL = document.getElementById('toCurrency');
const fromAmountEL = document.getElementById('fromAmount');
const toAmountEL = document.getElementById('toAmount');

const rateEL = document.getElementById('rate');
const swapEL = document.getElementById('swap');

const timerEL = document.getElementById('timer');


class Timer {
    constructor(display, delay = 1) { //Delay in ms
        this.state = 'paused';
        this.delay = delay;
        this.display = display;
        this.value = 0;
    }
    update() {
        if (this.state === 'running') {
            this.value += this.delay;
        }
        this.display.innerHTML = this.value;
    }
    start() {
        if (this.state === 'paused') {
            this.state = 'running';
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.update();
                }, this.delay);
            }
        }
    }
    stop() {
        if (this.state === 'running') {
            this.state = 'paused';
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
    reset() {
        this.stop();
        this.value = 0;
        this.update();
    }
}
const timer = new Timer(timerEL);

function calculate() {
    const fromCurrency = fromCurrencyEL.value;
    const toCurrency = toCurrencyEL.value;
    timer.reset();
    timer.start();
    //returns a promise
    fetch(`https://v6.exchangerate-api.com/v6/e8c3ed2bdb2608062e5d5a95/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[toCurrency];
        rateEL.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;

        toAmountEL.value = (fromAmountEL.value * rate).toFixed(2);
        timer.stop();
    }).catch(() => {
        timer.stop();
    });
}

fromCurrencyEL.addEventListener('change', calculate);
toCurrencyEL.addEventListener('change', calculate);
fromAmountEL.addEventListener('input', calculate);
toAmountEL.addEventListener('input', calculate);
swapEL.addEventListener('click', () => {
    const temp = fromCurrencyEL.value;
    fromCurrencyEL.value = toCurrencyEL.value;
    toCurrencyEL.value = temp;
    calculate();
  });
calculate();
