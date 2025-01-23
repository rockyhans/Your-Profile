import React, { useState, useEffect } from "react";
import axios from "axios";
import "./gpa.css";

function CGPAForm() {
  const [cgpa, setCgpa] = useState("");
  const [percentage, setPercentage] = useState("");
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
      fetchRecords(); // Fetch CGPA records if logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Function to handle saving CGPA
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      // Send POST request to save CGPA and percentage
      await axios.post(
        "https://gpabackend.onrender.com/api/cgpa/save", // Corrected endpoint
        { cgpa, percentage, name, rollNum, collegeName }, // Send both cgpa and percentage
        { headers: { Authorization: `Bearer ${token}` } } // Authorization header with token
      );

      alert("CGPA saved successfully");
      fetchRecords(); // Refresh CGPA records
      setCgpa("");
      setPercentage("");
      setName("");
      setRollNum("");
      setCollegeName("");
    } catch (error) {
      alert(
        "Error saving CGPA: " + (error.response?.data?.error || error.message)
      );
    }
  };

  // Function to fetch saved CGPA records
  const fetchRecords = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      // Send GET request to fetch CGPA records
      const response = await axios.get(
        "https://gpabackend.onrender.com/api/cgpa",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(response.data); // Update state with fetched records
    } catch (error) {
      alert(
        "Error fetching CGPA records: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="CGPAform">
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
              placeholder="Total CGPA"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
            <input
              type="text"
              placeholder="Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <div className="comp3">
            <input
              type="text"
              placeholder="College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>
          <button type="submit">Save CGPA</button>
        </form>
      ) : (
        <p>Please log in to save CGPA.</p>
      )}

      <h3>Saved CGPA Records</h3>
      <ul style={{ width: "100%" }}>
        {records.length > 0 ? (
          records.map((record, index) => (
            <li key={index}>
              <h3>College Name : {record.collegeName}</h3>
              <h3>Name : {record.name} </h3>{" "}
              <h4>Roll Number : {record.rollNum} </h4>{" "}
              <h5> CGPA: {record.cgpa}</h5>
              <h5>Percentage: {record.percentage}% </h5>
            </li>
          ))
        ) : (
          <li>No records found.</li>
        )}
      </ul>
    </div>
  );
}

export default CGPAForm;
