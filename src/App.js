import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCars from "./pages/admin/AdminCars";
import UserDashboard from "./pages/user/UserDashboard";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import Cars from "./pages/user/Cars";
import MyBookings from "./pages/user/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import BookCar from "./pages/user/BookCar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars"
          element={
            <ProtectedRoute role="USER">
              <Cars />
            </ProtectedRoute>
          }
        />
<Route path="/book/:carId" element={<BookCar />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="USER">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
       <Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/bookings" element={<AdminBookings />} />
<Route path="/admin/cars" element={<AdminCars />} />


        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
