import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "../Style/student.css";

function Student() {
  const [branches, setBranches] = useState([]);
 
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const branchId = JSON.parse(localStorage.getItem("vijayansLogin"))?.branchId;
  const role = JSON.parse(localStorage.getItem("vijayansLogin"))?.role;
  const navigate = useNavigate();

  useEffect(() => {
    async function GetAllBranches() {
      try {
        const response = await axios.get(`${BASE_URL}/branches/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setBranches(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetAllBranches();
  }, []);

  function handleListStudent(id) {
    navigate(`/newStudentList/${id}`);
  }

  const filteredBranches = branches.filter((branch) =>
    role === "EMPLOYEE" ? branch.branchId === branchId : true
  );

  return (
    <div className="branches_container">
      <h1>View All Student List By Branches</h1>

      <div className="branches_grid">
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <div className="branch_card_modern" key={branch.branchId}>
              <div className="branch_header">
                <h2>{branch.branchName}</h2>
              </div>
              <p>
                <strong>City:</strong> {branch.city}
              </p>
              <p>
                <strong>Address:</strong> {branch.address}
              </p>
              <p>
                <button
                  className="view_student"
                  onClick={() => handleListStudent(branch.branchId)}
                >
                  View Student
                </button>
              </p>
            </div>
          ))
        ) : (
          <p className="no_data"> "No branches available"</p>
        )}
      </div>
    </div>
  );
}

export default Student;
