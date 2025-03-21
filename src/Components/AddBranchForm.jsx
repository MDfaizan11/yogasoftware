import React, { useEffect } from "react";
import { useState } from "react";
import "../Style/addbranch.css";
import axios from "axios";
import { BASE_URL } from "../config";
function AddBranchForm() {
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  console.log(token);
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  async function handleaddbranch(e) {
    e.preventDefault();
    const formdata = {
      branchName,
      address,
      city,
    };
    try {
      const response = await axios.post(`${BASE_URL}/branch/`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Branch Added Successfully");
      }
      setBranchName("");
      setAddress("");
      setCity("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="crete_branch_heading">Create Your Branch</h1>
      <div className="add_branch_main_wrapper">
        <button
          className="add_branch_back_button"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="addbranch_form_wrapper">
          <form onSubmit={handleaddbranch} className="add_branch_form">
            <label className="add_branch_form_label">Branch Name:</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter Branch Name"
              required
              className="add_branch_form_input"
            />

            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
            />

            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
              required
            />

            <button type="submit" className="add_branch_form_submit_button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBranchForm;
