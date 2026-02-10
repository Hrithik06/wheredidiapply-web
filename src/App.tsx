import { Routes, Route } from "react-router";
import "./App.css";
import LoginPage from "./routes/LoginPage";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
