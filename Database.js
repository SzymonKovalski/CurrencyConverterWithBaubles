// would probably have been an external API irl
class currencyRate {
    constructor() {
        this.GBP = 0.8;
        this.JPY = 128.2;
        this.BGN = 1.9;
        this.CAD = 1.4;
        this.HRK = 7.5;
        this.NOK = 10.2;
        this.USD = 1.1;
        this.UAH = 30.9;
        this.PLN = 4.6;
    }

}

async function getRateFromDatabase(Currency) {
    const rate = currencyRate[Currency];
    console.log(rate);
    return rate;
}

getRateFromDatabase('UAH');
export default currencyRate;
export { getRateFromDatabase };
