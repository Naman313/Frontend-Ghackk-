import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const error= ""
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username && password) {
      try {
        const response = await fetch('https://backend-ghackk-1.onrender.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }), 
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }
  
        const data = await response.json(); // Capture the response
        console.log(data); // Log to check the response structure
  
        const { token, ...user } = data; // Destructure the token and the remaining user data
  
        if (token && user) {
          localStorage.setItem('token', token); // Save token to localStorage
          localStorage.setItem('user', JSON.stringify(user)); // Save user object to localStorage
          alert('Login successful');
          navigate('/home'); // Navigate to home page
        } else {
          alert('Login failed: Missing token or user information');
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        alert(error.message); 
      }
    } else {
      alert("Please enter both username and password");
    }
  };
  
 

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-700'>
          Login to <span className='text-purple-600'>Anime</span>
        </h1>

        {error && <p className='text-red-500 text-sm'>{error}</p>} {/* Error Message */}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Username</label>
            <input
              type="text"
              placeholder='Enter Username'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to='/signup' className='text-sm text-gray-500 hover:text-purple-600 transition duration-200'>
            Don't have an account?
          </Link>
          <button type="submit" className='w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-200'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
