import React, { useEffect, useState } from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import UPSA from './../../public/UPSA.png'
import PUC from './../../public/Pentecost-University-College 1.png'
import SecondaryButton from './../components/SecondaryButton'
import Header from './../components/HeaderProps'
import { useNavigate } from 'react-router-dom';

function SelectCylinder() {

  
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleContinue = () => {
    navigate('/ConfirmLocation'); 
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex', 
        height: '100vh',
        flexDirection : 'column',
        gap: isMobile ? "5%" : '10%',
      }}
    >

    <Header
      logoText="APP"
      menuItems={["Home", "Orders", "Contact Us"]}
      userName="Christine Austin"
      userInitials="CA"
      onMenuClick={(item) => alert(`Clicked on ${item}`)}
      onNotificationClick={() => alert('Notifications clicked')}
    />
      <div style={{
           display: 'flex',
           flexDirection: 'column',
           alignItems : 'flex-start',
           gap : 16,
          
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start'
        }}
      >
        <h1
          style={{
                fontSize : 28,
                fontWeight : '700'
          }}
        >
          Regular Offer
        </h1>
   
      </div>

      <div
  style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row', // Stacks vertically on mobile
    gap: 24,
    width: '100%',
    justifyContent: isMobile ? 'center' : 'flex-start', // Adjust alignment for mobile
    
  }}
>
  {[
    { size: 'Small Size', price: 'GH 3.00', imgSrc: '/small.png' },
    { size: 'Medium Size', price: 'GH 6.00', imgSrc: '/medium.png' },
  ].map((cylinder, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 24,
        alignItems: 'flex-start',
        width: isMobile ? 360 : 330, // Full-width on mobile
        gap: 8
      }}
    >
      <div
        style={{
          height: 188,
          width: '100%',
          
          backgroundColor: '#FAFAFA',
          borderRadius: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={cylinder.imgSrc} alt={`${cylinder.size} image`} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <p>{cylinder.size}</p>
        <p style={{ color: 'rgba(0,0,0,0.5)' }}>{cylinder.price}</p>
      </div>
      <SecondaryButton title="Select" onClick={handleContinue}  />
    </div>
  ))}
</div>

  

      </div>

    </div>
  );
}

export default SelectCylinder;
