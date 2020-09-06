const user = require("../facade/UserFacade");
const order = require("../facade/OrderFacade");
const product = require("../facade/ProductFacade");
let fact = {"user": new user, "order": order, "product": product};

class Factory {
    static factory(name) {
        switch (name) {
            case "user" :
                return new user();
            case "product" :
                return new product();
            case "order" :
                return new order();
           /* case "order" :
                return new order();
            case "order" :
                return new order();*/
            default :
                    throw "wrong facade name"

        }
    };
}

module.exports = Factory;