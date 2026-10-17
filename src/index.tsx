import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Import screens
import Home from './screens/Home';
import Amount from './screens/Amount';
import MobileMoney from './screens/MobileMoney';
import Tracker from './screens/Tracker';
import LandingPage from './screens/LandingPage';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function RootRoute() {
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");

  if (userData?.data) {
    const hasOrders = userData.orders?.length > 0;
    return <Navigate to={hasOrders ? "/tracker" : "/home"} replace />;
  }

  return <LandingPage />;
}

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/home" element={<Home />} />
        <Route path="/amount" element={<Amount />} />
        <Route path="/MobileMoney" element={<MobileMoney />} />
        <Route path="/Tracker" element={<Tracker />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// Report web vitals (for performance tracking)
reportWebVitals();
