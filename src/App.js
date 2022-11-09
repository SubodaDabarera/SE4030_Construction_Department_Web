import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import StaffLayout from "./layouts/StaffLayout";
import TopPMLayout from "./layouts/TopPMLayout";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/staff/*" element={<StaffLayout />} />
          <Route path="/topPM/*" element={<TopPMLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
