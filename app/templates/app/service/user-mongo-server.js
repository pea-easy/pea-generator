let userDao = require('../dao/user-dao');
let validateUser = require('./validate/validate-user');

class userService {

    static async getUser(condition) {
        await validateUser.getOneUser(condition);
        return await userDao.find(condition);
    }


}

module.exports = userService;