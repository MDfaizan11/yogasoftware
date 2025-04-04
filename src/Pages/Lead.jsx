import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style/lead.css";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
function Lead() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [foundOn, setFoundOn] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [status, setStatus] = useState("");
  const [lead, setLead] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stepId, setStepId] = useState("");
  const [StepForm, setShowStepForm] = useState(false);
  const [stepDate, setStepDate] = useState("");
  const [stepStatus, setStepStatus] = useState("");
  const [search, setSearch] = useState("");
  const [mySearch, setmysearch] = useState("");
  const [remarkForm, setShowremarkForm] = useState(false);
  const [remarkId, setremarkId] = useState("");
  const [remarkDate, setRemarkdate] = useState("");
  const [remarkType, setRemarktype] = useState("");
  const [showCardData, setShowcardData] = useState({});
  const [showCard, setShowCard] = useState(false);
  const user = JSON.parse(localStorage.getItem("vijayansLogin"));
  const token = user?.token;
  async function handleAddLead(e) {
    e.preventDefault();
    const leadData = {
      name,
      email,
      phoneNumber,
      whatappNumber: whatsappNumber,
      foundOn,
      statusMode,
      status,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/lead/createNewLead`,
        leadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setRefreshKey((prev) => prev + 1);

      if (response.status === 200) {
        alert("Lead Added Successfully");
        setName("");
        setEmail("");
        setPhoneNumber("");
        setWhatsappNumber("");
        setFoundOn("");
        setStatusMode("");
        setStatus("");
        // setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function GetallLead() {
      try {
        const response = await axios.get(` ${BASE_URL}/lead/getAllLeads`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setLead(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetallLead();
  }, [refreshKey]);

  function handleAddStep(id) {
    setShowStepForm(true);
    setStepId(id);
  }
  async function handleAddNewStep(e) {
    e.preventDefault();
    const formdata = [
      {
        logDate: stepDate,
        status: stepStatus,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/lead/${stepId}/addLogs`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setRefreshKey((prev) => prev + 1);
      if (response.status === 200) {
        alert("Log added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const searchFilter = lead.filter((item, inex) => {
      return item.name.toLowerCase().includes(search.toLocaleLowerCase());
    });
    setmysearch(searchFilter);
  }, [search, lead]);

  function handleSearchWithStatus(status) {
    if (status === "All") {
      setmysearch(lead);
    } else {
      const filteredLeads = lead.filter((item) => item.status === status);
      setmysearch(filteredLeads);
    }
  }

  async function handleDeleteLead(id) {
    const deleteLead = window.confirm(
      `Are you sure you want to delete this lead?`
    );
    if (!deleteLead) return;

    try {
      const response = await axios.delete(`${BASE_URL}/lead/deleteLead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Lead deleted successfully");
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddRemark(id) {
    setShowremarkForm(true);
    setremarkId(id);
  }

  async function handleAddNewRemark(e) {
    e.preventDefault();
    const formdata = {
      remark: remarkType,
      remarkdate: remarkDate,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/lead/remark/${remarkId}/remark`,
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
        alert("Remark added successfully");
        setShowremarkForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShowData(id) {
    setShowCard(true);
    try {
      const response = await axios.get(`${BASE_URL}/lead/getlead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setShowcardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditLead(id) {
    navigate(`/editLead/${id}`);
  }
  return (
    <>
      <div className="add_lead_button_container">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lead_search_baar"
        />
        <button className="add_lead_button" onClick={() => setShowForm(true)}>
          Add Lead
        </button>
      </div>
      <div className="multi_search_button">
        <button
          onClick={() => handleSearchWithStatus("NEW_LEAD")}
          className="new_lead_button"
        >
          New Lead
        </button>
        <button
          onClick={() => handleSearchWithStatus("FOLLOW_UP")}
          className="follow_button"
        >
          Follow Up
        </button>
        <button
          onClick={() => handleSearchWithStatus("SUCCESS")}
          className="success_button"
        >
          Success
        </button>
        <button
          onClick={() => handleSearchWithStatus("INACTIVE")}
          className="inactive_button"
        >
          In active
        </button>
        <button
          onClick={() => handleSearchWithStatus("All")}
          className="all_lead"
        >
          All Leads
        </button>
      </div>

      {showForm && (
        <div className="lead-overlay">
          <div className="lead-container">
            <button
              className="lead_close-button"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <h2 className="modal-title">Add Lead</h2>

            <form className="lead-form" onSubmit={handleAddLead}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <label>WhatsApp Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
              />

              <label>Found On</label>
              <input
                type="date"
                value={foundOn}
                onChange={(e) => setFoundOn(e.target.value)}
                required
              />

              <label>Status Mode</label>
              <select
                value={statusMode}
                onChange={(e) => setStatusMode(e.target.value)}
                required
              >
                <option value="">Select Status Mode</option>
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>

              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="NEW_LEAD">NEW LEAD</option>
                <option value="FOLLOW_UP">FOLLOW UP</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>

              <button type="submit" className="lead_submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="lead-table-container">
        <h2>All Leads</h2>
        <table className="lead-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>WhatsApp</th>
              <th>Found On</th>
              <th>Status Mode</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mySearch.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-lead">
                  No Leads Available
                </td>
              </tr>
            ) : (
              mySearch.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phoneNumber}</td>
                  <td>{lead.whatappNumber}</td>
                  <td>{lead.foundOn}</td>
                  <td>{lead.statusMode}</td>
                  <td>{lead.status}</td>
                  <td>
                    <button
                      onClick={() => handleAddStep(lead.id)}
                      className="add_lead_step_button "
                    >
                      Steps{" "}
                    </button>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <button
                      className="add_lead_edit_button"
                      onClick={() => handleEditLead(lead.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="add_lead_delete_button"
                      onClick={() => handleDeleteLead(lead.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="Add_remark_button"
                      onClick={() => handleAddRemark(lead.id)}
                    >
                      Add Remark
                    </button>
                  </td>
                  <td>
                    <button
                      className="show_button"
                      onClick={() => handleShowData(lead.id)}
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {StepForm && (
        <>
          <div className="step_form_container">
            <h3>Add New Step</h3>

            <button
              className="close_Step_form"
              onClick={() => setShowStepForm(false)}
            >
              X
            </button>
            <form className="step_form" onSubmit={handleAddNewStep}>
              <input
                type="date"
                className="step_form_input"
                value={stepDate}
                onChange={(e) => setStepDate(e.target.value)}
              />
              <select
                className="step_form_select"
                value={stepStatus}
                onChange={(e) => setStepStatus(e.target.value)}
              >
                <option value=""> select Step</option>
                <option value="FOLLOW_UP">FOLLOW UP</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <button className="step_form_button"> Submit</button>
            </form>
          </div>
        </>
      )}

      {remarkForm && (
        <div className="remark_overlay">
          <div className="remark_form_wrapper">
            <button
              className="remark_close_button"
              onClick={() => setShowremarkForm(false)}
            >
              ✖
            </button>
            <form className="remark_form" onSubmit={handleAddNewRemark}>
              <h3 className="remark_form_title">Add Remark</h3>
              <input
                type="date"
                className="remark_form_input"
                required
                value={remarkDate}
                onChange={(e) => setRemarkdate(e.target.value)}
              />
              <textarea
                rows="4"
                cols="50"
                className="remark_teaxtarea"
                placeholder="Enter your remark..."
                required
                value={remarkType}
                onChange={(e) => setRemarktype(e.target.value)}
              ></textarea>
              <button type="submit" className="remark_form_submit_button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showCard && showCardData && (
        <div className="card_overlay">
          <div className="show_card_wrapper">
            <button
              className="card_close_button"
              onClick={() => setShowCard(false)}
            >
              ✖
            </button>

            <h3 className="card_title">Lead Details</h3>

            <div className="card_content">
              <p>
                <strong>Name:</strong> {showCardData.name}
              </p>
              <p>
                <strong>Email:</strong> {showCardData.email}
              </p>
              <p>
                <strong>Phone:</strong> {showCardData.phoneNumber}
              </p>
              <p>
                <strong>WhatsApp:</strong> {showCardData.whatappNumber}
              </p>
              <p>
                <strong>Found On:</strong>
                {new Date(showCardData.foundOn).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Status Mode:</strong> {showCardData.statusMode}
              </p>
              <p>
                <strong>Status:</strong> {showCardData.status}
              </p>
              <p>
                <strong>Remark:</strong> {showCardData.remark || "No Remark"}
              </p>
              <p>
                <strong>Remark Date:</strong> {showCardData.remarkdate || "N/A"}
              </p>
            </div>

            {/* Lead Logs Table */}
            <h4 className="log_title">Lead Logs</h4>
            <div className="lead_logs_table">
              <table>
                <thead>
                  <tr>
                    <th>Log Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {showCardData.leadLogs && showCardData.leadLogs.length > 0 ? (
                    showCardData.leadLogs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.logDate}</td>
                        <td>{log.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no_logs">
                        No Logs Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Lead;
