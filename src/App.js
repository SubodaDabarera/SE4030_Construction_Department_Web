import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import StaffLayout from "./layouts/StaffLayout";
import TopPMLayout from "./layouts/TopPMLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                element={<AdminLayout />}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/staff/*"
            element={
              <ProtectedRoute
                element={<StaffLayout />}
                allowedRoles={["staff", "admin"]}
              />
            }
          />

          <Route
            path="/topPM/*"
            element={
              <ProtectedRoute
                element={<TopPMLayout />}
                allowedRoles={["topPM", "admin"]}
              />
            }
          />
          <Route path="/page-not-found/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
