const {Facade} = require("./Facade");
let dao = require("../dao/DBDao").DBDao;

class CartItemFacade extends Facade {

    dbDao = new dao("cart_item");

    constructor() {
        super();
    }

    getDao() {
        return this.dbDao;
    }

}

module.exports = CartItemFacade;