import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/studentlist.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
function StudentsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [students, setStudents] = useState([]);
  const [singleStudentData, SetStudentData] = useState({});
  const [searchStudent, setSearchStudent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showStudentPaymentform, setStudentPaymentform] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [StudentPaymentamount, setStudentPaymentamount] = useState("");
  const [StudentpaymentMode, setStudentpaymentMode] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [avaialbleBatchData, setAvaialbleBatchesData] = useState("");
  const [ShowAvailableBatches, setShowAvailableBatches] = useState(false);
  const [ShowStudentList, setShowStudentList] = useState(false);
  useEffect(() => {
    async function getStudentList() {
      try {
        const response = await axios.get(
          `${BASE_URL}/batch/${id}/student/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudentList();
  }, [refreshKey]);

  async function handleShowDeatil(id) {
    try {
      const response = await axios.get(`${BASE_URL}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      SetStudentData(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddPatment(id) {
    setStudentPaymentform(true);
    setStudentId(id);
  }

  async function handleAddStudentPayment(e) {
    e.preventDefault();
    const formdata = {
      amount: StudentPaymentamount,
      paymentMode: StudentpaymentMode,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/fee/pay-installment/student/${studentId}`,
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
        alert("Payment Successful");
      }
      setStudentPaymentform(false);
      setStudentPaymentamount("");
      setStudentpaymentMode("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteStudent(id) {
    const deleteStudent = window.confirm(
      "If you delete a student, all their data will also be permanently deleted. If needed, please transfer the student to another batch before proceeding with the deletion."
    );
    if (!deleteStudent) return;
    try {
      const response = await axios.delete(`${BASE_URL}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Student deleted successfully");
      }
      setRefreshKey(refreshKey + 1);
    } catch (error) {
      console.log(error);
    }
  }
  function handleEditStudent(id) {
    navigate(`/editStudent/${id}`);
  }

  const filterStudent = students.filter((student) => {
    return (
      student.firstName
        .toLowerCase()
        .trim()
        .includes(searchStudent.toLowerCase()) ||
      student.lastName
        .toLowerCase()
        .trim()
        .includes(searchStudent.toLowerCase())
    );
  });

  useEffect(() => {
    async function gettingallBatches() {
      try {
        const response = await axios.get(
          `${BASE_URL}/branches/available/batch`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setAvaialbleBatchesData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    gettingallBatches();
  }, []);

  function handleShiftStudent(id) {
    setShowAvailableBatches(true);
    setStudentId(id);
  }

  async function handleShiftStudentToNewBatch(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}/student/${studentId}/assign/batch/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Shifted Successfully");
        setRefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlePassBatchId(id) {
    navigate(`/studentAttendence/${id}`);
  }

  function handleAbsentStudentList(id) {
    navigate(`/absentStudentList/${id}`);
  }
  return (
    <>
      <div className="student_search_wrapper">
        <input
          type="search"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder="Enter Student Name"
          className="search_input"
        />
      </div>

      <div className="Student_button_container">
        <button
          onClick={() => setShowStudentList(true)}
          className="view_all_student_list_button"
        >
          View All Student List
        </button>
        <button
          onClick={() => handlePassBatchId(id)}
          className="attendence_button"
        >
          Add Attendence
        </button>
        <button
          onClick={() => handleAbsentStudentList(id)}
          className="ShowAbsentStudentList"
        >
          Student Absent More Than 3 days
        </button>
      </div>

      {ShowStudentList && (
        <>
          <div className="students_container">
            <button
              onClick={() => setShowStudentList(false)}
              className="students_container_close_button"
            >
              X
            </button>
            <h2>Student List</h2>

            <div className="table_wrapper">
              <table className="students_table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Nationality</th>
                    <th>Address</th>
                    <th>DOB</th>
                    <th>Birth Time</th>

                    <th>Joining Date</th>
                    <th>Ending Date</th>
                    <th>Social ID</th>
                    <th>Action</th>
                    <th>Action</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterStudent.length > 0 ? (
                    filterStudent.map((student, index) => (
                      <tr key={index}>
                        <td>
                          {student.firstName} {student.lastName}
                        </td>
                        <td>{student.email}</td>
                        <td>{student.mobileNumber}</td>
                        <td>{student.nationality}</td>
                        <td>{student.address}</td>
                        <td>{student.dateOfBirth}</td>
                        <td>{student.birthTime}</td>
                        <td>{student.joiningDate}</td>
                        <td>{student.endingDate}</td>
                        <td>{student.socialNetworkingId}</td>
                        <td>
                          <button
                            onClick={() => handleShowDeatil(student.studentId)}
                            className="single_student_view_button"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditStudent(student.studentId)}
                            className="single_student_edit_button"
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleAddPatment(student.studentId)}
                            className="single_student_Add_payment_button"
                          >
                            Add Payment
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleDeleteStudent(student.studentId)
                            }
                            className="single_student_delete_button"
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="Shift_student_batch"
                            onClick={() =>
                              handleShiftStudent(student.studentId)
                            }
                          >
                            Shift Batch
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="16" className="no_data">
                        No Students Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {modalIsOpen && singleStudentData && (
        <div className="single_sudent_modal">
          <div className="single_student_modal_content">
            <span
              className="single_student_modal_close"
              onClick={() => setModalIsOpen(false)}
            >
              &times;
            </span>
            <h3>Student Details</h3>
            <p>
              <strong>Full Name:</strong> {singleStudentData.firstName}{" "}
              {singleStudentData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {singleStudentData.email}
            </p>
            <p>
              <strong>Mobile Number:</strong> {singleStudentData.mobileNumber}
            </p>
            <p>
              <strong>Nationality:</strong> {singleStudentData.nationality}
            </p>
            <p>
              <strong>Address:</strong> {singleStudentData.address}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(singleStudentData.dateOfBirth).toLocaleDateString(
                "en-GB"
              )}
            </p>
            <p>
              <strong>Birth Time:</strong> {singleStudentData.birthTime}
            </p>
            <p>
              <strong>Diseases:</strong> {singleStudentData.diseases || "None"}
            </p>
            <p>
              <strong>Medicine:</strong>{" "}
              {singleStudentData.medicineName || "None"}
            </p>
            <p>
              <strong>Father's Name:</strong> {singleStudentData.fatherName}
            </p>
            <p>
              <strong>Height:</strong> {singleStudentData.height} ft
            </p>
            <p>
              <strong>Weight:</strong> {singleStudentData.weight} kg
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {new Date(singleStudentData.joiningDate).toLocaleDateString(
                "en-GB"
              )}
            </p>
            <p>
              <strong>Ending Date:</strong>{" "}
              {new Date(singleStudentData.endingDate).toLocaleDateString(
                "en-GB"
              )}
            </p>
            <p>
              <strong>Social ID:</strong> {singleStudentData.socialNetworkingId}
            </p>
            <p>
              <strong> Next Payment Date :</strong>
              {new Date(singleStudentData.nextPaymentDate).toLocaleDateString(
                "en-GB"
              )}
            </p>
            <p>
              <strong>Remaining Amount:</strong>{" "}
              {singleStudentData.remaingAmount || "NA"}
            </p>
            <p>
              <strong>Student Total Fees:</strong>{" "}
              {singleStudentData.totalFees || "NA"}
            </p>
            {singleStudentData.transaction.map((item, index) => {
              return (
                <>
                  <table className="view_button_table">
                    <thead>
                      <tr className="view_button_tr">
                        <th>Payment Date</th>
                        <th>Amount Paid</th>
                        <th>Payment Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.paymentDate}</td>
                        <td>{item.amountPaid}</td>
                        <td>{item.paymentMode}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
        </div>
      )}

      {showStudentPaymentform && (
        <div className="student_payment_popup_wrapper">
          <div className="student_payment_popup">
            <button
              className="close_button"
              onClick={() => setStudentPaymentform(false)}
            >
              ✖
            </button>
            <h2 className="popup_heading">Student Payment</h2>
            <form
              className="Student_payment_form"
              onSubmit={handleAddStudentPayment}
            >
              <input
                type="text"
                placeholder="Enter Amount"
                className="student_payment_input"
                value={StudentPaymentamount}
                onChange={(e) => setStudentPaymentamount(e.target.value)}
                required
              />

              <select
                className="student_payment_select"
                value={StudentpaymentMode}
                onChange={(e) => setStudentpaymentMode(e.target.value)}
                required
              >
                <option value="">Select Mode</option>
                <option value="BY_CASH">Cash</option>
                <option value="BY_CHEQUE">Cheque</option>
                <option value="BANK">Bank</option>
                <option value="ONLINE">Online</option>
              </select>

              <button type="submit" className="student_payment_submit_button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* show batches */}
      {ShowAvailableBatches && (
        <>
          <div className="Shift_student_availble_batches_popup_overlay">
            <div className="Shift_student_availble_batches_popup">
              <button
                onClick={() => setShowAvailableBatches(false)}
                className="Shift_student_availble_batches_close_button"
              >
                X
              </button>

              <div className="Shift_student_availble_batches_container">
                {avaialbleBatchData.map((batch, index) => (
                  <div
                    key={index}
                    className="Shift_student_availble_batches_card"
                  >
                    <p>
                      <strong>Batch Name:</strong> {batch.batchName}
                    </p>
                    <p>
                      <strong>Shift:</strong> {batch.batchShift}
                    </p>
                    <p>
                      <strong>Status:</strong> {batch.batchStatus}
                    </p>
                    <p>
                      <strong>Branch:</strong> {batch.branchName}
                    </p>
                    <p>
                      <strong>Branch Address:</strong> {batch.branchAddress}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {batch.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {batch.endingDate}
                    </p>
                    <button
                      type="button"
                      class="shift-button"
                      onClick={() =>
                        handleShiftStudentToNewBatch(batch.batchId)
                      }
                    >
                      Shift To
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StudentsList;
