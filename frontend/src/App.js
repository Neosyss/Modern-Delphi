import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import AdminHome from './Admin/AdminHome';
import UserPanel from './User/UserPanel';
import Navbar from './Pages/Global/Navbar';
import Login from './Auth/Login';
import ProfilePage from './Auth/ProfilePage';
import Signup from './Auth/Signup';
import SacredBlog from './Pages/SacredLibrary/SacredBlog';
import SLHome from './Pages/SacredLibrary/SLHome';
import FooterHome from './Pages/Home/FooterHome';
import JAHome from './Pages/JourneyerAnteroom/JAHome';
import JAChatRoom from './Pages/JourneyerAnteroom/JAChatRoom';
import ConsultOracleHome from './Pages/ConsultOracle/ConsultOracleHome';
import ScrollToTop from './ScrollToTop';
import { Navigate, Outlet } from "react-router-dom";
import TermsOfUse from './Pages/Global/TermsOfUse';
import LostPage from './Pages/Global/LostPage';
import StripePage from './Pages/ConsultOracle/StripePage';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentDetails from './Pages/ConsultOracle/PaymentDetails';
import AboutUs from './Pages/Global/AboutUs';

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken");
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("adminAuthToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const hideFooterRoutes = ["/journeyers-chatroom"]; // Add routes where you want to hide the footer

  return (
    <>
      <Navbar isAtHome={isHomePage} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/terms-of-use" element={<TermsOfUse termsOrPolicy={1}/>} />
        <Route path="/privacy-policy" element={<TermsOfUse termsOrPolicy={0}/>} />
        <Route path="/about-us" element={<AboutUs />} />
        
        <Route path="/sacred-library" element={<SLHome />} />
        <Route path="/sacred-blog/:id" element={<SacredBlog />} />
        <Route path="/journeyers-anteroom" element={<JAHome />} />
        <Route path="/test" element={<AdminHome />} />

        <Route path="/journeyers-chatroom" element={<JAChatRoom />} />
        <Route path="/consult-oracle" element={<ConsultOracleHome />} />
        <Route path="/payment-details/:id" element={<PaymentDetails/>} />
        <Route path="/stripe-payment/:id" element={
          <Elements stripe={stripePromise}>
            <StripePage/> 
          </Elements>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserPanel />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminHome />} />
        </Route>

      <Route path="/lost-page" element={<LostPage />} />
      <Route path="*" element={<LostPage />} />


      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <FooterHome />}
    </>
  );
};


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Layout />
    </Router>
  );
}

export default App;
