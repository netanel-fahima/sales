class Ansyc {
    count;
    callback;
    args;

    constructor(count = 1, callback = function () {
        console.log("counter is " + this.count)
    }, args) {
        this.count = count;
        this.callback = callback;
        this.args = args;
    }

    event(arg = this.args) {
        if (--this.count == 0) {
            this.callback(this.args);
        }
        console.log(`counter is - ${this.count}`);
    }

    end(arg = this.args) {
        this.callback(arg);
    }
}

module.exports = Ansyc;