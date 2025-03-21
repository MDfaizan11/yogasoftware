import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "../Style/StudentAttendenceSction.css";

function StudentAttendanceSection() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [selectDate, setSelectDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [studentList, setStudentList] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getStudentAttendance() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${BASE_URL}/attendance/batch/${id}/attendanceDate/${selectDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setStudentList(response.data);
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.studentId] = student.isPresent;
        });
        setAttendanceData(initialAttendance);
      } catch (error) {
        setError("Failed to fetch attendance data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getStudentAttendance();
  }, [selectDate, id, token]);

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const attendancePayload = Object.entries(attendanceData).map(
        ([studentId, isPresent]) => ({
          studentId: parseInt(studentId),
          isPresent,
        })
      );

      const response = await axios.post(
        `${BASE_URL}/attendance/batch/${id}/attendanceDate/${selectDate}`,
        attendancePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Attendance submitted successfully:", response.data);
      alert("Attendance submitted successfully");
      const refreshResponse = await axios.get(
        `${BASE_URL}/attendance/batch/${id}/attendanceDate/${selectDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudentList(refreshResponse.data);
      const updatedAttendance = {};
      refreshResponse.data.forEach((student) => {
        updatedAttendance[student.studentId] = student.isPresent;
      });
      setAttendanceData(updatedAttendance);
    } catch (error) {
      setError(
        "Failed to submit attendance: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const presentCount = Object.values(attendanceData).filter(
    (isPresent) => isPresent === true
  ).length;
  return (
    <>
      <div className="student_attendence_table_wrapper">
        <h1 className="student_attendence_table_heading">Student Attendance</h1>

        <input
          type="date"
          value={selectDate}
          onChange={(e) => setSelectDate(e.target.value)}
          className="date-input"
          max={new Date().toISOString().split("T")[0]}
        />
        <p>Total Students: {studentList.length}</p>
        <p>Present: {presentCount}</p>
        <p>Absent: {studentList.length - presentCount}</p>

        {loading && (
          <p className="loading-message">Loading attendance data...</p>
        )}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && studentList.length > 0 && (
          <form onSubmit={handleSubmit}>
            <table className="student_attendence_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Mobile</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => {
                  const presentCOunt = student.isPresent === true;
                  console.log(presentCOunt.length);
                  return (
                    <>
                      <tr key={student.studentId}>
                        <td>
                          {student.firstName} {student.lastName}
                        </td>
                        <td>{student.fatherName}</td>
                        <td>{student.mobileNumber}</td>
                        <td>
                          <label>
                            <input
                              type="radio"
                              name={`attendance-${student.studentId}`}
                              checked={
                                attendanceData[student.studentId] === true
                              }
                              onChange={() =>
                                handleAttendanceChange(student.studentId, true)
                              }
                            />
                            Present
                          </label>
                          <label>
                            <input
                              type="radio"
                              name={`attendance-${student.studentId}`}
                              checked={
                                attendanceData[student.studentId] === false
                              }
                              onChange={() =>
                                handleAttendanceChange(student.studentId, false)
                              }
                            />
                            Absent
                          </label>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit Attendance"}
            </button>
          </form>
        )}

        {!loading && !error && studentList.length === 0 && (
          <p className="loading-message">
            No attendance records found for {selectDate}
          </p>
        )}
      </div>
    </>
  );
}

export default StudentAttendanceSection;
