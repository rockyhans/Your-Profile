import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SGPAForm from "./components/SGPAForm";
import CGPAForm from "./components/CGPAForm";
import SignUp from "./components/SignUp";
import FirstPage from "./components/FirstPage";
import "./App.css";
import Userdata from "./components/Userdata";
function App() {
  return (
    <BrowserRouter basename="/Your-Profile">
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sgpa" element={<SGPAForm />} />
        <Route path="/cgpa" element={<CGPAForm />} />
        <Route path="/userdata" element={<Userdata />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
