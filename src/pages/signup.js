import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://backend-ghackk-1.onrender.com//api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If signup is successful, show a success alert and navigate to the home page
        alert('Signup successful!'); // Optional: you might want to replace this with a more user-friendly notification
        navigate('/'); // Navigate to the home page or desired route
      } else {
        // Set error message based on response from the backend
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again.'); // General error message for network issues
    }
  };

  return (
    <div  className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-purple-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to='/' className='text-sm text-gray-500 hover:text-purple-600 transition duration-200'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
