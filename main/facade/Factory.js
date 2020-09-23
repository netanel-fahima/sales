const user = require("../facade/UserFacade");
const order = require("../facade/OrderFacade");
const product = require("../facade/ProductFacade");
const {Facade} = require("./Facade");
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
             case "category" :
                 return new Facade("category");
            /* case "order" :
                 return new order();*/
            default :
                throw new Error("wrong facade name")

        }
    };
}

module.exports = Factory;