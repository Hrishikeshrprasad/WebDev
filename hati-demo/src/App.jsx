import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import OneBook from "./components/OneBook";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FreeBooks from "./components/FreeBooks";

const App = () => {
  return (
    <ThemeProvider>
      {/* Navbar is always visible */}
      <Navbar />

      {/* Main Content */}
      <div className="main-content min-h-screen p-4 bg-gray-100 dark:bg-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<OneBook />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/free-books" element={<FreeBooks />} />
          <Route
            path="*"
            element={
              <div className="text-center text-red-500 mt-10">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </div>

      {/* Footer is always visible */}
      <Footer />
    </ThemeProvider>
  );
};

export default App;
