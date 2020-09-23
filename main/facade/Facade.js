let dao = require("../dao/DBDao").DBDao;

class Facade {

    name = "" ;
    constructor() {
        this.name = arguments[0];
    }

    getDao() {
        return new dao(this.name)
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