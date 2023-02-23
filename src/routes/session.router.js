const {Router} = require('express');
const userModel = require('../dao/models/users.model')
const viewSession = require ('../controller/sessions.controller')

const router = Router();



router.post("/register",viewSession.registerForm)

router.post("/login",viewSession.login)


module.exports = router;