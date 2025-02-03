import React, { useState } from "react";
import "./Login.css"; // Custom CSS for additional styling
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

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
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
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
                                placeholder="Enter your email"
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
                        <div type="submit" className="prb-1 w-100">
                            <div>Login</div>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p className="mb-1">
                            Don't have an account? <a style={{color: 'var(--pri)'}} href="/signup">Sign Up</a>
                        </p>
                        <p>
                            <a style={{color: 'var(--pri)'}} href="/forgot-password">Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;