import "./UsersContent.css"; // Reusing the same CSS
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    const fetchBookingsData = async () => {
        try {
            const response = await axios.get(`/http://82.180.132.121:5000/api/all-bookings`);
            setBookings(response.data);
            console.log(response.data);
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
        <>
            {isModalOpen && (
                <>
                    <div className="overfl" onClick={closeModal}></div>
                    <div className="user-details-modal">
                        <div className="center-user-details p-2">
                            <div className="d-flex  justify-content-between">
                                <h4><span className="span fs-small">Booking</span> Details</h4>
                                <IoClose className="cross-svg" onClick={closeModal} />
                            </div>
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>User: </strong> {currentBooking?.user_name || "N/A"}</p>
                                        <p><strong>Email: </strong> {currentBooking?.user_email || "N/A"}</p>
                                        <p><strong>Payment ID: </strong> {currentBooking?.payment_intent_id || "N/A"}</p>
                                        
                                    </div>
                                    <div className="col-md-6">
                                    <p><strong>Price Plan: </strong> {currentBooking?.pricing_id || "N/A"}</p>

                                    <p><strong>Meeting Creation Date: </strong>
                                        {(() => {
                                                if (currentBooking.meeting_creation_date){
                                                    const dateObj = new Date(currentBooking.meeting_creation_date);
                                                    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear() || "NAN"}`;
                                                }
                                                else{
                                                    return 'NAN'
                                                }
                                            })()}
                                            </p>
                                            <p><strong>Meeting Date: </strong>
                                            {(() => {
                                                if (currentBooking.meeting_time){
                                                    const dateObj = new Date(currentBooking.meeting_time);
                                                    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear() || "NAN"}`;
                                                }
                                                else{
                                                    return 'NAN'
                                                }
                                            })()}
                                            </p>
                                            <p><strong>Meeting Time: </strong>
                                            {(() => {
                                                if (currentBooking.meeting_time){
                                                    const dateObj = new Date(currentBooking.meeting_time);
                                                    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });  
                                                }
                                                else{
                                                    return 'NAN'
                                                }
                                            })()}
                                            </p>
                                        <p><strong>Meeting Link: </strong> <a href={currentBooking?.meeting_link} target="_blank" rel="noopener noreferrer" style={{color: "var(--pri)"}} >Join Meeting</a></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="">
                <div className="row m-0">
                    <h3><span className="span fs-small">Bookings</span> List</h3>

                    <div className="filter-row bg-light rounded mb-4">
                        <div className="row">
                            <div className="col-md-4 mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name or email"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3 mt-2">
                                <select
                                    className="form-select"
                                    value={sortBy}
                                    onChange={(e) => handleSort(e.target.value)}
                                >
                                    <option value="">Apply Filter</option>
                                    <option value="date">Sort by Date</option>
                                    <option value="name">Sort by Name</option>
                                </select>
                            </div>
                            <div className="col-md-2 mt-2">
                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={clearFilters}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

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
                                        <td>
                                            {(() => {
                                                 if (booking.meeting_time){
                                                    const dateObj = new Date(booking.meeting_time);
                                                    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear() || "NAN"}`;
                                                }
                                                else{
                                                    return 'NAN'
                                                }
                                            })()}
                                        </td>
                                        <td>
                                            {(() => {
                                                if (booking.meeting_creation_date){
                                                    const dateObj = new Date(booking.meeting_creation_date);
                                                    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear() || "NAN"}`;
                                                }
                                                else{
                                                    return 'NAN'
                                                }
                                            })()}
                                        </td>
                                        <td>
                                            <div className="prb-1" onClick={() => openModal(booking)} style={{ cursor: "pointer" }}
                                            >
                                                <div>Details</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bookings;
