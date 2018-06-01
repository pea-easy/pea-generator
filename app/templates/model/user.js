
var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

var userSchema = new mongoose.Schema({
    //user email
    username: { type: String },
    age: { Number: String },
    
    //-------Audit field-----------------------
    //create date
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },


}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'user'
});

userSchema.plugin(mongoosePaginate);
var User = mongoose.model('User', userSchema);

module.exports = User;



