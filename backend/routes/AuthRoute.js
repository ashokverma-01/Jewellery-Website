const express = require('express');
const router = express.Router();
const {signup,login} = require('../controllers/AuthController');


// Route for user registration
router.post('/signup',signup);
router.post('/login',login);



module.exports = router;
