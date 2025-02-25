import React, { useState, useEffect } from "react";
import "./Login.css"; // Custom CSS for additional styling
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import img from '../images/2.webp';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorBox from '../ErrorBox.js';


const Login = () => {

    const navigate = useNavigate();
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [green, setGreen] = useState(false);
    
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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
                
        if (email == "" || password == "") {
            setError("Please Enter Email and Password.")
            setShowErrorBox(true);
            setTimeout(() => {
                setError('');
            }, 3000)
            return;
        }

        try {
            const response = await axios.post("/api/auth/login", { email, password });
            if (response.status == 200) {
                console.log("Login Successful", response.data);
                if (response.data.userRole == "admin") {
                    localStorage.setItem('adminAuthToken', response.data.token);
                    navigate('/');
                } else if (response.data.userRole == "user") {
                    localStorage.setItem('authToken', response.data.token);
                    navigate('/');
                }
            } else {
                setError('Login Unsuccessful');
                setGreen(true);
                setShowErrorBox(true);
                setTimeout(()=>{
                    setGreen(false);
                }, 3000)
            }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            setShowErrorBox(true);
        }
    };

    const handleCloseErrorBox = () => {
        setShowErrorBox(false);
    };

    return (
        <>
            <ErrorBox
                message={error}
                green={green}
                show={showErrorBox}
                onClose={handleCloseErrorBox}
                timeout={2500}
            />
            <div className="padding-top-login d-flex back-grey-login justify-content-center">
                <div className="col-md-8 col-height-login mt-5">
                    <div className="row d-flex mt-2 justify-content-center padding-row-login">
                        <div className="col-md-6 p-0 mt-3 img-cont-login">
                            <img src={img} className="login-page-img" alt="Welcome" />
                            <h4 className="title-login-page">Welcome to</h4>
                            <h4 className="title2-login-page">Modern Delphi</h4>
                            <h4 className="para-login-page">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis tempore consequuntur.
                            </h4>
                        </div>
                        <div className="col-md-6 p-5 mt-3 login-content">
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
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
                                <div className="mb-3">
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
                                <div onClick={handleSubmit} className="prb-2  w-100 mt-4">
                                    <div>Sign in with Email</div></div>
                            </form>
                            <p className="py-3 px-3 text-center a-links">
                                By clicking the button above, you agree to our <a href="/terms-of-use">Terms of Use and Disclaimers</a>
                            </p>
                            <div className="text-center a-links">
                                Don't Have an account? <a href="/signup">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;