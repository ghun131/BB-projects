const bcrypt = require('bcrypt');

let password = "wolfwolf";
let passwordConf = "wolfwolf";
let saltRounds = 10;
let user = '';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(passwordConf, salt, function(err, hash) {
        this.user = hash;
    });
});
