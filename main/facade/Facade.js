const {dao} = require("../dao/DBDao")

class Facade {

    constructor() {
    }

    getDao() {
        return new dao(arguments[0])
    }

    list(where, call) {
        this.getDao().list(call, where);
    }

    read(where, call) {
        this.getDao().read(where, call);
    }

    update(set, where, call) {
        this.getDao().update(set, where, call);
    }

    delete(where, call) {
        this.getDao().delete(where, call);
    }

    insert(where, call) {
        this.getDao().insert(where, call);
    }

}

module.exports.Facade = Facade;