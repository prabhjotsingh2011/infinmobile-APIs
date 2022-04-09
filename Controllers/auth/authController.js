const userDto = require('../../dtos/user-dto');
const Hashing = require('../../Services/auth/Hashing');
const userService = require('../../Services/user/user-service');
const otpService = require('../../Services/auth/otp-service');

global.userCurrent = null;

class authController {


    async signUp(req, res) {
        const { username, email, password, confirmPassword, firstName, lastName, Mobile, DOB } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            res.status(401).json({ message: 'Please fill all the fields' });
        }
        else if (password !== confirmPassword) {
            res.status(401).json({ message: 'Password and Confirm Password do not match' });
        }
        else {
            let otp, hash, expires;
            try {
                try {
                    const userIsExists = await userService.findUser({ username });

                    if (userIsExists) {
                        const userDt = new userDto(userIsExists)
                        
                        return res.status(200).json({ message: 'Username already exists', userDt });
                    }
                } catch (error) {
                    return res.status(500).json({ message: 'Something went wrong while querying database' });
                }


                const OtpAck = await otpService.sendOtp(email);
                otp = OtpAck.otp; hash = OtpAck.hash; expires = OtpAck.expires;
 

                if (!otp || !hash || !expires) {
                    return res.status(500).json({ message: 'Something went wrong while sending otp' });
                } else {

                    // hashing password and creating user
                    try {                 
                        const hashedPassword = await Hashing.hash(password);
                        // userCurrent = { firstName, lastName, Mobile, password: hashedPassword, username: username, email: email, DOB };
                        userCurrent = { firstName, lastName, Mobile, password: hashedPassword, username: username, email: email, DOB };
                        console.log(userCurrent);
 
                    } catch (error) {
                        return res.status(500).json({ message: 'Something went wrong while creating user please try again' });
                    }
                }
            } catch (error) {
                return res.status(401).json({ message: "Something went wrong  while sending otp " });
            }

            return res.status(200).json({ message: 'Enter the otp for successfully signup', hashedOTP: hash, expiresIN: expires, otp:otp });
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
            user = await userService.findUser({ email: email });
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
        return res.status(200).json({ message: 'Login Successful', user: new userDto(user) });
    }


    async forgotPassword(req, res) {
        const { email } = req.body;
        let user;
        let otp, hash, expires;
        if (!email) {
            return res.status(401).json({ message: 'Please fill all the fields' });
        }
        try {
            user = await userService.findUser({ email: email });
            if (!user) {
                return res.status(401).json({ message: 'User/Email does not exists' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while querying database' });
        }
        try {
            const OtpAck = await otpService.sendOtp(email);
            otp = await OtpAck.otp; hash = OtpAck.hash; expires = OtpAck.expires;
            // console.log('====================================');
            // console.log(otp, hash,);
            // console.log('====================================');

            if (!otp || !hash || !expires) {
                return res.status(500).json({ message: 'Something went wrong while sending otp' });
            }
        } catch (error) {
            return res.status(401).json({ message: "Something went wrong  while sending otp " });
        }
        return res.status(200).json({ message: 'Enter the otp to change the password sent to you', hashedOTP: hash, expiresIN: expires, otp });
    }


    async resetPassword(req, res) {
        const { email, password, confirmPassword } = req.body;
        let user;
        if (!email || !password || !confirmPassword) {
            return res.status(401).json({ message: 'Please fill all the fields' });
        }
        try {
            user = await userService.findUser({ email: email });
            if (!user) {
                return res.status(401).json({ message: 'User/Email does not exists' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while querying database' });
        }
        if (password !== confirmPassword) {
            return res.status(401).json({ message: 'Password dont match' });
        }
        try {
            const hashedPassword = await Hashing.hash(password);
            user = await userService.updateUser({ _id: user.id }, { password: hashedPassword });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while updating user please try again' });
        }
        return res.status(200).json({ message: 'Password updated successfully', user: new userDto(user) });
    }




    async verifyOTP(req, res,) {
        // console.log(userCurrent);
        const { otp, hash } = req.body;
        let email;
        if (req.body.email) email = req.body.email;
        if (!otp || !hash) {
            return res.status(401).json({ message: 'Please fill all the fields' });
        }
        try {
            const user = await otpService.verifyOTP(otp, hash);
            if (!user) {
                return res.status(401).json({ message: 'OTP is incorrect or OTP session expired' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while verifying otp' });
        }

        try {

            const userExist = await userService.findUser({ email: email });
            if (userExist) {
                return res.status(200).json({ message: 'Otp verified', user: userExist });
            }
            const thisUser = await userService.createUser(userCurrent);
            return res.status(200).json({ message: 'OTP verified successfully', user: new userDto(thisUser) });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while validating password' });
        }


        // return res.status(200).json({ message: 'OTP verified successfully' });
    }


}

module.exports = new authController();
