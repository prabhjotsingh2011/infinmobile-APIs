const router = require('express').Router();
const authController = require('./Controllers/auth/authController');
const ProfileController = require('./Controllers/profile/ProfileController');
const googleController = require('./Controllers/auth/googleAuthController');
const ShopkeeperController= require('./Controllers/profile/ShopkeeperController');
const featureController = require('./Controllers/shop/featureController');
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
router.post('/shop/create',upload.single('shoplogo'), ShopkeeperController.createShop)
router.post('/shop/update',upload.single('shoplogo'), ShopkeeperController.updateShop)
router.post('/shop/inventory/upload/productImage',upload.single('ProductImage'), ShopkeeperController.uploadInventoryImage)
router.post('/shop/createInventory', ShopkeeperController.createInventory)
router.post('/shop/update/notification', ShopkeeperController.notification)
router.post('/user/follow', featureController.follow)
router.post('/user/unfollow', featureController.unfollow)





//get requests
router.post('/login', authController.login)
router.get('/verifyOtp', authController.verifyOTP)
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// router.get('/auth/google/redirect', passport.authenticate('google', {successRedirect: '/passed', failureRedirect: '/failed' }), googleController.googleAuth);
// router.get('/user/logout', (req, res) => {req.logout(); res.send('Goodbye!'); });
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
// router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),function(req, res) {res.redirect('/passed');});

router.get('/shop/get/inventory', ShopkeeperController.getInventory)
  



module.exports = router;