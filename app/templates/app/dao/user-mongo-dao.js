const model = require('../../model/index');
const User = model.User;

class serviceDao {
    static async find(condition) {
        let data = {};
        if(condition.age !== undefined){
            data.age = condition.age;
        }
        if(condition.id !== undefined){
            data._id = condition.id;
        }
        if(condition.username !== undefined){
            data.username = condition.username;
        }
        return await User.find(data);

    }   

    static async save(condition) {
        let data = {};
        if(condition.age !== undefined){
            data.age = condition.age;
        }
        if(condition.username !== undefined){
            data.username = condition.username;
        }
        let userSchema = new User(data);
        return await userSchema.save();
    }
}
module.exports = serviceDao;




