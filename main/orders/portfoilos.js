class Portfoilos {

    carts = {};

    addCart(user){
        try{
            this.carts[user.id] = new Cart(user);
        }catch (e) {
            console.error("fail to add cart of " + JSON.stringify(user) )
        }
    }

    getCart(user){
        try{
            return this.carts[user.id];
        }catch (e) {
            console.error("cart of " + user.id + " not found ")
        }
    }

}