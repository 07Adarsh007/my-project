import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [confirmPassErr, setConfirmPassErr] = useState(false);
    const [showPass, setShowPass] = useState(false);

    function signUpHandle(e) {
        e.preventDefault();
        if (name.length < 3 || password.length < 3 || password !== confirmPassword) {
            alert("Please provide valid values");
            return;
        }
        // In a real app you'd send registration data to the server here
        alert(`Account created for ${name}!`);
    }

    function nameHandler(e) {
        let item = e.target.value;
        setName(item);
        setNameErr(item.length > 0 && item.length < 3);
    }

    function emailHandler(e) {
        let item = e.target.value;
        setEmail(item);
        setEmailErr(item.length > 0 && !item.includes('@'));
    }

    function passwordHandler(e) {
        let item = e.target.value;
        setPassword(item);
        setPassErr(item.length > 0 && item.length < 3);
        setConfirmPassErr(confirmPassword.length > 0 && item !== confirmPassword);
    }

    function confirmPasswordHandler(e) {
        let item = e.target.value;
        setConfirmPassword(item);
        setConfirmPassErr(item.length > 0 && item !== password);
    }

    const isValid = name.length >= 3 && email.includes('@') && password.length >= 3 && password === confirmPassword;

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="decor-circle" aria-hidden="true"></div>
                <h1>Sign Up</h1>
                <div className="login-subtitle">Create a new account</div>
                <form onSubmit={signUpHandle} noValidate>
                    <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                            value={name}
                            aria-label="name"
                            type="text"
                            placeholder="Enter Full Name"
                            onChange={nameHandler}
                        />
                    </div>
                    {nameErr ? <span className="error">Name must be at least 3 characters</span> : null}

                    <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input
                            value={email}
                            aria-label="email"
                            type="email"
                            placeholder="Enter Email"
                            onChange={emailHandler}
                        />
                    </div>
                    {emailErr ? <span className="error">Please enter a valid email</span> : null}

                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            value={password}
                            aria-label="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder="Enter Password"
                            onChange={passwordHandler}
                        />
                        <button
                            type="button"
                            className="show-btn"
                            onClick={() => setShowPass((s) => !s)}
                            aria-label={showPass ? 'Hide password' : 'Show password'}
                        >
                            {showPass ? '🙈' : '👁️'}
                        </button>
                    </div>
                    {passErr ? <span className="error">Password must be at least 3 characters</span> : null}

                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            value={confirmPassword}
                            aria-label="confirm password"
                            type={showPass ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            onChange={confirmPasswordHandler}
                        />
                    </div>
                    {confirmPassErr ? <span className="error">Passwords do not match</span> : null}

                    <button type="submit" disabled={!isValid}>Sign Up</button>
                </form>
                <div className="signup-link">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;