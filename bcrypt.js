const bcrypt = require('bcrypt')

function hashPassword (passw){
    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            return console.log(err)
        }
    bcrypt.hash(passw, salt, function(err, hashP){
        if (err) {
            return console.log(err)
        }
        console.log(hashP)
        })
    })
}
hashPassword('testing')