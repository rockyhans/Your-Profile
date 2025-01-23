import React, { useState } from "react";
import "./home.css";
import Signup from "./SignUp";
import LoginForm from "./Login";

function FirstPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="mainPage">
      <h2>Build Your Profile:</h2>
      <div className="signUp">
        <p>Signup with your User Name, Email, and Password:</p>
        <button onClick={() => setShowSignup(!showSignup)} className="special">
          {showSignup ? "Click Submit" : "Signup Here"}
        </button>

        {showSignup && (
          <div className="signUpForm">
            <Signup />
          </div>
        )}
      </div>

      <div className="login">
        <p>Login with your Email, and Password:</p>
        <button onClick={() => setShowLogin(!showLogin)} className="special">
          {showSignup ? "Click Submit" : "Login Here"}
        </button>

        {showLogin && (
          <div className="loginForm">
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstPage;
