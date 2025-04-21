import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
function EditLead() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [foundOn, setFoundOn] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getAllLead() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/lead/getlead/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setWhatsappNumber(response.data.whatappNumber);
        setFoundOn(response.data.foundOn);
        setStatusMode(response.data.statusMode);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    }
    getAllLead();
  }, []);

  const handleEditLead = async (e) => {
    e.preventDefault();
    const updatedLead = {
      name,
      email,
      phoneNumber,
      whatappNumber: whatsappNumber,
      foundOn,
      statusMode,
      status,
    };
    try {
      const response = await axios.put(`${BASE_URL}/lead/${id}`, updatedLead, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("Lead updated successfully");
        navigate("/lead");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleback() {
    window.history.back();
  }
  return (
    <div className="lead-overlay">
      <div className="lead-container">
        <button className="lead_close-button" onClick={handleback}>
          ✖
        </button>
        <h2 className="modal-title">Edit Lead</h2>

        <form className="lead-form" onSubmit={handleEditLead}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>WhatsApp Number</label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
          />

          <label>Found On</label>
          <input
            type="date"
            value={foundOn}
            onChange={(e) => setFoundOn(e.target.value)}
            required
          />

          <label>Status Mode</label>
          <select
            value={statusMode}
            onChange={(e) => setStatusMode(e.target.value)}
            required
          >
            <option value="">Select Status Mode</option>
            <option value="ONLINE">ONLINE</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>

          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="NEW_LEAD">NEW LEAD</option>
            <option value="FOLLOW_UP">FOLLOW UP</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <button type="submit" className="lead_submit-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLead;
