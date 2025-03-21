import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../Style/editStudent.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditStudent() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState([]);
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
  const [initialPayment, setInitialPayment] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;

  useEffect(() => {
    async function getAllStudent() {
      try {
        const response = await axios.get(`${BASE_URL}/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log(response.data);
        setStudentData(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setFatherName(response.data.fatherName);
        setDateOfBirth(response.data.dateOfBirth);
        setBirthTime(response.data.birthTime);
        setNationality(response.data.nationality);
        setAddress(response.data.address);
        setEmail(response.data.email);
        setMobileNumber(response.data.mobileNumber);
        setPhoneNumber(response.data.phoneNumber);
        setDiseases(response.data.diseases);
        setMedicineName(response.data.medicineName);
        setJoiningDate(response.data.joiningDate);
        setEndingDate(response.data.endingDate);
        setWeight(response.data.weight);
        setHeight(response.data.height);
        setSocialNetworkingId(response.data.socialNetworkingId);
        setInitialPayment(response.data.initialPayment);
        setStudentFees(response.data.totalFees);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudent();
  }, []);

  const handleEditStudent = async (e) => {
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
      initialPayment,
      totalFees: studentFees || "0",
    };

    console.log(studentData);
    localStorage.setItem("studentData", JSON.stringify(studentData));
    try {
      const response = await axios.put(
        `${BASE_URL}/student/${id}`,
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
        alert("Student Details Updated Successfully!");
      } else {
        alert("Failed to update Student Details!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2
        style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
      >
        Edit Student Form
      </h2>
      <div className="edit_student_form_wrapper">
        <form onSubmit={handleEditStudent} className="edit_student_form">
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
          <label>Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <label>Birth Time</label>
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
          <label>Joining Date</label>
          <input
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            required
          />
          <label>Ending Date</label>
          <input
            type="date"
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
            placeholder="Enter Initial Payment"
            value={initialPayment}
            onChange={(e) => setInitialPayment(e.target.value)}
            disabled={studentData.transaction?.length > 1}
          />

          <input
            type="text"
            placeholder="Student Fees"
            value={studentFees}
            onChange={(e) => setStudentFees(e.target.value)}
            required
          />
          <button type="submit" className="edit_student_submit_button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditStudent;
