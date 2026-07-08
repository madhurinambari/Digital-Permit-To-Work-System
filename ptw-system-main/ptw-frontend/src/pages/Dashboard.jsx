import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPermits: 0,
    pendingPermits: 0,
    approvedPermits: 0,
    rejectedPermits: 0,
  });

  const [recentPermits, setRecentPermits] =
    useState([]);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get(
        "/dashboard/stats"
      );

      setStats({
        totalPermits:
          res.data.totalPermits,
        pendingPermits:
          res.data.pendingPermits,
        approvedPermits:
          res.data.approvedPermits,
        rejectedPermits:
          res.data.rejectedPermits,
      });

      setRecentPermits(
        res.data.recentPermits || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    {
      name: "Pending",
      value: stats.pendingPermits,
    },
    {
      name: "Approved",
      value: stats.approvedPermits,
    },
    {
      name: "Rejected",
      value: stats.rejectedPermits,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#10b981",
    "#ef4444",
  ];

  return (
    <Layout>
      <div className="container-fluid">

        {/* Welcome */}

        <div className="mb-4">
          <h2 className="fw-bold">
            Welcome, {user.name} 👋
          </h2>

          <p className="text-muted">
            Role: {user.role}
          </p>
        </div>

        {/* Stats Cards */}

        <div className="row g-4">

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm"
              style={{
                background:
                  "#2563eb",
                color: "white",
                borderRadius:
                  "15px",
              }}
            >
              <div className="card-body text-center">
                <h6>
                  Total Permits
                </h6>
                <h1>
                  {
                    stats.totalPermits
                  }
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm"
              style={{
                background:
                  "#f59e0b",
                color: "white",
                borderRadius:
                  "15px",
              }}
            >
              <div className="card-body text-center">
                <h6>Pending</h6>
                <h1>
                  {
                    stats.pendingPermits
                  }
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm"
              style={{
                background:
                  "#10b981",
                color: "white",
                borderRadius:
                  "15px",
              }}
            >
              <div className="card-body text-center">
                <h6>
                  Approved
                </h6>
                <h1>
                  {
                    stats.approvedPermits
                  }
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm"
              style={{
                background:
                  "#ef4444",
                color: "white",
                borderRadius:
                  "15px",
              }}
            >
              <div className="card-body text-center">
                <h6>
                  Rejected
                </h6>
                <h1>
                  {
                    stats.rejectedPermits
                  }
                </h1>
              </div>
            </div>
          </div>

        </div>

        {/* Pie Chart */}

        <div className="card shadow border-0 mt-5">
          <div className="card-body">

            <h4 className="mb-4">
              Permit Status Overview
            </h4>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {chartData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={
                          index
                        }
                        fill={
                          COLORS[
                            index
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Recent Permits */}

        <div className="card shadow border-0 mt-5">
          <div className="card-body">

            <h4 className="mb-4">
              Recent Permits
            </h4>

            <div className="table-responsive">
              <table className="table table-hover">

                <thead className="table-primary">
                  <tr>
                    <th>
                      Work Title
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Created By
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {recentPermits
                    .length > 0 ? (
                    recentPermits.map(
                      (
                        permit
                      ) => (
                        <tr
                          key={
                            permit._id
                          }
                        >
                          <td>
                            {
                              permit.workTitle
                            }
                          </td>

                          <td>
                            {
                              permit.status
                            }
                          </td>

                          <td>
                            {
                              permit
                                .createdBy
                                ?.name
                            }
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center"
                      >
                        No Recent
                        Permits
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;