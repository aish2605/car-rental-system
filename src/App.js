import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBooking";
import AllBookings from "./pages/AllBooking";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based access */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

         <Route path="/user/bookings" element={<MyBookings />} />
<Route path="/user/book/:carId" element={<BookingForm />} />
<Route path="/admin/bookings" element={<AllBookings />} />

      </Routes>
     

        <Footer />
    </Router>
      
  );
}

export default App;

