import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import "../Style/revenue.css";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Revenue() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("vijayansLogin"))?.token;
  const [duePaymentStudentList, setDuePaymentStudentList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [isCustomData, setIsCustomData] = useState(false);

  useEffect(() => {
    async function gettingTotalRevenue() {
      try {
        const response = await axios.get(`${BASE_URL}/revenue/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setTotalRevenue(response.data);
        setRevenueData([
          {
            month: "Total Yearly",
            totalCollection: response.data.totalRevenue,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    gettingTotalRevenue();
  }, []);

  useEffect(() => {
    async function getDuePaymentStudentList() {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/student/overdue/fees/alert`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDuePaymentStudentList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDuePaymentStudentList();
  }, []);

  useEffect(() => {
    async function getAllBranches() {
      try {
        const response = await axios.get(`${BASE_URL}/branches/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setBranchesList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBranches();
  }, []);

  const handleNavigate = () => {
    navigate("/dueStudentList");
  };

  async function handleGetRevenue(e) {
    e.preventDefault();
    const formdata = {
      startingDate: startDate,
      endingDate: endDate,
      branchId: branchId,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/revenue/branch`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setRevenueData(response.data);
      setIsCustomData(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Revenue Section</h1>
      <div className="revenue_section_upper_side">
        <div className="revenue_card">
          <h2>Total Branches</h2>
          <h3>{totalRevenue.totalBranches || 0}</h3>
        </div>
        <div className="revenue_card">
          <h2>Total Revenue (Yearly)</h2>
          <h3>{totalRevenue.totalRevenue || 0}</h3>
        </div>
        <div className="revenue_card">
          <h2>Last Month Revenue</h2>
          <h3>{totalRevenue.lastMonthRevenue || 0}</h3>
        </div>
        <div className="revenue_card" onClick={handleNavigate}>
          <h2>Due Payments</h2>
          <h3>{duePaymentStudentList.length || 0}</h3>
        </div>
      </div>

      <div className="bar_chart_main_container">
        <div className="bar_chart_form_wrapper">
          <form onSubmit={handleGetRevenue} className="chart_form">
            <div className="bar_form_group">
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="bar_form_group">
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="bar_form_group">
              <label>Branch:</label>
              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                <option value="">Select Branch</option>
                {branchesList.map((branch) => (
                  <option key={branch.branchId} value={branch.branchId}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bar_form_group_submit_btn">
              Submit
            </button>
          </form>
        </div>

        {/* Bar Chart with Improved Design */}
        <div className="bar_chart_container">
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
              >
                {/* Grid with Light Opacity */}
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="rgba(0, 0, 0, 0.2)"
                />

                {/* X-Axis with black text */}
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#000", fontSize: 14, fontWeight: "bold" }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />

                {/* Y-Axis with ₹ Formatting & Black Text */}
                <YAxis
                  tick={{ fill: "#000", fontSize: 14 }}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />

                {/* Tooltip with Modern Look */}
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: 10,
                    padding: 10,
                    border: "1px solid #ddd",
                  }}
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Total Revenue",
                  ]}
                />

                {/* Legend in Black */}
                <Legend wrapperStyle={{ fontSize: 14, color: "#000" }} />

                {/* Bars with New Color #0dada5 */}
                <Bar
                  dataKey="totalCollection"
                  fill="url(#tealGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={50}
                />

                {/* Gradient Definition for Smooth Color */}
                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0dada5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0b8c82" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p
              style={{ textAlign: "center", marginTop: "20px", color: "#000" }}
            >
              No revenue data available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Revenue;
