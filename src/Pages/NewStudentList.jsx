import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "../Style/newStudentList.css";

function NewStudentList() {
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getStudentList() {
      try {
        const response = await axios.get(
          `${BASE_URL}/branches/${id}/student/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    getStudentList();
  }, [id, token]);

  async function handleShowStudent(studentId) {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setSelectedStudent(response.data);
      setIsModalOpen(true); 
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedStudent(null);
  }

  const filterStudent = students.filter((item, index) => {
    return item.batchName.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <>
      <div className="searchBy_batch">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Batch Name"
        />
      </div>
      <div className="new_student_table_container">
        <h1 className="new_student_table_title">Student List</h1>
        <table className="new_student_table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Batch Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Nationality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterStudent.length > 0 ? (
              filterStudent.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.batchName}</td>
                  <td>{student.email}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{student.nationality}</td>
                  <td>
                    <button
                      className="show_btn"
                      onClick={() => handleShowStudent(student.studentId)}
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Student Details Modal */}
        {isModalOpen && selectedStudent && (
          <div className="new_student_modal_overlay">
            <div className="new_student_modal_content">
              <span className="new_student_close_modal" onClick={closeModal}>
                &times;
              </span>
              <h2>Student Details</h2>
              <p>
                <strong>Name:</strong> {selectedStudent.firstName}{" "}
                {selectedStudent.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.mobileNumber}
              </p>
              <p>
                <strong>Address:</strong> {selectedStudent.address}
              </p>
              <p>
                <strong>Date of Birth:</strong>
                {new Date(selectedStudent.dateOfBirth).toLocaleDateString(
                  "en-GB"
                )}
              </p>
              <p>
                <strong>Joining Date:</strong>
                {new Date(selectedStudent.joiningDate).toLocaleDateString(
                  "en-GB"
                )}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedStudent.nationality}
              </p>
              <p>
                <strong>Height:</strong> {selectedStudent.height} ft
              </p>
              <p>
                <strong>Weight:</strong> {selectedStudent.weight} kg
              </p>
              <p>
                <strong>Total Fees:</strong> ₹{selectedStudent.totalFees}
              </p>
              <p>
                <strong>Initial Payment:</strong> ₹
                {selectedStudent.initialPayment}
              </p>
              <p>
                <strong>Remaining Amount:</strong> ₹
                {selectedStudent.remaingAmount}
              </p>
              <p>
                <strong>Next Payment Date:</strong>{" "}
                {new Date(selectedStudent.nextPaymentDate).toLocaleDateString(
                  "en-GB"
                )}
              </p>

              {/* Transaction Table */}
              {selectedStudent.transaction &&
                selectedStudent.transaction.length > 0 && (
                  <div className="transaction_table_container">
                    <h3>Transaction History</h3>
                    <table className="new_student_transaction_table">
                      <thead>
                        <tr>
                          <th>Payment Date</th>
                          <th>Payment Mode</th>
                          <th>Amount Paid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.transaction.map((txn, index) => (
                          <tr key={index}>
                            <td>{txn.paymentDate}</td>
                            <td>{txn.paymentMode}</td>
                            <td>₹{txn.amountPaid}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NewStudentList;
