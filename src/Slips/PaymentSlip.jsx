import React, { useEffect, useRef, useState } from "react";
import logo from "../Assets/Images/Group 1 (1).svg";
import "../Style/paymentSlip.css";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";
function PaymentSlip() {
  const slipRef = useRef(null);
  const [studentName, setStudentName] = useState("");
  const [rupeesInWords, setRupeesInWords] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [balanceDue, setBalanceDue] = useState("");
  const [amount, setAmount] = useState("");
  const currentDate = new Date().toLocaleDateString();
  const [ShowPaymentSlip, setShowPaymentSlip] = useState(false);
  const [ShowpaymentForm, setShowPaymentForm] = useState(false);
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [studentList, setStudentList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [singleStudentData, setSingleStudentData] = useState({});
  async function handleAddstudent(e) {
    e.preventDefault();
    const formData = {
      studentName,
      rupeesInWords,
      checkNo,
      bankName,
      startingDate,
      endingDate,
      balanceDue,
      amount,
    };
    try {
      const response = await axios.post(`${BASE_URL}/receipt/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setRefreshKey(refreshKey + 1);
      if (response.status === 200) {
        alert("form successfully submitted");
        setStudentName("");
        setRupeesInWords("");
        setCheckNo("");
        setBankName("");
        setStartingDate("");
        setEndingDate("");
        setBalanceDue("");
        setAmount("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getAllPaymentStudent() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/receipt/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setStudentList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPaymentStudent();
  }, [refreshKey]);

  async function handleShowSlip(id) {
    setShowPaymentSlip(true);
    try {
      const response = await axiosInstance.get(`${BASE_URL}/receipt/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setSingleStudentData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteStudent(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/receipt/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setRefreshKey(refreshKey + 1);

      if (response.status === 200) {
        alert("Payment deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDownloadPDF = () => {
    const element = slipRef.current;
    html2pdf()
      .from(element)
      .save(`${singleStudentData.studentName} payment slip.pdf`);
  };

  return (
    <>
      <div className="generate_payment_slip_wrapper">
        <button onClick={() => setShowPaymentForm(true)}>
          Generate Payment Slip
        </button>
      </div>
      {ShowpaymentForm && (
        <>
          <div className="payment_slip_form_container">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="payment_form_close_button"
            >
              X
            </button>
            <h1>Student Receipt Form</h1>
            <form className="payment_slip_form" onSubmit={handleAddstudent}>
              <div className="payment_slip_form_group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="rupeesInWords">Amount in Words</label>
                <input
                  type="text"
                  id="rupeesInWords"
                  value={rupeesInWords}
                  onChange={(e) => setRupeesInWords(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="checkNo">Check Number</label>
                <input
                  type="text"
                  id="checkNo"
                  value={checkNo}
                  onChange={(e) => setCheckNo(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="bankName">Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="startingDate">Starting Date</label>
                <input
                  type="date"
                  id="startingDate"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="endingDate">Ending Date</label>
                <input
                  type="date"
                  id="endingDate"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="balanceDue">Balance Due</label>
                <input
                  type="text"
                  id="balanceDue"
                  value={balanceDue}
                  onChange={(e) => setBalanceDue(e.target.value)}
                  required
                />
              </div>

              <div className="payment_slip_form_group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="payment_slip_form_submit_button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      {/* ********************* */}
      <div className="payment_table_container">
        <h2>Student Payment Records</h2>
        <table className="payment_table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Balance Due</th>
              <th>Bank Name</th>
              <th>Check No</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
              <th>Rupees in Words</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentList.length > 0 ? (
              studentList.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.amount}</td>
                  <td>{student.balanceDue}</td>
                  <td>{student.bankName}</td>
                  <td>{student.checkNo}</td>
                  <td>{student.startingDate}</td>
                  <td>{student.endingDate}</td>
                  <td>{student.rupeesInWords}</td>
                  <td className="payment_table_action_container">
                    <button
                      onClick={() => handleShowSlip(student.receiptId)}
                      className="payment_slip_show_button"
                    >
                      Show
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.receiptId)}
                      className="payment_slip_delete_button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ***************************** */}
      {ShowPaymentSlip && singleStudentData && (
        <>
          <div className="action_button">
            <button className="print_payment_slip" onClick={handleDownloadPDF}>
              Download Payment Slip (PDF)
            </button>
            <button
              onClick={() => setShowPaymentSlip(false)}
              className="payment_slip_close_button"
            >
              Close
            </button>
          </div>

          <div className="final_slip_wrapper" ref={slipRef}>
            <div className="payment_slip_logo">
              <img src={logo} alt="Logo" />
            </div>
            <hr />
            <p className="payment_slip_address">
              248, Second Floor, Canal Road, Behind Times Of India, Dharampeth,
              Nagpur-10, <br /> Tel: 9422439804 / 9422439805
            </p>
            <p className="payment_slip_date"> Date: {currentDate}</p>
            <p className="payment_slip_tex">SERVICE TAX NO: ACFPR7855RSD001</p>

            <div className="payment_slip_main_content">
              <p>
                Received from <b> {singleStudentData.studentName} </b> a sum of
                <b> {singleStudentData.rupeesInWords} </b>
                <input type="checkbox" /> By Cash
                <input type="checkbox" /> Online
                <input type="checkbox" /> Cheque No{" "}
                <b> {singleStudentData.checkNo}</b> Bank
                <b> {singleStudentData.bankName} </b> <br /> Dated
                <b> {singleStudentData.startingDate} </b> as payment for 3
                months.
              </p>
            </div>
            <div className="due_balance_container">
              <p className="balance_due">
                Balance Due: <b>{singleStudentData.balanceDue}</b> (If any)
              </p>
            </div>

            <div className="mutidate">
              <p>
                Starting Date: <b>{singleStudentData.startingDate}</b>
              </p>
              <p>
                Ending Date: <b>{singleStudentData.endingDate}</b>
              </p>
            </div>

            <div className="final_signature_container">
              <div className="final_amount">
                <p>
                  Rs. <b>{singleStudentData.amount}/-</b>
                </p>
                <p>(Subject to realization of cheque)</p>
                <p>All Taxes included</p>
                <p>Fees once paid will not be refunded or transferred.</p>
              </div>
              <div className="final_signature">
                <h3>Vijayan's Yoga</h3>
                <p>Authorized Signatory</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PaymentSlip;
