import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function GeneralDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState(''); 
  const [lastName, setlastName] = useState(''); 
  const [email, setEmail] = useState(''); 


  const { phoneNumber } = location.state;



 const handleContinue = () => {
    navigate('/SelectSchool', {
      state: { 
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber : phoneNumber
      }
    });
    // console.log(phoneNumber);
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
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
