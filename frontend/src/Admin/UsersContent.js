import './UsersContent.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const UsersContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const fetchUsersData = async () => {
        try {
            const response = await axios.get(`/api/all-users`);
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, []);


    const handleSearch = (value) => {
        setSearchTerm(value);
        filterUsers(value, sortBy);
    };

    const handleSort = (sortValue) => {
        setSortBy(sortValue);
        filterUsers(searchTerm, sortValue);
    };

    const filterUsers = (search, sort) => {
        let filtered = users.filter(user => {
            return (
                (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
                (user.user_id && user.user_id.toString().includes(search))
            );
        });

        if (sort === 'pending') {
            filtered.sort((a, b) => b.pending_appointments - a.pending_appointments); // Sort by highest pending first
        } else if (sort === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredUsers(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSortBy('');
        setFilteredUsers(users);
    };

    return (
        <>

            <div className="">
                <div className="row m-0">
                    <h3><span className='span fs-small'>User</span> Details</h3>
                    
                    <div className="filter-row bg-light rounded mb-4">
                        <div className="row">
                            <div className="col-md-4 mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, email, or ID"
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
                                    <option value="pending">Show Pending First</option>
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
                                    <th scope="col">User ID</th>
                                    <th className="px-3" scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Confirmed Appointments</th>
                                    <th scope="col">Unscheduled (Paid)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td className='px-3'>{user.name || 'N/A'}</td>
                                        <td>{user.email || 'N/A'}</td>
                                        <td>{user.booked_appointments || 0}</td>
                                        <td>{user.pending_appointments || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersContent;
