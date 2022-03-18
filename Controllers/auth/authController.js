const userDto = require('../../dtos/user-dto');
const Hashing = require('../../Services/auth/Hashing');
const userService = require('../../Services/user/user-service');

class authController {

    async signUp(req, res) {
        // res.send(req);
        const { username, email, password, confirmPassword } = req.body;
        // const username=req.body.username;

        if (!username || !email || !password || !confirmPassword) {
            res.status(401).json({ message: 'Please fill all the fields' });
        }
        else if (password !== confirmPassword) {
            res.status(401).json({ message: 'Password and Confirm Password do not match' });
        }
        else {
            let hashedPassword, user;

            //quering for exsitsing user
            try {
                user = await userService.findUser({ username });
                if (user) {
                    const userDt = new userDto(user)
                    return res.status(200).json({ message: 'Username already exists', userDt });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong while querying database' });
            }

            //hashing password and creating user
            try {
                hashedPassword = await Hashing.hash(password);
                 user = await userService.createUser({ password: hashedPassword, username: username, email: email });
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong while creating user please try again' });
            }
            return res.status(200).json({ message: 'User created successfully', user: new userDto(user) });
        }


    }


    async login(req, res) {
        const { email, password } = req.body;
        let user;
        let hashedPassword;
        if (!email || !password) {
            return res.status(401).json({ message: 'Please fill all the fields' });
        }
        try {
            user = await userService.findUser({ email:email });
            if (!user) {
                return res.status(401).json({ message: 'Username does not exists' });
            }
            // hashedPassword = await Hashing.hash(password);
            if (!await Hashing.compare(password, user.password)) {
                return res.status(401).json({ message: 'Password is incorrect' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while querying database' });
        }
        return res.status(200).json({ message: 'Login Successful' ,user:new userDto(user)});
    }

    
}

module.exports = new authController();