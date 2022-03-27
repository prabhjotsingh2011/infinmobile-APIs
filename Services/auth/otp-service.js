const crypto = require('crypto');
const sendEmail = require('../../Services/auth/sendEmail');
class otpService {
    async sendOtp(email) {
        //send otp to user

        if (!email) {
            return NULL;
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        //hash otp
        const ttl = 1000 * 60 * 10;  //10 min validity
        const expires = Date.now() + ttl;
        const data = `${otp}`
        const hashedOtp = crypto.createHash('md5').update(data).digest('hex');
        
        // const sendOtp = await sendEmail(email, 'OTP', `Your OTP is ${otp} and it will expire in 10 minutes`);
        // console.log('====================================');
        // console.log('otp: - ' + otp);
        // console.log('====================================');


        return {
            otp,
            hash: `${hashedOtp}.${expires}`,
            expires
        }
    }


    async verifyOTP(otp, hash) {
        //verify otp
        if (!hash) {
            return NULL;
        }
        const [Originalhash, expires] = hash.split('.');

        // const data = `${hashedOtp}.${expires}`
        const hasedOTP = crypto.createHash('md5').update(otp).digest('hex');
        if (Originalhash !== hasedOTP) {
            return NULL;
        }
        if (Date.now() > expires) {
            return NULL;
        }
        return hasedOTP;
    }
}

module.exports = new otpService;
