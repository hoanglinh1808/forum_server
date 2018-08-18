const bcrypt = require('bcrypt')

// var pass = "linhTT"

// var abc = bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(pass, salt, function (err, hash) {
//         console.log(hash)
//         bcrypt.compare(pass, hash, function (err, res) {
//             console.log(res)
//         })
//     })
// })

// // Auto-gen a salt and hash
// bcrypt.hash('bacon', 8, function (err, hash) {
//     console.log(`Auto-gen: ${hash}`)
// })

var abc = bcrypt.create("testing")
console.log(abc)
//"$2a$10$Ww/nuq6UNXXIWaUaAg.FDe4vHKwTdAK4cqldlNDtyj63M5Tv034xS".