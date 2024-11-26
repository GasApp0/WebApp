import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function GeneralDetails() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/SelectSchool');
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
        padding: '16px', // Add padding for small screen comfort
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
          marginTop : isMobile ? '20%' : '20vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: '700',
            }}
          >
            General Details
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 12,
            width: '100%',
          }}
        >
          <div style={{ width: '100%' }}>
            <p>First Name</p>
            <input
              style={{
                backgroundColor: '#FAFAFA',
                padding: 8,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.1)',
                width: '100%',
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <p>Last Name</p>
            <input
              style={{
                backgroundColor: '#FAFAFA',
                padding: 8,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.1)',
                width: '100%',
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <p>Email</p>
            <input
              style={{
                backgroundColor: '#FAFAFA',
                padding: 8,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.1)',
                width: '100%',
              }}
            />
          </div>
        </div>

        <PrimaryButton title="Continue" onClick={handleContinue} />
      </div>



    </div>
  );
}

export default GeneralDetails;
