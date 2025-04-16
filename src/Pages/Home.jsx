import React from "react";
import logo from "../Assets/Images/Group 1 (1).svg";
import "../Style/home.css";
function Home() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}> Welcome To VijaysN'S Yoga</h1>
      <div
        className="home_container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <img src={logo} alt="logo" />
      </div>
    </>
  );
}

export default Home;
