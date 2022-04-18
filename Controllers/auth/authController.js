const userDto = require('../../dtos/user-dto');
const Hashing = require('../../Services/auth/Hashing');
const userService = require('../../Services/user/user-service');
const otpService = require('../../Services/auth/otp-service');
const tokenService = require('../../Services/tokens/token-service.js')

global.userCurrent = null;

class authController {

    async signUp(req, res) {
        const { username, email, password, confirmPassword, firstname, lastname, mobile, date_of_birth } = req.body;
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

                        return res.status(200).json({ message: 'Username already exists' });
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
                        userCurrent = { firstname, lastname, mobile, password: hashedPassword, username: username, email: email, date_of_birth };
                        // console.log(userCurrent);

                    } catch (error) {
                        return res.status(500).json({ message: 'Something went wrong while creating user please try again' });
                    }
                }
            } catch (error) {
                return res.status(401).json({ message: "Something went wrong  while sending otp " });
            }

            return res.status(200).json({ message: 'Enter the otp for successfully signup', hashedOTP: hash, expiresIN: expires, otp: otp });
        }


    }


    async login(req, res) {

        const { email, password } = req.body;
        if (await userService.findUser({ username: email })) {

            // const { username } = req.body;
            const user = await userService.findUser({ username: email });


            const { accesstoken } = await tokenService.findaccessToken(user._id);
            // console.log(accesstoken)
            if (!user) return res.status(401).json({ success: false, message: 'Invalid user' });
            let isMatch = false;
            isMatch = await Hashing.compare(password, user.password);
            if (isMatch) {
                return res.status(200).json({ success: true, accesstoken, message: 'Login Successful', user: new userDto(user) });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        }
        else {
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
                const { accesstoken } = await tokenService.findaccessToken(user._id)
                // console.log(accesstoken)
                // hashedPassword = await Hashing.hash(password);
                if (!await Hashing.compare(password, user.password)) {
                    return res.status(401).json({ message: 'Password is incorrect' });
                }
                return res.status(200).json({ message: 'Login Successful', accesstoken, user: new userDto(user) });
            } catch (error) {
                return res.status(500).json({ message: 'Something went wrong while querying database' });
            }
        }
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
        // let email;
        // if (req.body.email) email = req.body.email;
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


            // const userExist = await userService.findUser({ email: email });
            // console.log(userExist)
            // if (userExist) {
            //     return res.status(200).json({ status: true, message: 'Otp verified', user: new userDto(userExist) });
            // }

            const thisUser = await userService.createUser(userCurrent);
            const curruser = await userService.findUser({ email: thisUser.email });
            // console.log(curruser)



            // await tokenService.storeRefreshToken(refreshToken, thisUser._id)

            // res.cookie('refreshToken', refreshToken, {
            //     maxAge: 1000 * 60 * 60 * 24 * 30,
            //     httpOnly: true,
            // })

            // res.cookie('accessToken', accessToken, {
            //     maxAge: 1000 * 60 * 60 * 24 * 30,
            //     httpOnly: true,
            // })

            // console.log(accessToken, refreshToken)

            const { accessToken, refreshToken } = tokenService.generateTokens({ id: curruser._id, activated: false })
            await tokenService.storeRefreshToken(refreshToken, accessToken, curruser._id)

            return res.status(200).json({ message: 'OTP verified successfully', accesstoken: accessToken, user: new userDto(thisUser) });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong while validating password' });
        }

        // return res.status(200).json({ message: 'OTP verified successfully' });
    }


}

module.exports = new authController();
