import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import Hamburger & Close Icons
import "../Style/dashboard.css";
import { IoHome } from "react-icons/io5";
import main_logo from "../Assets/Images/Group 1 (1).svg";
import { TbBoxMultipleFilled } from "react-icons/tb";
import { PiStudentBold } from "react-icons/pi";
import { MdLeaderboard } from "react-icons/md";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("vijayansLogin"));
  const token = user?.token;
  const role = user?.role;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function handleLogOut() {
    localStorage.removeItem("vijayansLogin");
    window.location.href = "/login";
  }

  return (
    <>
      <header className="dashboard_header">
        <button
          className={`menu_btn ${sidebarOpen ? "rotate" : ""}`}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <FiX style={{ fontWeight: 900 }} />
          ) : (
            <FiMenu style={{ fontWeight: 900 }} />
          )}
        </button>

        <h2 style={{ color: "#0dada5" }}>Vijayan's Yoga</h2>

        {token ? (
          <button className="login_button" onClick={handleLogOut}>
            {" "}
            LogOut{" "}
          </button>
        ) : (
          <button className="login_button"> LogIn </button>
        )}
      </header>

      <div className="dashboard_main_wrapper">
        <div className={`dashboard_link_side ${sidebarOpen ? "open" : ""}`}>
          <div className="link_side_img">
            <img src={main_logo} alt="logo" />
          </div>

          <div className="dash_link">
            {role === "ADMIN" ? (
              <>
                <NavLink to="/" onClick={toggleSidebar}>
                  <IoHome /> Home
                </NavLink>
                <NavLink to="revenue" onClick={toggleSidebar}>
                  <IoHome /> Revenue
                </NavLink>
                <NavLink to="batch" onClick={toggleSidebar}>
                  <TbBoxMultipleFilled /> Branch
                </NavLink>
                <NavLink to="student" onClick={toggleSidebar}>
                  <PiStudentBold /> Student
                </NavLink>
                {/* <NavLink to="attendence" onClick={toggleSidebar}>
                  Attendence
                </NavLink> */}
                <NavLink to="lead" onClick={toggleSidebar}>
                  <MdLeaderboard /> Lead
                </NavLink>
                <NavLink to="addEmployee" onClick={toggleSidebar}>
                  <MdLeaderboard /> Add Employee
                </NavLink>
                <NavLink to="paymentSlip" onClick={toggleSidebar}>
                  Payment Slip
                </NavLink>
              </>
            ) : (
              // Show only Branch, Student, and Lead if EMPLOYEE
              <>
                <NavLink to="batch" onClick={toggleSidebar}>
                  <TbBoxMultipleFilled /> Branch
                </NavLink>
                <NavLink to="student" onClick={toggleSidebar}>
                  <PiStudentBold /> Student
                </NavLink>
                <NavLink to="lead" onClick={toggleSidebar}>
                  <MdLeaderboard /> Lead
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="dashboard_outlet_side">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
