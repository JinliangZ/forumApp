const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protected = require('../middleware/protected');


router.get('/index',userController.index_get);
router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.post('/change_password',protected, userController.password_post);


module.exports = router;