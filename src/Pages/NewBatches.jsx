import React, { useEffect, useState } from "react";
import "../Style/newbatch.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditBatch from "../Components/EditBatch";
import { BASE_URL } from "../config";
function NewBatches() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [refreshKey, setrefreshKey] = useState(0);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [batchStartDate, setBatchStartDate] = useState("");
  const [batchStartTime, setBatchStartTime] = useState("");
  const [batchEndTime, setBatchEndTime] = useState("");
  const [batchStatus, setBatchStatus] = useState("");
  const [batchShift, setBatchShift] = useState("");
  const [batches, setBatches] = useState([]);

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [diseases, setDiseases] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [socialNetworkingId, setSocialNetworkingId] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const [batchId, setBatchId] = useState("");
  const [InitaialPayment, setInitaialPayment] = useState("");

  const [editBatchId, setEditBatchId] = useState(null);

  async function handleAddBatch(e) {
    e.preventDefault();

    if (!id) {
      alert("Invalid branch ID.");
      return;
    }

    const formData = {
      batchName,
      startTiming: batchStartTime,
      startDate: batchStartDate,
      batchStatus,
      batchShift,
      endingDate: batchEndTime,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/batch/branch/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Batch Created:", response.data);
      setrefreshKey((prev) => prev + 1);
      if (response.status === 200) {
        alert("Batch created successfully");
        setShowBatchForm(false);
        setBatchName("");
        setBatchStartDate("");
        setBatchStartTime("");
        setBatchStatus("");
        setBatchShift("");
      }
    } catch (error) {
      console.error(
        "Error creating batch:",
        error.response?.data || error.message
      );
      alert("Failed to create batch. Check console for details.");
    }
  }

  useEffect(() => {
    async function gettingBatches() {
      try {
        const response = await axios.get(
          `${BASE_URL}/batch/list/branch/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setBatches(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    gettingBatches();
  }, [id, token, refreshKey]);

  function handlebatchId(id) {
    setBatchId(id);
    setShowStudentForm(true);
  }
  async function handleAddStudent(e) {
    e.preventDefault();
    const studentData = {
      firstName,
      lastName,
      fatherName,
      dateOfBirth,
      birthTime,
      nationality,
      address,
      email,
      mobileNumber,
      phoneNumber,
      diseases,
      medicineName,
      joiningDate,
      endingDate,
      weight,
      height,
      socialNetworkingId,
      totalFees: studentFees,
      initialPayment: InitaialPayment,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/student/register/batch/${batchId}`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Student added successfully");
        setShowStudentForm(false);
        setFirstName("");
        setLastName("");
        setFatherName("");
        setDateOfBirth("");
        setBirthTime("");
        setNationality("");
        setAddress("");
        setEmail("");
        setMobileNumber("");
        setPhoneNumber("");
        setDiseases("");
        setMedicineName("");
        setJoiningDate("");
        setEndingDate("");
        setWeight("");
        setHeight("");
        setSocialNetworkingId("");
        setStudentFees("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleVewStident(id) {
    navigate(`/studentsList/${id}`);
  }
  function handleEditBatch(batchId) {
    setEditBatchId(batchId);
  }
  function closeEditPopup() {
    setEditBatchId(null);
    setrefreshKey((prev) => prev + 1);
  }
  return (
    <>
      <div className="create_new_batch">
        <button onClick={() => setShowBatchForm(true)}>Create New Batch</button>
      </div>

      {showBatchForm && (
        <div className="create_batch_form_wrapper">
          <div className="create_batch_form_container">
            <button
              onClick={() => setShowBatchForm(false)}
              className="create_batch_form_close_button"
            >
              ✖
            </button>
            <form className="create_batch_form" onSubmit={handleAddBatch}>
              <h2 className="create_batch_form_heading">Create Batch</h2>

              <input
                type="text"
                placeholder="Batch Name"
                className="create_batch_input"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                required
              />
              <label htmlFor=""> Batch Start Date:</label>
              <input
                type="date"
                className="create_batch_input"
                value={batchStartDate}
                onChange={(e) => setBatchStartDate(e.target.value)}
                required
              />
              <label htmlFor=""> Batch End Date:</label>
              <input
                type="date"
                className="create_batch_input"
                value={batchEndTime}
                onChange={(e) => setBatchEndTime(e.target.value)}
                required
              />
              <label htmlFor="">Batch Time</label>
              <input
                type="time"
                className="create_batch_input"
                value={batchStartTime}
                onChange={(e) => setBatchStartTime(e.target.value)}
                required
              />

              <select
                className="create_batch_form_select"
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
                className="create_batch_form_select"
                value={batchShift}
                onChange={(e) => setBatchShift(e.target.value)}
                required
              >
                <option value="">Select Batch Shift</option>
                <option value="MORNING">MORNING</option>
                <option value="AFTERNOON">AFTERNOON</option>
                <option value="EVENING">EVENING</option>
              </select>

              <button type="submit" className="create_batch_form_submit_button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="batches-container">
        <h2 className="batches-heading">Available Batches</h2>
        <div className="batches-grid">
          {batches.length > 0 ? (
            batches.map((item, index) => (
              <div key={index} className="batch-card">
                <h3 className="batch-name">{item.batchName}</h3>
                <div className="batch-info">
                  <p>
                    <strong>Shift:</strong> {item.batchShift}
                  </p>
                  <p>
                    <strong>Status:</strong> {item.batchStatus}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(item.startDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(item.endingDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {item.startTiming}
                  </p>
                </div>
                <div className="batches_action_container">
                  <div className="view_detail">
                    <button
                      className="view_batch_detail"
                      onClick={() => handleVewStident(item.batchId)}
                    >
                      View Details
                    </button>
                  </div>
                  <div className="action_button">
                    <abbr title="Add Student">
                      <button className="add_batch_student">
                        <IoPersonAddSharp
                          onClick={() => handlebatchId(item.batchId)}
                        />
                      </button>
                    </abbr>
                    <abbr title="Edit">
                      <button
                        className="batch_edit_button"
                        onClick={() => handleEditBatch(item.batchId)}
                      >
                        <AiFillEdit />
                      </button>
                    </abbr>
                    <abbr title="Delete">
                      <button className="batch_delete_button">
                        <MdDelete />
                      </button>
                    </abbr>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-batches">No Batches Available</p>
          )}
        </div>
      </div>

      {editBatchId && (
        <div className="edit_batch_modal">
          <div className="edit_batch_modal_content">
            <button onClick={closeEditPopup} className="close_modal_button">
              ✖
            </button>
            <EditBatch batchId={editBatchId} onClose={closeEditPopup} />
          </div>
        </div>
      )}

      {showStudentForm && (
        <div className="student_main_wrapper">
          <div className="student-form-overlay">
            <div className="student-form-container">
              <button
                className="close-button"
                onClick={() => setShowStudentForm(false)}
              >
                ✖
              </button>
              <h2>Add Student</h2>
              <form onSubmit={handleAddStudent}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  placeholder="Father's Name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                />
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label htmlFor="birthTime">Birth Time</label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Diseases (if any)"
                  value={diseases}
                  onChange={(e) => setDiseases(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                />
                <label htmlFor="birthTime">joining Date</label>
                <input
                  type="date"
                  placeholder="Joining Date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                />
                <label htmlFor="birthTime">ending Date</label>

                <input
                  type="date"
                  placeholder="Ending Date"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Height (ft)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Social Networking ID"
                  value={socialNetworkingId}
                  onChange={(e) => setSocialNetworkingId(e.target.value)}
                />
                <input
                  type="text"
                  value={InitaialPayment}
                  onChange={(e) => setInitaialPayment(e.target.value)}
                  placeholder="Enter Initaial Payment"
                />

                <input
                  type="text"
                  placeholder="Student Fees"
                  value={studentFees}
                  onChange={(e) => setStudentFees(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewBatches;
