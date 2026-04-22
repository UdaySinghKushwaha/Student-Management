import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [courseForm, setCourseForm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await authAPI.getStudent();
      setStudent(response.data.student);
      setCourseForm(response.data.student.course);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch student data. Redirecting to login...');
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await authAPI.updatePassword(passwordForm);
      setSuccessMessage('Password updated successfully!');
      setPasswordForm({ oldPassword: '', newPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await authAPI.updateCourse({ course: courseForm });
      setStudent(response.data.student);
      setSuccessMessage('Course updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  if (error && !student) {
    return <div className="dashboard-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Student Info
          </button>
          <button
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Update Password
          </button>
          <button
            className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            Change Course
          </button>
        </div>

        <div className="dashboard-content">
          {/* Student Info Tab */}
          {activeTab === 'info' && student && (
            <div className="tab-content">
              <h2>Your Details</h2>
              <div className="info-card">
                <div className="info-item">
                  <label>Name:</label>
                  <p>{student.name}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{student.email}</p>
                </div>
                <div className="info-item">
                  <label>Course:</label>
                  <p>{student.course}</p>
                </div>
                <div className="info-item">
                  <label>Student ID:</label>
                  <p>{student.id}</p>
                </div>
              </div>
            </div>
          )}

          {/* Update Password Tab */}
          {activeTab === 'password' && (
            <div className="tab-content">
              <h2>Update Password</h2>
              <form onSubmit={handleUpdatePassword} className="form">
                <div className="form-group">
                  <label htmlFor="oldPassword">Current Password:</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <button type="submit" className="submit-btn">Update Password</button>
              </form>
            </div>
          )}

          {/* Change Course Tab */}
          {activeTab === 'course' && (
            <div className="tab-content">
              <h2>Change Course</h2>
              <form onSubmit={handleUpdateCourse} className="form">
                <div className="form-group">
                  <label htmlFor="course">Select New Course:</label>
                  <select
                    id="course"
                    value={courseForm}
                    onChange={(e) => setCourseForm(e.target.value)}
                    required
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">Update Course</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
