const user = require("../facade/UserFacade");
const category = require("../facade/CategoryFacade");
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
            case "order_item" :
                return new Facade("order_item");
             case "category" :
                 return new category();
             case "cart" :
                 return new Facade("cart");
            case "cart_item" :
                return new Facade("cart_item");
            case "resource" :
                return new Facade("resource");
            case "product_category" :
                return new Facade("product_category");
            default :
                throw new Error("wrong facade name")

        }
    };
}

module.exports = Factory;