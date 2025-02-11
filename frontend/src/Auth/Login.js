import React, { useState } from "react";
import "./Login.css"; // Custom CSS for additional styling
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import img from '../images/2.webp';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
        <div className="padding-top-login d-flex back-grey-login justify-content-center">
            <div className="col-md-8 col-height-login mt-5">
                <div className="row d-flex mt-2 justify-content-center padding-row-login">
                    <div className="col-md-6 p-0 mt-3 img-cont-login">
                        <img src={img} className=" login-page-img" />
                        <h4 className="title-login-page">Welcome to</h4>
                        <h4 className="title2-login-page">Modern Delphi</h4>
                        <h4 className="para-login-page">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis tempore consequuntur 
                        </h4>
                    </div>
                    <div className="col-md-6 p-5 mt-3 login-content">
                    <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                            <div type="submit" className="prb-1 mt-4 w-100">
                                <div>Sign in with email</div>
                            </div>

                            <p className="py-3 px-3 text-center a-links">By clicking the button above, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>

                            <div className="text-center a-links">
                                Don't Have an account? <a href="signup">Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;