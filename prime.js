const color = require("colors")
const [from, to] = process.argv.slice(2)

class Prime {
    from = null;
    to = null;
    primeArray = [];
    primeList = "";

    constructor(from, to) {
        this.from = Number(from)
        this.to = Number(to)
        this._init()
    }

    _init() {
        if (this._validator()) {
            this._setPrime();
        }
        if (this._isEmptyPrimeArray()) {
            this._colorize();
            console.log(this.primeList)
        }
    }

    _setPrime() {
        if (!this._validator()) {
            return
        }
        nextPrime:
            for (let i = this.from; i <= this.to; i++) {
                for (let j = 2; j < i; j++) {
                    if (i % j === 0) continue nextPrime;
                }
                this.primeArray.push(i);
            }
    }

    _validator() {
        if (!this.from || !this.to) {
            console.log(color.red("Ошибка ввода данных"));
            return false;
        }
        return true;
    }

    _isEmptyPrimeArray() {
        if(this.primeArray.length > 0) {
            return true
        }
        console.log(color.red("Простых чисел в диапазоне нет"))
        return false
    }

    _colorize() {
        let count = 0
        this.primeArray.forEach((item) => {
            if (count > 2) {
                count = 0;
            }
            switch (count) {
                case 0:
                    this.primeList += (color.green(item) + ', ');
                    count++;
                    return;
                case 1:
                    this.primeList += (color.yellow(item) + ', ');
                    count++;
                    return;
                case 2:
                    this.primeList += (color.red(item) + ', ');
                    count++;
                    return;
            }
        });
    }
}

let primeList = new Prime(from, to);
