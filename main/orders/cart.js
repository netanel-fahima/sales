class Cart {

    user;
    items = new Map();
    delivery;

    constructor(user) {
        this.user = user;
    }

    addItem(item, quentity) {
        let opt = {};
        opt.item = item;
        opt.quentity = quentity;
        this.items.set(item.id,opt)
    }

    setDelivery(delivery) {
        this.delivery = delivery;
    }

    updateItem(item, quentity) {
        if (quentity !== 0) {
            this.items.delete(item.id);
        } else{
            this.items.get(item.id).item = item;
            this.items.get(item.id).quentity = quentity;
        }
    }

    clear(){
        this.items.clear();
    }

    getPrice() {
        var price = 0;
        this.items.forEach(i =>  {
            price += (i.item.price * i.quentity);
        });
        return price + this.delivery;
    }

    checkIn() {
        // add order to DB
    }

}