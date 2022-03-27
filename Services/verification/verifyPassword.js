const Hashing = require('../../Services/auth/Hashing');
const userService = require('../../Services/user/user-service');

class verifyPassword{
    async verifyPass(id,password){

        const user = await userService.findUser({_id:id});
        if(!user){
            return false;
        }
        let isMatch=false;
        try {
            const hashedPassword = await Hashing.hash(password);
            if(hashedPassword===user.password){
                isMatch=true;
            }
            // //  isMatch = await Hashing.compare(password, user.password);
        } catch (error) {
            console.log("error in verifyPass");
            return false;
        }
        if(isMatch){ 
            return true;   
        }
        else{
            return false;
        }
    }
}

module.exports = new verifyPassword();