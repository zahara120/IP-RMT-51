const router = require('express').Router()

const UserController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')
// const authentication = require('../middlewares/authentication')
// const {adminAuthorization} = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

//middleware untuk authentication sama authorization
// router.use(authentication)

// router.use('/', user)

router.use(errorHandler)

module.exports = router;