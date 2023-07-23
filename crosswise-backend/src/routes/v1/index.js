const express = require('express');
const userProfileController = require('../../controllers/userProfile.controller');
const userAssetsController = require('../../controllers/userAssets.controller');
const referralController = require('../../controllers/referral.controller');
const authController = require('../../controllers/auth.controller');
const compensationController = require('../../controllers/compensation.controller');
const authMiddleware = require('../../middlewares/auth');
const signMiddleware = require('../../middlewares/sign');

const router = express.Router();

//============================//
//        User Profile           //
//============================//

router.get('/profile/:address', userProfileController.getUserProfile);
router.post('/profile/:address', signMiddleware, userProfileController.saveUserProfile);

router.get('/nonce/:address', userProfileController.getNonce);
router.post('/verify/:address', userProfileController.verifyNonce);

//============================//
//        User Info           //
//============================//

router.get('/user_infos', authMiddleware, userAssetsController.getUserAssets);
router.get('/user_info/:address', authMiddleware, userAssetsController.getUserAsset);
router.post('/register_data', userAssetsController.registerUserInfo);

//============================//
//        Referral            //
//============================//
router.get('/referral_code/:address', referralController.getReferralCode)
router.post('/set_referrer/:code/:address', referralController.setReferrer)
router.delete('/delete/:address', referralController.deleteReferral)

//=============================//
//         Compensation        //
//=============================//
router.post('/compensation', compensationController.setCompensation)
router.get('/compensation/:address', compensationController.getCompensation)

//============================//
//        Auth                //
//============================//
router.put('/register_admin', authController.registerAdmin);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
module.exports = router;

