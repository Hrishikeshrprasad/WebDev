// This file contains the API calls for user authentication

// Signup API call
export const signup = async (formData) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed. Please try again.");
    }
  
    return await response.json();
  };
  
  // Login API call
  export const login = async (credentials) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }
  
    return await response.json();
  };
  