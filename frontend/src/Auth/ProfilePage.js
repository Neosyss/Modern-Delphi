import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorBox from "../ErrorBox";
import "./ProfilePage.css";

const ProfilePage = ({ panelType }) => {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isGreen, setIsGreen] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = panelType === 1 
                ? localStorage.getItem("authToken") 
                : localStorage.getItem("adminAuthToken");
            
            if (!token) return;

            try {
                const response = await axios.get(`/api/auth/${panelType === 1 ? "user" : "admin"}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to fetch user details.");
            }
        };

        fetchUserData();
    }, [panelType]);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            const token = panelType === 1 
                ? localStorage.getItem("authToken") 
                : localStorage.getItem("adminAuthToken");

            const response = await axios.post("/api/auth/change-password", {
                userId: user?.user_id,
                currentPassword,
                newPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsGreen(1);
            setError(response.data.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setTimeout(() => {
                setIsGreen(0);
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.error || "Error updating password.");
        }
    };

    const handleLogout = () => {
        if (panelType === 1) {
            localStorage.removeItem("authToken");
        } else {
            localStorage.removeItem("adminAuthToken");
        }
        navigate("/login");
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="profile-page">
            <h3>
                <span className="span fs-small">{panelType === 1 ? "User" : "Admin"} Profile</span> Settings
            </h3>
            
            {message && <p className="message">{message}</p>}
            {error && <ErrorBox message={error} show={true} green={isGreen} onClose={() => setError("")} />}
            
            <div className="mt-5 settings-box">
                <div className="unjustify justify-content-start">
                    <div className="width-label"><h5>Username</h5></div>
                    <div className="width-label"><h5 style={{ color: "var(--sec)" }}>{user.name}</h5></div>
                </div>
                <div className="unjustify justify-content-start">
                    <div className="width-label"><h5>Email</h5></div>
                    <div className="width-label"><h5 style={{ color: "var(--sec)" }}>{user.email}</h5></div>
                </div>
                
                {/* Change Password Section */}
                <h4 className="my-4 mt-5">Change Password</h4>
                <div className="mb-2">
                    <input 
                        type="password" 
                        className="form-control"
                        id="currentPassword"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input 
                        type="password" 
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter new password (min 8 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <input 
                        type="password" 
                        className="form-control"
                        id="confirmNewPassword"
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center text-center">
                    <div className="prb-2 my-3" onClick={handleChangePassword}>
                        <div>Update Password</div>
                    </div>
                </div>
            </div>
            
            {/* Logout Button */}
            <div className="d-flex justify-content-center text-center mt-4">
                <div className="prb-3" onClick={handleLogout}><div className="mx-3">Logout</div></div>
            </div>
        </div>
    );
};

export default ProfilePage;
