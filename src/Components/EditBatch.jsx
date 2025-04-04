import React, { useEffect } from "react";
import { useState } from "react";
import "../Style/editbatch.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function EditBatch({ batchId, onClose }) {

  const { id } = useParams();
  const [batchName, setBatchName] = useState("");
  const [batchStartDate, setBatchStartDate] = useState("");
  const [batchStartTime, setBatchStartTime] = useState("");
  const [batchStatus, setBatchStatus] = useState("");
  const [batchShift, setBatchShift] = useState("");
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;

  useEffect(() => {
    async function getbatch() {
      try {
        const response = await axios.get(`${BASE_URL}/batch/${batchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setBatchName(response.data.batchName);
        setBatchStartDate(response.data.startDate);
        setBatchStartTime(response.data.startTiming);
        setBatchStatus(response.data.batchStatus);
        setBatchShift(response.data.batchShift);
      } catch (error) {
        console.log(error);
      }
    }
    getbatch();
  }, []);

  async function handleupdateBatch(e) {
    e.preventDefault();
    const formdata = {
      batchName,
      startDate: batchStartDate,
      startTiming: batchStartTime,
      batchStatus,
      batchShift,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/batch/${batchId}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Batch updated successfully");
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="edit_batch_wrapper">
        <form className=" Edit_batch_form" onSubmit={handleupdateBatch}>
          <h2 className="Edit_batch_form_heading">Edit Batch</h2>

          <input
            type="text"
            placeholder="Batch Name"
            className="Edit_batch_form_input"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            required
          />

          <input
            type="date"
            className="Edit_batch_form_input"
            value={batchStartDate}
            onChange={(e) => setBatchStartDate(e.target.value)}
            required
          />

          <input
            type="time"
            className="Edit_batch_form_input"
            value={batchStartTime}
            onChange={(e) => setBatchStartTime(e.target.value)}
            required
          />

          <select
            className="Edit_batch_form_select"
            value={batchStatus}
            onChange={(e) => setBatchStatus(e.target.value)}
            required
          >
            <option value="">Select Batch Status</option>
            <option value="UPCOMING">UPCOMING</option>
            <option value="ONGOING">ONGOING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <select
            className="Edit_batch_form_select"
            value={batchShift}
            onChange={(e) => setBatchShift(e.target.value)}
            required
          >
            <option value="">Select Batch Shift</option>
            <option value="MORNING">MORNING</option>
            <option value="AFTERNOON">AFTERNOON</option>
            <option value="EVENING">EVENING</option>
          </select>

          <button type="submit" className="Edit_batch_form_submit_button">
            Update batch
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBatch;
