class validateUser {
    static async getUser(condition) {
        if (!condition.id) {
            throw 'id is Lost';
        }
    }
    static async saveUser(condition) {
        if (!condition.age) {
            throw 'age is Lost';
        }
        if (!condition.username) {
            throw 'username is Lost';
        }
    }
}

module.exports = validateUser;