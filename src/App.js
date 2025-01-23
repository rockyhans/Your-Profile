import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SGPAForm from "./components/SGPAForm";
import CGPAForm from "./components/CGPAForm";
import SignUp from "./components/SignUp";
import FirstPage from "./components/FirstPage";
import "./App.css";
import Userdata from "./components/Userdata";

const isGitHubPages = window.location.hostname === 'rockyhans.github.io';

function App() {
  return (
    <Router basename={isGitHubPages ? "/Your-Profile" : ""}>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sgpa" element={<SGPAForm />} />
        <Route path="/cgpa" element={<CGPAForm />} />
        <Route path="/userdata" element={<Userdata />} />
      </Routes>
    </Router>
  );
}

export default App;
