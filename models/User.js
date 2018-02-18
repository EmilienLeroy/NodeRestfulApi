//Load Module
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

//Create Movie Schema
var UserSchema = new Schema({
    username : {type:String ,required: true, index: { unique: true }},
    email : String,
    password : {type:String ,required: true}
},
{
     collection : 'User' 
}); 

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//Export the Movie model
let User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = (candidatePassword, password, cb) => {
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Function to add a movie
module.exports.addUser = (user, callback) => {
    let newUser = new User(user);
    newUser.save(callback);
};

module.exports.getUser = (user, callback) => {
	User.findOne({username: user.username},(err,result)=>{
        if (result == null){
            return callback("Erreur login or password")
        } else {
            User.comparePassword(user.password,result.password,(err,match)=>{
                if(match == true){
                    callback(user);
                }else{
                    callback("Erreur login or password")
                }
            })
        }
    })
};