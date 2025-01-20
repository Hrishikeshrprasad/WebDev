import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom"; 
import axios from "axios";

const OneBook = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const [totalPrice, setTotalPrice] = useState(0); // State for total price

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setBookData(response.data);
                setTotalPrice(response.data.price); // Set initial total price
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchBookData();
    }, [id]);

  

    const handleBuyNow = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        alert("Your Order has been placed successfully");
        setIsModalOpen(false); // Close modal after order placement
       
    };

    if (!bookData) {
        return <p>Loading book details...</p>;
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden dark:bg-gray-700">
                <div className="container mx-auto px-5 py-24 ">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
                        <img
                            alt={bookData.name}
                            className="border lg:w-1/2 w-full dark:text-white h-auto object-cover object-center rounded"
                            src={bookData.images}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl font-medium mb-1 dark:text-white">
                                {bookData.title}
                            </h1>
                            <p className="dark:text-white leading-relaxed "> <span className="font-bold">Description:</span> {bookData.description}</p>
                            <p className="leading-relaxed dark:text-white"><span className="font-bold">Category:</span> {bookData.category}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                            <div className="flex">
                                <span className="font-medium text-2xl text-gray-900 dark:text-white">
                                    Rs. {bookData.price}
                                </span>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay fixed top-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="dark:bg-gray-600 modal bg-white p-5 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="dark:text-white text-2xl font-semibold mb-4 flex justify-between">
                                Place Order
                                <IoCloseSharp
                                    className="text-black text-4xl cursor-pointer dark:text-white"
                                    onClick={handleCloseModal}
                                />
                            </h2>
                            <form className="overflow-y-auto max-h-[80vh] p-4" onSubmit={handlePlaceOrder}>
                                <label className="block mb-1 dark:text-white">User Name:</label>
                                <input
                                    type="text"
                                    defaultValue="User Name"
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                <label className="block mb-1 dark:text-white">User Id:</label>
                                <input
                                    type="text"
                                    defaultValue="User Id"
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                <label className="block mb-1 dark:text-white">Email:</label>
                                <input
                                    type="email"
                                    defaultValue="User Email Id"
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                <label className="block mb-1 dark:text-white">Product Id:</label>
                                <input
                                    type="text"
                                    defaultValue={bookData.id}
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                <label className="block mb-1 dark:text-white">Product Name:</label>
                                <input
                                    type="text"
                                    defaultValue={bookData.title}
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                <label className="block mb-1 dark:text-white">Quantity:</label>
                                <input
                                    type="number"
                                    name="order_quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />

                                <label className="block mb-1 dark:text-white">Total Price Per Book:</label>
                                <input
                                    type="text"
                                    defaultValue={totalPrice}
                                    readOnly
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                />
                                {/* <p className="mb-2 dark:text-white">Total Price: Rs. {totalPrice}</p> */}


                                <label className="block mb-1 dark:text-white">Phone Number:</label>
                                <input
                                    type="text"
                                    name="customer_contact_number"
                                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                                <label className="block mb-1 dark:text-white">Address:</label>
                                <input
                                    type="text"
                                    name="customer_address"
                                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                                    required
                                />

                                {/* Payment Method Selection */}
                                <label className="block mb-1 dark:text-white">Payment Method:</label>
                                <select
                                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                                    required
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                    {/* <option value="upi">UPI</option>
                                    <option value="card">Card</option> */}
                                </select>

                                <button
                                    type="submit"
                                    className="mb-10 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default OneBook;