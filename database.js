const mongoose = require("mongoose");

async function DbConnect() {
    try {

        // const DB_URL = 'mongodb+srv://prabhjot:prabhjot@cluster0.u1g1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        // const DB_URL = 'mongodb://infinmobile:krH)@n6k*m/JEcmc';
        const DB_URL = 'mongodb://localhost:27017/myFirstDatabase'; 
        // const DB_URL = 'mongodb://3.88.181.199:27017/myFirstDatabase';



        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const db = mongoose.connection

        console.log("database connected sucessfully");

    } catch (error) {
        console.log("error while connecting to database");
        console.log(error);
    }
}

module.exports = DbConnect;