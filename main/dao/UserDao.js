const {DBDao} = require("./DBDao");

class UserDao extends DBDao {
    constructor() {
        super("user")
    }
}


module.exports = UserDao;


