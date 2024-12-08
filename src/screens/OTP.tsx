import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const BASE_CUSTOMER_URL = 'https://backend-node-0kx8.onrender.com'; 
  const [error, setError] = useState('')
  const [otp, setOtp] = useState(Array(4).fill(''))
  const [loading, setLoading] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isButtonDisabled = otp.length < 10; 
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  
    // Move focus to next or previous input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };
  

  const handleContinue = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${BASE_CUSTOMER_URL}/api/auth/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/GeneralDetails'); 
        console.log('yay')
      } else {
        setError(data.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.log('nay')
    } finally {
      setLoading(false);
    }



  };

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      overflowY: 'auto', 
      
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
            OTP Verification
          </h1>
          <p
            style={{
              color: 'rgba(0,0,0,0.6)',
              width: '313px',
            }}
          >
            Enter the verification code we just sent to your email address
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            gap: 2,
          }}
        >
          <div
            style={{
              gap: 4,
              display: 'flex',
              justifyContent : 'space-between',
              width : '100%'
            }}
          >
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <input
                key={index}
                id={`otp-${index}`}
                value={otp[index]}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                style={{
                  backgroundColor: '#D9D9D9',
                  alignSelf: 'stretch',
                  padding: 8,
                  borderRadius: 12,
                  border: '1px solid rgba(0,0,0,0.1)',
                  width: 50,
                }}
              />
              ))}
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <PrimaryButton title="Continue" onClick={handleContinue} disabled={isButtonDisabled || loading} />

        <p className="w-[313px] text-center text-black/60 text-sm">
          An OTP code will be sent to your number for verification
        </p>
      </div>
    </div>
  );
}

export default App;
