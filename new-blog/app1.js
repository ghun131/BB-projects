const bcrypt = require('bcrypt');

let password = "wolfwolf";
let passwordConf = "wolfwolf";

password = bcrypt.hashSync(passwordConf, 10);

console.log(password);