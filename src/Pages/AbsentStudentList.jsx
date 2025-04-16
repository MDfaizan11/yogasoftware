import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import "../Style/absentStudentList.css";
import axiosInstance from "../utils/axiosInstance";

function AbsentStudentList() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [absentStudentList, setAbsentStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllAbsentStudentList() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${BASE_URL}/employee/student/overdue/fee/alert/batch/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAbsentStudentList(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch student data");
        setLoading(false);
        console.log(error);
      }
    }
    getAllAbsentStudentList();
  }, [id, token]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="absent-student-container">
      <h1 className="absent_title">Absent Student List</h1>
      {absentStudentList.length > 0 ? (
        <div className="absent_student_table_container">
          <table className="absent_student_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Father's Name</th>
                <th>Mobile</th>
                <th>Joining Date</th>
                <th>Next Installment</th>
                <th>Paid Amount</th>
                <th>Remaining</th>
                <th>Total Fee</th>
              </tr>
            </thead>
            <tbody>
              {absentStudentList.map((student) => (
                <tr key={student.studentId}>
                  <td>{`${student.firstName} ${student.lastName}`}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{new Date(student.joiningDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(student.nextInstallmentDate).toLocaleDateString()}
                  </td>
                  <td>₹{student.paidAmount}</td>
                  <td>₹{student.remainingAmount}</td>
                  <td>₹{student.totalStudentFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">No Students Absent More Than 3 Days</div>
      )}
    </div>
  );
}

export default AbsentStudentList;
