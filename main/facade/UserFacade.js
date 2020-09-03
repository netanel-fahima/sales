const {dao} = require("../dao/UserDao")
const {Facade} = require("./Facade")

class UserFacade extends Facade{
    userDao = new dao();

    getDao(){
        return this.userDao;
    }

}