import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BASE_URL } from "../config";
import "../Style/batch.css";

function Batch() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get user details from localStorage
  const user = JSON.parse(localStorage.getItem("vijayansLogin"));
  const token = user?.token;
  const role = user?.role;
  const branchId = user?.branchId; // Only exists if role === "EMPLOYEE"

  useEffect(() => {
    async function getAllBranches() {
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
    getAllBranches();
  }, [refreshKey]);

  function handleAddBranch() {
    navigate("/addBranch");
  }

  function handlePassId(id) {
    navigate(`/newbatches/${id}`);
  }

  function handleEditBranch(id) {
    navigate(`/editBranch/${id}`);
  }

  async function handleDeleteBranch(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/branch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Branch deleted successfully");
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="search_baar_branch">
        <input
          type="search"
          placeholder="Search Branch"
          className="search_baar_batch"
        />
        {role === "ADMIN" && (
          <button onClick={handleAddBranch} className="add_branch_button">
            Add Branch
          </button>
        )}
      </div>

      <div className="branches_mian_wrapper">
        <div className="branches-grid">
          {branches
            .filter((item) =>
              role === "EMPLOYEE" ? item.branchId === branchId : true
            )
            .map((item) => (
              <div key={item.branchId} className="branch-card">
                <div className="branch-card-header">
                  <h3 className="branch-name">{item.branchName}</h3>
                </div>
                <div className="branch-card-body">
                  <p className="branch-city">
                    <strong>City:</strong> {item.city}
                  </p>
                  <p className="branch-address">
                    <strong>Address:</strong> {item.address}
                  </p>
                </div>
                <div className="branch-card-footer">
                  <button
                    className="branch-details-btn"
                    onClick={() => handlePassId(item.branchId)}
                  >
                    <FaEye /> View Details
                  </button>

                  {role === "ADMIN" && (
                    <div className="branches_action_button">
                      <button
                        onClick={() => handleEditBranch(item.branchId)}
                        className="branch_edit_button"
                      >
                        <AiFillEdit style={{ fontSize: "18px" }} />
                      </button>

                      <button
                        onClick={() => handleDeleteBranch(item.branchId)}
                        className="branch_delete_button"
                      >
                        <MdDelete style={{ fontSize: "18px" }} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Batch;
