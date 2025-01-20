import { useEffect, useState } from "react";

const FreeBooks = () => {
  // State to hold book list
  const [books, setBooks] = useState([]);

  // Static Free Books Data
  const freeBooksData = [
    {
      id: 1,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Classic Fiction",
      image: "/assets/pride-and-prejudice.png",
      link: "https://www.gutenberg.org/ebooks/1342",
    },
    {
      id: 2,
      title: "Moby-Dick",
      author: "Herman Melville",
      category: "Adventure Fiction",
      image: "/assets/moby-dick.png",
      link: "https://www.gutenberg.org/ebooks/2701",
    },
    {
      id: 3,
      title: "Frankenstein",
      author: "Mary Shelley",
      category: "Gothic Fiction",
      image: "/assets/frankenstein.png",
      link: "https://www.gutenberg.org/ebooks/84",
    },
    {
      id: 4,
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      category: "Mystery",
      image: "/assets/sherlock-holmes.png",
      link: "https://www.gutenberg.org/ebooks/1661",
    },
    {
      id: 5,
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      category: "Historical Fiction",
      image: "/assets/tale-of-two-cities.png",
      link: "https://www.gutenberg.org/ebooks/98",
    },
  ];

  // Simulate API Fetch
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating a delay
        setBooks(freeBooksData); // Set static book data
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="text-gray-600 body-font dark:bg-gray-800">
      <div className="container px-5 py-20 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900 dark:text-white">
            Free Books to Read
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 dark:text-gray-300">
            Explore and enjoy timeless classics and must-reads, absolutely free. Dive into
            adventure, mystery, and literary treasures today!
          </p>
        </div>

        {/* Book Cards */}
        <div className="flex flex-wrap justify-center -m-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="lg:w-1/5 md:w-1/3 sm:w-1/2 p-4 m-2 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:shadow-xl transition-transform transform hover:scale-105"
              >
                {/* Book Image */}
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-64 overflow-hidden rounded-t-lg"
                >
                  <img
                    src={book.image || "/assets/placeholder.png"}
                    alt={book.title}
                    className="object-cover object-center w-full h-full"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder.png"; // Fallback image
                    }}
                  />
                </a>

                {/* Book Details */}
                <div className="p-4">
                  <h2 className="text-sm font-medium text-blue-500 uppercase mb-1">
                    {book.category}
                  </h2>
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {book.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Author: {book.author}
                  </p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-block transition duration-300"
                  >
                    Read Now &rarr;
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center mt-8">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                No free books available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeBooks;
