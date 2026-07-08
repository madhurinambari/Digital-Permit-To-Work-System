import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function PermitList() {
  const [permits, setPermits] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [sortOrder, setSortOrder] =
    useState("newest");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchPermits();
  }, []);

  const fetchPermits = async () => {
    try {
      const res = await API.get("/permits");
      setPermits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approvePermit = async (
    id,
    stage
  ) => {
    try {
      await API.put(
        `/permits/${stage}/${id}`
      );

      alert("Permit Approved");
      fetchPermits();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Approval Failed"
      );
    }
  };

  const rejectPermit = async (id) => {
    try {
      await API.put(
        `/permits/reject/${id}`
      );

      alert("Permit Rejected");
      fetchPermits();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Rejection Failed"
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="badge bg-warning text-dark">
            Pending
          </span>
        );

      case "Supervisor Approved":
        return (
          <span className="badge bg-info">
            Supervisor Approved
          </span>
        );

      case "Safety Approved":
        return (
          <span className="badge bg-primary">
            Safety Approved
          </span>
        );

      case "Manager Approved":
        return (
          <span className="badge bg-success">
            Approved
          </span>
        );

      case "Rejected":
        return (
          <span className="badge bg-danger">
            Rejected
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary">
            {status}
          </span>
        );
    }
  };

  const filteredPermits = permits
    .filter((permit) => {
      const matchesSearch =
        permit.workTitle
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : permit.status ===
            statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(
            b.createdAt
          ) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  return (
    <Layout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">
            Permit Records
          </h2>
        </div>

        {/* Search + Filter + Sort */}

        <div className="row mb-4">

          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by Work Title"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Supervisor Approved">
                Supervisor Approved
              </option>

              <option value="Safety Approved">
                Safety Approved
              </option>

              <option value="Manager Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>
            </select>
          </div>

        </div>

        {/* Table */}

        <div className="card shadow border-0">
          <div className="card-body">

            <div className="table-responsive">
              <table className="table table-hover align-middle">

                <thead className="table-primary">
                  <tr>
                    <th>
                      Work Title
                    </th>
                    <th>
                      Location
                    </th>
                    <th>
                      Permit Type
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Created By
                    </th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredPermits.length >
                  0 ? (
                    filteredPermits.map(
                      (permit) => (
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
                              permit.location
                            }
                          </td>

                          <td>
                            {
                              permit.permitType
                            }
                          </td>

                          <td>
                            {getStatusBadge(
                              permit.status
                            )}
                          </td>

                          <td>
                            {
                              permit
                                .createdBy
                                ?.name
                            }
                          </td>

                          <td className="text-center">

                            {user.role ===
                              "supervisor" &&
                              permit.status ===
                                "Pending" && (
                                <>
                                  <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() =>
                                      approvePermit(
                                        permit._id,
                                        "supervisor"
                                      )
                                    }
                                  >
                                    Approve
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      rejectPermit(
                                        permit._id
                                      )
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                            {user.role ===
                              "safety" &&
                              permit.status ===
                                "Supervisor Approved" && (
                                <>
                                  <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() =>
                                      approvePermit(
                                        permit._id,
                                        "safety"
                                      )
                                    }
                                  >
                                    Approve
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      rejectPermit(
                                        permit._id
                                      )
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                            {user.role ===
                              "manager" &&
                              permit.status ===
                                "Safety Approved" && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() =>
                                      approvePermit(
                                        permit._id,
                                        "manager"
                                      )
                                    }
                                  >
                                    Final Approve
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      rejectPermit(
                                        permit._id
                                      )
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-muted"
                      >
                        No permits found
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

export default PermitList;