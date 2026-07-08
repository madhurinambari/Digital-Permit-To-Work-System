import { useState } from "react";
import Layout from "../components/Layout";

function RiskAssessment() {

  const [severity, setSeverity] = useState(1);
  const [likelihood, setLikelihood] = useState(1);

  const riskScore = severity * likelihood;

  const getRiskLevel = () => {
    if (riskScore <= 4) return "Low";
    if (riskScore <= 9) return "Medium";
    if (riskScore <= 16) return "High";
    return "Critical";
  };

  return (
    <Layout>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4>Risk Assessment</h4>
        </div>

        <div className="card-body">

          <div className="mb-3">

            <label className="form-label">
              Severity
            </label>

            <select
              className="form-select"
              value={severity}
              onChange={(e) =>
                setSeverity(Number(e.target.value))
              }
            >
              <option value="1">1 - Negligible</option>
              <option value="2">2 - Minor</option>
              <option value="3">3 - Moderate</option>
              <option value="4">4 - Major</option>
              <option value="5">5 - Catastrophic</option>
            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Likelihood
            </label>

            <select
              className="form-select"
              value={likelihood}
              onChange={(e) =>
                setLikelihood(Number(e.target.value))
              }
            >
              <option value="1">1 - Rare</option>
              <option value="2">2 - Unlikely</option>
              <option value="3">3 - Possible</option>
              <option value="4">4 - Likely</option>
              <option value="5">5 - Almost Certain</option>
            </select>

          </div>

          <hr />

          <h4>
            Risk Score: {riskScore}
          </h4>

          <h4>
            Risk Level:
            {" "}
            <span
              className={
                getRiskLevel() === "Low"
                  ? "text-success"
                  : getRiskLevel() === "Medium"
                  ? "text-warning"
                  : getRiskLevel() === "High"
                  ? "text-danger"
                  : "text-dark"
              }
            >
              {getRiskLevel()}
            </span>
          </h4>

        </div>

      </div>

    </Layout>
  );
}

export default RiskAssessment;