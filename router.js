const router = require('express').Router();
const authController = require('./Controllers/auth/authController');
const ProfileController = require('./Controllers/profile/ProfileController');
const googleController = require('./Controllers/auth/googleAuthController');
const passport = require('passport');
const multer= require('multer');
const multerConfig= require('./config/multer');

const upload = multerConfig();


//post request
router.post('/signup', authController.signUp)
router.post('/forget', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.post('/user/changeUsername', ProfileController.changeUsername)
router.post('/user/changePassword', ProfileController.changePassword)
router.post('/user/notification', ProfileController.notification)
router.post('/user/uploadProfileImage', upload.single('profileImage'), ProfileController.uploadProfileImage)




//get requests
router.get('/login', authController.login)
router.get('/verifyOtp', authController.verifyOTP)
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// router.get('/auth/google/redirect', passport.authenticate('google', {successRedirect: '/passed', failureRedirect: '/failed' }), googleController.googleAuth);
// router.get('/user/logout', (req, res) => {req.logout(); res.send('Goodbye!'); });
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
// router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),function(req, res) {res.redirect('/passed');});
  




module.exports = router;