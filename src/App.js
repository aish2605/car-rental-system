import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/contact";
import CarList from "./pages/CarList"; // Renamed to CarCatalog or similar for clarity
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute"; // Note: This must be updated to handle allowedRoles
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

{/* ----------------- 1. PUBLIC ROUTES ----------------- */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  
  {/* The Car List can be public to browse, but booking requires login. */}
  <Route path="user/cars" element={<CarList />} /> 
  
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
 

{/* USER Routes */}
<Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
    <Route path="/user" element={<UserDashboard />} />
    
    {/* 🛑 FIX: Add the missing /user/cars route here */}
    <Route path="/user/cars" element={<CarList isBookingMode={true} />} />
    
    <Route path="/user/bookings" element={<MyBookings />} />
    <Route path="/user/book/:carId" element={<BookingForm />} />
</Route>

{/* ADMIN Routes */}
<Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/bookings" element={<AllBookings />} />
    {/* Other admin routes like /admin/cars, etc. */}
</Route>

</Routes>

        <Footer />
    </Router>
      
  );
}

export default App;