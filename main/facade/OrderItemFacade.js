const {Facade} = require("./Facade");
let dao = require("../dao/DBDao").DBDao;

class OrderItemFacade extends Facade {

    dbDao = new dao("order_item");

    constructor() {
        super();
    }

    getDao() {
        return this.dbDao;
    }

}

module.exports = OrderItemFacade;

