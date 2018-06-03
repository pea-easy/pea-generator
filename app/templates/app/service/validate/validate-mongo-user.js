class validateUser {
    static async getUser(condition) {
        if (!condition.id) {
            throw 'User id Lost';
        }
    }
}

module.exports = validateUser;