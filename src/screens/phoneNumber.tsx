import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(''); // Added state for phone number
  const [loading, setLoading] = useState(false); // Added state for loading
  const [verificationId, setVerificationId] = useState(null);

  // const BASE_CUSTOMER_URL = 'http://34.222.42.84/v1/customers'; 
  const BASE_CUSTOMER_URL = 'https://backend-node-0kx8.onrender.com'; 
  const isButtonDisabled = phoneNumber.length < 10; // Disable button if phone number is too short

  const requestOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number.'); 
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch(`${BASE_CUSTOMER_URL}/api/auth/sendOTP`, {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          account_type: 'customer',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationId(data.verificationId); 
        navigate('/OTP', { state: { verificationId: data.verificationId } }); 
        console.log(phoneNumber)
      } else {
        alert('Could not send OTP. Please try again.'); 
      }
    } catch (error) {
      setLoading(false); 
      console.error('Error requesting OTP:', error); 
      alert((error as Error).message || 'Could not send OTP.'); 
    }
    // navigate('/OTP', { state: { phoneNumber } } );
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        overflowY: 'auto', // Allow scrolling on small screens
        
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          width : isMobile ?  380 : 323,
          marginTop :  '20vh',
          // paddingLeft : 12,
          // paddingRight : 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: '700',
            }}
          >
            Welcome to GasApp👋🏽
          </h1>
          <p
            style={{
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            Enter your phone number to start!
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            gap: 4,
          }}
        >
          <p>Phone Number</p>
          <input
            style={{
              backgroundColor: '#D9D9D9',
              alignSelf: 'stretch',
              padding: 8,
              borderRadius: 12,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
          />
        </div>

        <PrimaryButton
          title={loading ? 'Loading...' : 'Continue'}
          onClick={requestOTP}
          disabled={isButtonDisabled || loading} // Disable button if phone number is too short or if loading
        />

        <p className="w-[313px] text-center text-black/60 text-sm">
          An OTP code will be sent to your number for verification
        </p>
      </div>
    </div>
  );
}

export default App;
