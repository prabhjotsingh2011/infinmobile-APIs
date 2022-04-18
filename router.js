const router = require('express').Router();
const authController = require('./Controllers/auth/authController');
const ProfileController = require('./Controllers/profile/ProfileController');
const googleController = require('./Controllers/auth/googleAuthController');
const ShopkeeperController = require('./Controllers/profile/ShopkeeperController');
const featureController = require('./Controllers/shop/featureController');
const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authmiddleware = require('./middlewares/auth-middleware.js')

const upload = multerConfig();


//post request
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.post('/forget', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.post('/verifyOtp', authController.verifyOTP)
router.post('/user/changeUsername',authmiddleware,  ProfileController.changeUsername)
router.post('/user/changePassword',authmiddleware,  ProfileController.changePassword)
router.post('/user/notification',authmiddleware,  ProfileController.notification)
router.post('/user/uploadProfileImage', upload.single('profileImage'), ProfileController.uploadProfileImage)
router.post('/shop/create', upload.single('shoplogo'), ShopkeeperController.createShop)
router.post('/shop/update',authmiddleware, upload.single('shoplogo'), ShopkeeperController.updateShop)
router.post('/shop/inventory/upload/productImage', upload.single('ProductImage'), ShopkeeperController.uploadInventoryImage)
router.post('/shop/createInventory',authmiddleware,  ShopkeeperController.createInventory)
router.post('/shop/update/notification',authmiddleware,  ShopkeeperController.notification)
router.post('/user/follow',authmiddleware,  featureController.follow)
router.post('/user/unfollow',authmiddleware,  featureController.unfollow)
router.post('/shop/get/inventory', authmiddleware, ShopkeeperController.getInventory)







//get requests
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// router.get('/auth/google/redirect', passport.authenticate('google', {successRedirect: '/passed', failureRedirect: '/failed' }), googleController.googleAuth);
// router.get('/user/logout', (req, res) => {req.logout(); res.send('Goodbye!'); });
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
// router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),function(req, res) {res.redirect('/passed');});

router.get('/admin/get/allusers')




module.exports = router;