import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [userErr, setUserErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);

    function loginHandle(e) {
        e.preventDefault()
        if (user.length < 3 || password.length < 3) {
            alert("Please provide valid values (min 3 characters)")
            return
        }
        // In a real app you'd send credentials to the server here
        alert(`Welcome ${user}! ${remember ? 'We will remember you.' : ''}`)
    }
    function userHandler(e) {
        let item = e.target.value
        setUser(item)
        setUserErr(item.length > 0 && item.length < 3)
    }

    function passwordHandler(e) {
        let item = e.target.value
        setPassword(item)
        setPassErr(item.length > 0 && item.length < 3)
    }
        const isValid = user.length >= 3 && password.length >= 3

        return (
                <div className="login-wrapper">
                        <div className="login-box">
                                <div className="decor-circle" aria-hidden="true"></div>
                                <h1>Sign In</h1>
                                <div className="login-subtitle">Sign in to continue to your dashboard</div>
                             <form onSubmit={loginHandle} noValidate>
                                <div className="input-group">
                                    <span className="input-icon">👤</span>
                                    <input
                                        value={user}
                                        aria-label="username"
                                        type="text"
                                        placeholder="Enter Name"
                                        onChange={userHandler}
                                    />
                                </div>
                                {userErr ? <span className="error">Name must be at least 3 characters</span> : null}

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

                                <div className="actions">
                                    <label className="remember">
                                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                                        Remember me
                                    </label>
                                    <a className="forgot" href="#">Forgot?</a>
                                </div>

                                <button type="submit" disabled={!isValid}>Sign In</button>
                             </form>
                             <div className="signup-link">
                                New user? <Link to="/signup">Sign Up</Link>
                             </div>
                        </div>
                </div>
        )
}

export default SignIn;