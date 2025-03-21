import React, { useEffect, useState } from "react";
import "../Style/addEmploye.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
function AddEmploye() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [showEmployeForm, setShowEmployeForm] = useState(false);
  const [employeTableData, setEmployeTableData] = useState([]);
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [AllBranches, setAllBranches] = useState([]);
  const [EmployeId, setEmployeId] = useState("");
  const [ShowAddBranchpopUp, setShowAddBranchpopUp] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      email,
      password,
      firstName,
      fatherName,
      lastName,
      mobileNumber,
      address,
      salary,
      joiningDate,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/register/emp`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Employee added successfully!");
        setShowEmployeForm(false);
        fetchEmployeeList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setEmployeTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/admin/emp/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Employee deleted successfully");
        fetchEmployeeList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAllotBranch(id) {
    setEmployeId(id);
    setShowAddBranchpopUp(true);
  }

  async function GetallBraches() {
    try {
      const response = await axios.get(`${BASE_URL}/branches/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setAllBranches(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetallBraches();
  }, []);

  async function handleAddAllotBranches(e) {
    e.preventDefault();
    console.log("Selected Branch ID:", selectedBranch);
    console.log("Employee ID:", EmployeId);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/branch/${selectedBranch}/assign/emp/${EmployeId}`,
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
        alert("Employee allotted branch successfully");
        setShowAddBranchpopUp(false);
        fetchEmployeeList();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="add_employee_btn">
        <button onClick={() => setShowEmployeForm(true)}>Add Employee</button>
      </div>

      {showEmployeForm && (
        <div className="add_employe_modal_overlay">
          <div className="add_employe_modal_content">
            <button
              onClick={() => setShowEmployeForm(false)}
              className="add_employe_form_close_btn"
            >
              &times;
            </button>
            <h2>Employee Registration</h2>
            <form onSubmit={handleSubmit} className="employee_form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
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
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
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
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              <label>Joining Date</label>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}

      {/* Employee List Table */}
      <div className="employee_table_container">
        <h2>Employee List</h2>
        <table className="employee_table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Father's Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Alloted Branch Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeTableData.length > 0 ? (
              employeTableData.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.fatherName}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.joiningDate}</td>
                  <td>{employee.branchName || "N/A"}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/editEmployee/${employee.employeeId}`)
                      }
                      className="Add_employe_edit_buttom"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.employeeId)}
                      className="Add_employe_delete_buttom"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAllotBranch(employee.employeeId)}
                      className="Add_employe_allot_branch_buttom"
                    >
                      Allot Branch
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no_data">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {ShowAddBranchpopUp && (
        <>
          <div className="employe_branch_popup-overlay">
            <div className="employe_branch_popup-content">
              <button
                className="employe_branch_popup_close-button"
                onClick={() => setShowAddBranchpopUp(false)}
              >
                ×
              </button>

              <h2 className="popup-title">Select a Branch</h2>

              <form
                className="employe_branch_popup-form"
                onSubmit={handleAddAllotBranches}
              >
                <select
                  className="employe_branch_popup-select"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">Choose a Branch</option>
                  {AllBranches.map((branch) => (
                    <option key={branch.branchId} value={branch.branchId}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="employe_branch_popup-submit-button"
                >
                  Add Branch
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddEmploye;
