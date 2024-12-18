const Contact = () => {
    return (
      <section className="p-8 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have questions? We would love to hear from you. Fill out the form below to reach out.
        </p>
        <form className="max-w-md mx-auto">
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Email:</label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Message:</label>
          <textarea
            placeholder="Your message"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </section>
    );
  };
  
  export default Contact;
  