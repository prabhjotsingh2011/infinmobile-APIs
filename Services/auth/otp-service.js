const crypto = require('crypto');
const sendEmail = require('../../Services/auth/sendEmail');
class otpService {
    async sendOtp(email) {
        //send otp to user
        if (!email) {
            return NULL;
        }
        const otp = crypto.randomInt(1000, 9999);
        //hash otp
        const ttl = 1000 * 60 * 10;  //10 min validity
        const expires = Date.now() + ttl;
        // const data = `${email}.${otp}.${expires}`
        const data = `${otp}`
        const hashedOtp =  crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
        
        // const sendOtp = await sendEmail(email, 'OTP', `Your OTP is ${otp} and it will expire in 10 minutes`);
        console.log('====================================');
        console.log('otp: - '+otp);
        console.log('====================================');


        return {
            otp,
            hash: `${hashedOtp}.${expires}`,
            expires
        }
    }


    async verifyOTP(otp,hash) {
        //verify otp
        if (!hash) {
            return NULL;
        }
        const [Originalhash, expires] = hash.split('.');

        // const data = `${hashedOtp}.${expires}`
        const hasedOTP = crypto.createHmac('sha256', process.env.HASH_SECRET).update(otp).digest('hex');
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
