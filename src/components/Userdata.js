import React, { useState } from "react";
import SGPAForm from "./SGPAForm";
import CGPAForm from "./CGPAForm";

function Userdata() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <div className="mainPage">
        <h2>Save Your Result:</h2>
        <div className="signUp">
          <p>Save Your SGPA Result:</p>
          <button
            onClick={() => setShowSignup(!showSignup)}
            className="special"
          >
            {showSignup ? "Click BTN" : "For SGPA"}
          </button>

          {showSignup && (
            <div className="signUpForm">
              <SGPAForm />
            </div>
          )}
        </div>

        <div className="login">
          <p>Save Your CGPA Result:</p>
          <button onClick={() => setShowLogin(!showLogin)} className="special">
            {showSignup ? "Click BTN" : "For CGPA"}
          </button>

          {showLogin && (
            <div className="loginForm">
              <CGPAForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userdata;
