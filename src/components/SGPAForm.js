import React, { useState, useEffect } from "react";
import axios from "axios";
import "./gpa.css";

function SGPAForm() {
  const [sgpa, setSgpa] = useState("");
  const [percentage, setPercentage] = useState("");
  const [semesterNum, setSemesterNum] = useState("");
  const [name, setName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [records, setRecords] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Check if token exists on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
      fetchRecords(); // Fetch SGPA records if logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Function to handle saving SGPA
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      // Send POST request to save SGPA and percentage
      await axios.post(
        "https://gpabackend.onrender.com/api/sgpa/save", // Corrected endpoint
        { sgpa, percentage, semesterNum, name, rollNum, collegeName }, // Send both sgpa and percentage
        { headers: { Authorization: `Bearer ${token}` } } // Authorization header with token
      );

      alert("SGPA saved successfully");
      fetchRecords(); // Refresh SGPA records
      setSgpa("");
      setPercentage("");
      setSemesterNum("");
      setName("");
      setRollNum("");
      setCollegeName("");
    } catch (error) {
      alert(
        "Error saving SGPA: " + (error.response?.data?.error || error.message)
      );
    }
  };

  // Function to fetch saved SGPA records
  const fetchRecords = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      // Send GET request to fetch SGPA records
      const response = await axios.get(
        "https://gpabackend.onrender.com/api/sgpa",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(response.data); // Update state with fetched records
    } catch (error) {
      alert(
        "Error fetching SGPA records: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="SGPAform">
      {/* Show form only if user is logged in */}
      {isLoggedIn ? (
        <form onSubmit={handleSave}>
          <div className="comp1">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNum}
              onChange={(e) => setRollNum(e.target.value)}
            />
          </div>
          <div className="comp2">
            <input
              type="text"
              placeholder="Semester SGPA"
              value={sgpa}
              onChange={(e) => setSgpa(e.target.value)}
            />
            <input
              type="text"
              placeholder="Semester Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <div className="comp3">
            <input
              type="text"
              placeholder="Semester Number"
              value={semesterNum}
              onChange={(e) => setSemesterNum(e.target.value)}
            />
            <input
              type="text"
              placeholder="College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>

          <button type="submit">Save SGPA</button>
        </form>
      ) : (
        <p>Please log in to save SGPA.</p>
      )}

      <h3>Saved SGPA Records</h3>
      <ul>
        {records.length > 0 ? (
          records.map((record, index) => (
            <li key={index}>
              <h3>College Name : {record.collegeName}</h3>{" "}
              <h3>Name : {record.name} </h3>{" "}
              <h4>Roll Number : {record.rollNum} </h4>{" "}
              <h5>Semester Number : {record.semesterNum} </h5>
              <h5>SGPA: {record.sgpa}</h5>
              <h5>Percentage: {record.percentage}% </h5>{" "}
            </li>
          ))
        ) : (
          <li>No records found.</li>
        )}
      </ul>
    </div>
  );
}

export default SGPAForm;
