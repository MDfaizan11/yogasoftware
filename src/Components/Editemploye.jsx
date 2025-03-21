import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../config";
import "../Style/Editemploye.css";
import { useParams } from "react-router-dom";
function Editemploye() {
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;

  useEffect(() => {
    async function getAllEmploye() {
      try {
        const response = await axios.get(`${BASE_URL}/admin/emp/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setFatherName(response.data.fatherName);
        setLastName(response.data.lastName);
        setMobileNumber(response.data.mobileNumber);
        setAddress(response.data.address);
        setSalary(response.data.salary);
        setJoiningDate(response.data.joiningDate);
      } catch (error) {
        console.log(error);
      }
    }
    getAllEmploye();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      email,
      firstName,
      fatherName,
      lastName,
      mobileNumber,
      address,
      salary,
      joiningDate,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/admin/emp/${id}`,
        updatedEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        alert("Employee updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit_employe_modal_overlay">
      <div className="edit_employe_modal_content">
        <button
          className="edit_employe_form_close_btn"
          onClick={() => window.history.back()}
        >
          X
        </button>
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} className="employee_form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <label>Joining Date</label>
          <input
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            required
          />
          <button type="submit">Update Employee</button>
        </form>
      </div>
    </div>
  );
}

export default Editemploye;
