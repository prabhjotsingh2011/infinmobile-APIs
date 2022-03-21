const router=require('express').Router();
const authController=require('./Controllers/auth/authController');

router.post('/signup',authController.signUp)
router.post('/forget',authController.forgotPassword)
router.get('/login',authController.login)
router.get('/verifyOtp',authController.verifyOTP)


module.exports=router;