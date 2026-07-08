import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PermitList from "./pages/PermitList";
import CreatePermit from "./pages/CreatePermit";
import RiskAssessment from "./pages/RiskAssessment";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/permits"
          element={<PermitList />}
        />

        <Route
          path="/create-permit"
          element={<CreatePermit />}
        />

        <Route
          path="/risk"
          element={<RiskAssessment />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;