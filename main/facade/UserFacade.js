const {Facade} = require("./Facade");
let dao = require("../dao/UserDao");

class UserFacade extends Facade{

    constructor() {
        super();
    }

    getDao(){

        return new dao();
    }

}
module.exports = UserFacade;