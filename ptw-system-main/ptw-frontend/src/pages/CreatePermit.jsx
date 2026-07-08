import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function CreatePermit() {
  const [formData, setFormData] = useState({
    workTitle: "",
    location: "",
    permitType: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitPermit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/permits", formData);

      alert("Permit Created Successfully");

      setFormData({
        workTitle: "",
        location: "",
        permitType: "",
        description: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create permit"
      );
    }
  };

  return (
    <Layout>
      <h2>Create Permit</h2>

      <form onSubmit={submitPermit}>
        <div className="mb-3">
          <input
            type="text"
            name="workTitle"
            placeholder="Work Title"
            className="form-control"
            value={formData.workTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="permitType"
            className="form-control"
            value={formData.permitType}
            onChange={handleChange}
            required
          >
            <option value="">Select Permit Type</option>
            <option value="Hot Work">Hot Work</option>
            <option value="Cold Work">Cold Work</option>
            <option value="Electrical Work">
              Electrical Work
            </option>
            <option value="Confined Space">
              Confined Space
            </option>
          </select>
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Permit
        </button>
      </form>
    </Layout>
  );
}

export default CreatePermit;