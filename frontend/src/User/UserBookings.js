import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

const UserBookings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [priceData, setPriceData] = useState([]);


    const fetchPriceData = async () => {
        try {
            const response = await axios.get(`/api/price-data`);
            setPriceData(response.data.price_details);

        } catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPriceData();
    }) 


    const fetchBookingsData = async () => {
        try {
            const authToken = localStorage.getItem("authToken"); // Get token from localStorage
            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const decodedToken = jwtDecode(authToken); // Decode token
            const userId = decodedToken.user_id; // Extract user_id (Ensure your JWT has `user_id`)

            const response = await axios.get("/api/user-bookings", {
                headers: { Authorization: `Bearer ${authToken}` } // Send token in headers
            });

            setBookings(response.data);
            setFilteredBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookingsData();
    }, []);

    const openModal = (booking) => {
        setCurrentBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBooking(null);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        filterBookings(value, sortBy);
    };

    const handleSort = (sortValue) => {
        setSortBy(sortValue);
        filterBookings(searchTerm, sortValue);
    };

    const filterBookings = (search, sort) => {
        let filtered = bookings.filter((booking) => {
            return (
                (booking.user_name && booking.user_name.toLowerCase().includes(search.toLowerCase())) ||
                (booking.email && booking.email.toLowerCase().includes(search.toLowerCase()))
            );
        });

        if (sort === "date") {
            filtered.sort((a, b) => new Date(b.meeting_date) - new Date(a.meeting_date));
        } else if (sort === "name") {
            filtered.sort((a, b) => a.user_name.localeCompare(b.user_name));
        }

        setFilteredBookings(filtered);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSortBy("");
        setFilteredBookings(bookings);
    };

    return (
        <div>
            <h3><span className="span fs-small">My</span> Bookings</h3>

            <div className="users-list">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Meeting Date</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.user_name || "N/A"}</td>
                                <td>{booking.user_email || "N/A"}</td>
                                <td>{new Date(booking.meeting_time).toLocaleDateString()}</td>
                                <td>{new Date(booking.meeting_creation_date).toLocaleDateString()}</td>
                                <td>
                                    <div className="prb-2" onClick={() => openModal(booking)}><div>Details</div></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="user-details-modal">
                    <div className="center-user-details p-2">
                        <div className="d-flex justify-content-between">
                            <h4>Booking Details</h4>
                            <IoClose className="cross-svg" onClick={closeModal} />
                        </div>
                        <div className="p-3">
                            <p><strong>User:</strong> {currentBooking?.user_name || "N/A"}</p>
                            <p><strong>Email:</strong> {currentBooking?.user_email || "N/A"}</p>
                            <p><strong>Plan:</strong> { 
                                priceData.find(plan => plan.pricing_id === currentBooking?.pricing_id)?.plan_name || "N/A"
                            }</p>
                            <p><strong>Price Paid:</strong> {currentBooking?.amount || "N/A"}</p>
                            <p><strong>Meeting Date:</strong> {new Date(currentBooking?.meeting_time).toLocaleDateString()}</p>
                            <p><strong>Meeting Time:</strong> {new Date(currentBooking?.meeting_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                            <p><strong>Meeting Link:</strong> <a href={currentBooking?.meeting_link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--pri)'}} >Join Meeting</a></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBookings;
