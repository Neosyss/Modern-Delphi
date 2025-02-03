import "./HomeContent.css";
import { useState } from "react";

const HomeContent = () => {
    const [dateFilter, setDateFilter] = useState("overall"); // Default filter

    const [traffic, setTraffic] = useState(1530); // Example traffic value
    const [users, setUsers] = useState(2300000); // Example users value
    const [appointments, setAppointments] = useState(130); // Example appointments value

    // Utility function to format numbers
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`; // Convert to millions (e.g., 1.5M)
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`; // Convert to thousands (e.g., 1.5K)
        } else {
            return num.toString(); // Return as is for numbers less than 1000
        }
    };

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
        // Add logic to filter data based on the selected date range
        console.log("Selected Date Filter:", value);
    };

    return (
        <>
            {/* Date Filter Row */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="filter-row bg-light rounded p-3">
                        <div className="row">
                            <div className="col-md-2">
                                <h4><span className="span fs-small">Statistics</span></h4>
                            </div>
                            <div className="col-md-4 d-flex justify-content-start">
                                <div className="col-md-2 w-25 mt-2 mx-3">Select Date </div>
                                <select
                                    className="form-select"
                                    value={dateFilter}
                                    onChange={(e) => handleDateFilterChange(e.target.value)}
                                >
                                    <option value="today">Today</option>
                                    <option value="thisWeek">This Week</option>
                                    <option value="thisMonth">This Month</option>
                                    <option value="last6Months">Last 6 Months</option>
                                    <option value="last1Year">Last 1 Year</option>
                                    <option value="overall">Overall</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Boxes */}
            <div className="row">
                <div className="col-md-4">
                    <div className="boxesHomeC no-select">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <h4 className="text-light">Traffic</h4>
                        <h1 className="text-light stats-count">{formatNumber(traffic)}</h1>
                        <h1 className="text-light stats-count-2">{formatNumber(traffic)}</h1>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="boxesHomeC no-select spe">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <h4 className="text-light">Appointments</h4>
                        <h1 className="text-light stats-count">{formatNumber(appointments)}</h1>
                        <h1 className="text-light stats-count-2">{formatNumber(appointments)}</h1>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="boxesHomeC no-select">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <h4 className="text-light">Customers</h4>
                        <h1 className="text-light stats-count">{formatNumber(users)}</h1>
                        <h1 className="text-light stats-count-2">{formatNumber(users)}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContent;