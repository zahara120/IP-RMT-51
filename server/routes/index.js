const router = require('express').Router()

const UserController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')
const recipe = require('./recipe')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.post('/donation', UserController.donation)

router.use('/recipes', recipe)

router.use(errorHandler)

module.exports = router;