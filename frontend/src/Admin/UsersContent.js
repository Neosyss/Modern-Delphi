import './UsersContent.css'
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

const UsersContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [users] = useState([
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A Name',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
        {
            id: '#1213123123',
            name: 'A nam sad',
            email: 'email@gmail.com',
            appointmentDate: '2021-04-01'
        },
        {
            id: '#1213123123',
            name: 'User Nme',
            email: 'email@gmail.com',
            appointmentDate: '2024-02-01'
        },
    ]);
    
    const [filteredUsers, setFilteredUsers] = useState(users);

    const openModal = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        filterUsers(value, sortBy);
    };

    const handleSort = (sortValue) => {
        setSortBy(sortValue);
        filterUsers(searchTerm, sortValue);
    };

    const filterUsers = (search, sort) => {
        let filtered = users.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.id.includes(search)
        );

        switch (sort) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'date':
                filtered.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
                break;
            default:
                break;
        }

        setFilteredUsers(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSortBy('date');
        setFilteredUsers(users);
    };

    return (
        <>
            {isModalOpen && (
                <>
                    <div className="overfl" onClick={closeModal}></div>
                    <div className="user-details-modal">
                        <div className="center-user-details">
                            <div className="d-flex justify-content-between">
                                <h4>User Details</h4>
                                <IoClose className="cross-svg" onClick={closeModal}/>
                            </div>
                            
                        </div>
                    </div>
                </>
            )}

            <div className="">
                <div className="row m-0">
                    <h3><span className='span fs-small'>User</span> Details</h3>
                    
                    <div className="filter-row  bg-light rounded mb-4">
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
                                    <option value="name">Sort by Name</option>
                                    <option value="date">Sort by Appointment Date</option>
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
                                    <th className="px-3" scope="col">Name</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Appointment Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className='px-3'>{user.name}</td>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date(user.appointmentDate).toLocaleDateString()}</td>
                                        <td>
                                            <div className="prb-1" onClick={() => openModal(user)}>
                                                <div className='m-0 px-3 p-1'>Details</div>
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
}

export default UsersContent;