import { Routes, Route } from "react-router";
import "./App.css";
import LoginPage from "./routes/LoginPage";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import NavBar from "./components/NavBar";
import Landing from "./routes/Landing";
import DashboardV2 from "./routes/DashboardV2";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<DashboardV2 />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
