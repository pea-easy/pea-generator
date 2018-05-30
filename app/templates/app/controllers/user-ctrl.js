
let userService = require('../service/user-server');

exports.getUser = async (ctx) => {
    try {
        let result = await userService.getUser({});
        ctx.body.data = result;
    } catch (error) {
        ctx.body = error.toString();
    }
};

