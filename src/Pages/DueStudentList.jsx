import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import "../Style/dueStudentList.css";
import axiosInstance from "../utils/axiosInstance";

function DueStudentList() {
  const [duePaymentStudentList, setDuePaymentStudentList] = useState([]);
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;

  useEffect(() => {
    async function getDuePaymentStudentList() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/admin/student/overdue/fees/alert`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setDuePaymentStudentList(response.data || []);
      } catch (error) {
        console.log(error);
      }
    }
    getDuePaymentStudentList();
  }, []);

  return (
    <div className="due_student_list_container">
      <h1>Due Student List</h1>
      <div className="due_student_table_wrapper">
        <table className="due_student_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Mobile Number</th>
              <th>Joining Date</th>
              <th>Total Fee</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
              <th>Next Installment</th>
            </tr>
          </thead>
          <tbody>
            {duePaymentStudentList.length > 0 ? (
              duePaymentStudentList.map((student) => (
                <tr key={student.feeId}>
                  <td>{`${student.firstName} ${student.lastName}`}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.mobileNumber}</td>
                  <td>
                    {new Date(student.joiningDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>Rs. {student.totalStudentFee}</td>
                  <td>Rs. {student.paidAmount}</td>
                  <td>Rs. {student.remainingAmount}</td>
                  <td>
                    {new Date(student.nextInstallmentDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no_data">
                  No due payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DueStudentList;
