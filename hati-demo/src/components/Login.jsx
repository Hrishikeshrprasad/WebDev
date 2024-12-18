import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api'; // Import the login function from api.js

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Use the login function from api.js
      const data = await login({ 
        email: formData.email, 
        password: formData.password 
      });

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      setSuccess(true);
      alert('Login Successful!');

      // Reset form and navigate to home page
      setFormData({ email: '', password: '' });
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed!'); // Better error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Don't have an account?{' '}
          <a className="text-blue-600 hover:underline" href="/signup">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
