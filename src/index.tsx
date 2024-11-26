import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Import screens
import PhoneNumber from './screens/phoneNumber'
import OTP from './screens/OTP';
import GeneralDetails from './screens/GeneralDetails';
import SelectSchool from './screens/SelectSchool';
import SelectHostel from './screens/SelectHostel';
import Home from './screens/Home';
import SelectCylinder from './screens/SelectCylinder';
import ConfirmLocation from './screens/ConfirmLocation';
import Amount from './screens/Amount';
import MobileMoney from './screens/MobileMoney';
import Tracker from './screens/Tracker';
import { HostelProvider } from './screens/HostelContext';
import LandingPage from './screens/LandingPage';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HostelProvider>
        <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/PhoneNumber" element={<PhoneNumber />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/GeneralDetails" element={<GeneralDetails />} />
        <Route path="/SelectSchool" element={<SelectSchool />} />
        <Route path="/SelectHostel" element={<SelectHostel />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SelectCylinder" element={<SelectCylinder />} />
        <Route path="/ConfirmLocation" element={<ConfirmLocation />} />
        <Route path="/amount" element={<Amount />} />
        <Route path="/MobileMoney" element={<MobileMoney />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </HostelProvider>

);

// Report web vitals (for performance tracking)
reportWebVitals();
