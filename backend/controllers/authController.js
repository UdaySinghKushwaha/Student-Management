const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/register
// @desc    Register a new student
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Validation
    if (!name || !email || !password || !course) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ success: false, message: 'Email already registered. Please use a different email or login' });
    }

    // Create new student
    student = await Student.create({ name, email, password, course });

    // Generate token
    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/login
// @desc    Authenticate student and return JWT token
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for student
    const student = await Student.findOne({ email }).select('+password');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(student._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/student
// @desc    Get current logged-in student details
// @access  Private
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/update-password
// @desc    Update student password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide old and new password' });
    }

    // Get student with password
    const student = await Student.findById(req.student.id).select('+password');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if old password is correct
    const isMatch = await student.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Old password is incorrect' });
    }

    // Update password
    student.password = newPassword;
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/update-course
// @desc    Update student course
// @access  Private
exports.updateCourse = async (req, res) => {
  try {
    const { course } = req.body;

    if (!course) {
      return res.status(400).json({ success: false, message: 'Please provide a course' });
    }

    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { course },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
