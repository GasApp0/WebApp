import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const handleContinue = () => {
    navigate('/GeneralDetails');
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
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
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

        <PrimaryButton title="Continue" onClick={handleContinue} />

        <p className="w-[313px] text-center text-black/60 text-sm">
          An OTP code will be sent to your number for verification
        </p>
      </div>
    </div>
  );
}

export default App;
