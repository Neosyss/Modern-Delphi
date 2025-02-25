import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; 
import img from '../images/2.webp';
import ErrorBox from '../ErrorBox.js';

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("authToken");
        const adminToken = localStorage.getItem("adminAuthToken");

        if (adminToken) {
            navigate("/");
        } else if (userToken) {
            navigate("/");
        }

        const handleEnterPress = (e) => {
            if (e.key === "Enter") {
                handleSubmit(e);
            }
        };

        window.addEventListener("keydown", handleEnterPress);
        return () => {
            window.removeEventListener("keydown", handleEnterPress);
        };

    }, []);

    

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPassword ){
            setError("Please Fill all details.");
            setShowErrorBox(true);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            setShowErrorBox(true);
            return;
        }

      
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setShowErrorBox(true);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setShowErrorBox(true);
            return;
        }

        if (!agreeTerms) {
            setError("You must agree to the terms and conditions to proceed.");
            setShowErrorBox(true);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("/api/auth/signup", {
                fullName,
                email,
                password
            });

            const { token, role } = response.data;

            if (role === "admin") {
                localStorage.setItem("adminAuthToken", token);
                navigate("/");
            } else {
                localStorage.setItem("authToken", token);
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
            setShowErrorBox(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseErrorBox = () => {
        setShowErrorBox(false);
    };

    return (
        <>
            <ErrorBox
                message={error}
                show={showErrorBox}
                onClose={handleCloseErrorBox}
                timeout={2500}
            />

            <div className="padding-top-login d-flex back-grey-signup justify-content-center">
                <div className="col-md-8 col-height-login mt-5">
                    <div className="row padding-row-login d-flex mt-2 justify-content-center">
                        <div className="col-md-6 p-0 mt-3 img-cont-login">
                            <img src={img} className="login-page-img" alt="Signup" />
                            <h4 className="title-login-page">Welcome to</h4>
                            <h4 className="title2-login-page">Modern Delphi</h4>
                            <h4 className="para-login-page">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            </h4>
                        </div>
                        <div className="col-md-6 p-4 px-5 mt-3 login-content signup-content">
                            <h2 className="text-center mb-3">Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="email@address.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                               
                                <div className="my-2 mt-3">
                                    <input
                                        type="checkbox"
                                        id="agreeTerms"
                                        className="move-down"
                                        checked={agreeTerms}
                                        onChange={() => setAgreeTerms(!agreeTerms)}
                                    />
                                    <label htmlFor="agreeTerms" className="ms-2 a-links">I agree to the  <a target="_blank" href="/terms-of-use"> Terms of Use and Disclaimers</a> </label>
                                </div>
                                <div onClick={handleSubmit} className="prb-2 w-100 my-3" disabled={loading || !agreeTerms}>
                                    <div>{loading ? "Signing Up..." : "Sign up with email"}</div>
                                </div>
                                <div className="text-center a-links">
                                    Already have an account? <a href="login">Sign In</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;