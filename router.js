const router=require('express').Router();
const authController=require('./Controllers/auth/authController');

router.post('/signup',authController.signUp)
router.get('/login',authController.login)

module.exports=router;