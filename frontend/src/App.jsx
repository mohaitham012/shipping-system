import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tracking" element={<Tracking/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
