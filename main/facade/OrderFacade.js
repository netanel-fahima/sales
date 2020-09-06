const {Facade} = require("./Facade");
let dao = require("../dao/DBDao").DBDao;

class OrderFacade extends Facade {

    cartDao = new dao("order");
    transactionDao = new dao("transaction");

    constructor() {
        super();
    }

    getDao() {
        return this.cartDao;
    }


    transaction(where , call){
        this.transactionDao.list(call,where);
    }

    addTransaction(where , call){
        this.transactionDao.insert(where,call);
    }

    // Admin
    updateTransaction(where = new Map , call){
        this.transactionDao.update(where.keys() , where.values() ,call);
    }

}

module.exports = OrderFacade;

