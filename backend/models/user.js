const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
const UserSchema= new Schema({

    firstname:{type:String, require:true},
    lastname:{type:String, require:true},
    email:{type:String, require:true, unique:true },
    password:{type:String, require:true,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]

    },
    date:{type:Date, require:true},

    loggedInToken: {
        type: Object
    },

});

module.exports = mongoose.model('User',UserSchema);