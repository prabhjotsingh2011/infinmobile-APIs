const bcryptjs = require('bcryptjs');

const salt =  bcryptjs.genSalt(10);
class Hashing {
     async hash(password) {
        return await bcryptjs.hashSync(password, 12);
    }
     async compare(password, hash) {
        return await bcryptjs.compare(password, hash);
    }
}

module.exports = new Hashing();
