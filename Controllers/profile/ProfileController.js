const userService = require('../../services/user/user-service');
const verifyPassword = require('../../services/verification/verifyPassword');
const Hashing = require('../../services/auth/Hashing');
const userDto = require('../../dtos/user-dto');

class profileController {

    async changeUsername(req, res) {
        const { username, id, password } = req.body;
        const user = await userService.findUser({ _id: id });
        if (!user)  return false;
        let isMatch = false;
        isMatch = await Hashing.compare(password, user.password);
       

        if (isMatch) {
            const isExist = await userService.findUser({ username: username });
            if (isExist) 
                return res.status(200).json({ message: "Username already exists" });
            else {
                try {
                    const user = await userService.updateUser({ _id: id }, { username: username });
                    const currUser= await userService.findUser({ _id: id });
                    return res.status(200).json({ message: 'Username changed successfully', user: new userDto(currUser) });
                }
                catch (error) {
                    return res.status(500).json({ message: 'Something went wrong while updating username' });
                }
            }
        }
        else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    }


    async changePassword(req, res) {
        const {id,newpassword,currPassword,confirmPassword } = req.body;
        const user = await userService.findUser({ _id: id });
        if (!user)  return res.status(401).json({ message: 'Invalid user' });
        let isMatch = false;
        isMatch = await Hashing.compare(currPassword, user.password);
        if (isMatch) {
            if (newpassword !== confirmPassword) {
                return res.status(401).json({ message: 'New password and confirm password do not match' });
            }
            else {
                try {
                    const hashedPassword = await Hashing.hash(newpassword);
                    const user = await userService.updateUser({ _id: id }, { password: hashedPassword });
                    const currUser= await userService.findUser({ _id: id });
                    return res.status(200).json({ message: 'Password changed successfully', user: new userDto(currUser) });
                }
                catch (error) {
                    return res.status(500).json({ message: 'Something went wrong while updating password' });
                }
            }
        }
        else {
            return res.status(401).json({ message: 'Invalid current password' });
        }
    }

        
        // const NewUser = await userService.updateUser({ _id: this.userId }, { password: password });
        // return res.status(200).json({ message: "Password changed successfully" });
}





module.exports = new profileController();