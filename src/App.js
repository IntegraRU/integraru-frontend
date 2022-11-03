import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import UserAccess from "./pages/UserAccess";
import { AdminRoute, UserRoute } from "./util/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" />} />

        <Route path="/authentication" element={<UserAccess />} />
        <Route path="/admin-home" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
