
let userService = require('../service/user-server');

exports.getUser = async (ctx) => {
    try {
        logger.info('getUser',ctx.params);
        let body = ctx.params;
        let result = await userService.getUser(body);
        ctx.body = result;
    } catch (error) {
        logger.error('error', error);
        ctx.body = error.toString();
    }
};

exports.saveUser = async (ctx) => {
    try {
        let body = ctx.request.body;
        let result = await userService.saveUser(body);
        ctx.body = result;
    } catch (error) {
        logger.error('error', error);
        ctx.body = error.toString();
    }
};
