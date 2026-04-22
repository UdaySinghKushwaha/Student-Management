const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/student', authMiddleware, authController.getStudent);
router.put('/update-password', authMiddleware, authController.updatePassword);
router.put('/update-course', authMiddleware, authController.updateCourse);

module.exports = router;
