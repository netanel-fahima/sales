const {Facade} = require("./Facade");
let dao = require("../dao/DBDao").DBDao;

class CartFacade extends Facade {

    cartDao = new dao("cart");

    constructor() {
        super();
    }

    getDao() {
        return this.cartDao;
    }

}

module.exports = CartFacade;