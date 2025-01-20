import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      className="relative flex items-center justify-center h-screen bg-cover bg-center transition-colors duration-300"
      style={{
        backgroundImage: `url('/assets/bookstore-bg.png')`, // Fixed the path for Vite
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(248,241,232,0.8)] dark:bg-black dark:bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-6xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 drop-shadow-xl leading-tight animate-fade-down"
        >
          Discover Your Next{" "}
          <span className="text-blue-500 dark:text-blue-300">Favorite Book</span>
        </h1>
        <p
          className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-fade-in"
        >
          Welcome to{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            BookStore
          </span>
          , where readers find joy and stories come to life. Explore curated
          books, free resources, and exclusive collections.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 animate-fade-up">
          <Link
            to="/free-books"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            Browse Free Books
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
