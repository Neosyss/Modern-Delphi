import React, { useState } from "react";
import "./Signup.css"; 
import img from '../images/2.webp'; // Assuming you use the same image
import ErrorBox from '../ErrorBox.js';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showErrorBox, setShowErrorBox] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setShowErrorBox(true);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 8 characters or longer");
            setShowErrorBox(true);
            return;
        }

        // Clear any previous errors
        setError("");
        setShowErrorBox(false);

        // Add your signup logic here
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);

        // You can add API calls or further logic here
    };

    const handleCloseErrorBox = () => {
        setShowErrorBox(false);
    };

    return (
        <>
            {/* Render the ErrorBox component */}
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
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis tempore consequuntur 
                            </h4>
                        </div>
                        <div className="col-md-6 p-4 px-5 mt-3 login-content signup-content">
                            <h2 className="text-center mb-3">Sign Up</h2>
                            <form>
                                <div className="mb-2">
                                    <label htmlFor="fullName" className="form-label">
                                        Full Name
                                    </label>
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
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
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
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
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
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
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
                                <div type="submit" onClick={handleSubmit} className="prb-1 w-100 mt-4">
                                    <div>Sign up with email</div>
                                </div>

                                <p className="pt-3 px-3 text-center a-links">
                                    By clicking the button above, you agree to our{" "}
                                    <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                                </p>

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