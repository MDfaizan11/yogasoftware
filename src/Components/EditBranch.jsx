import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";
function EditBranch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;

  useEffect(() => {
    async function getAllBranch() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/branch/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        const { city, address, branchName } = response.data;
        setBranchName(branchName);
        setAddress(address);
        setCity(city);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBranch();
  }, []);

  async function handleUpdateBranch(e) {
    e.preventDefault();
    const formdata = {
      branchName,
      address,
      city,
    };
    try {
      const response = await axios.put(`${BASE_URL}/branch/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("Branch updated successfully");
        navigate("/batch");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="add_branch_main_wrapper">
        <button
          className="add_branch_back_button"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="addbranch_form_wrapper">
          <form className="add_branch_form" onSubmit={handleUpdateBranch}>
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
              Update Branch
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBranch;
