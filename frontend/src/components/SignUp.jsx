import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "./api"; // Import the signup function from api.js

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Use the signup function from api.js
      const data = await signup({
        username: formData.fullname.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess(true);
      alert("Signup Successful! Redirecting to login...");

      // Reset form and navigate to login page
      setFormData({ fullname: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-white">
          Sign Up
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Signup successful!</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
