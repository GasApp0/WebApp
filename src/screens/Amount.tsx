import React, { useEffect, useState } from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import UPSA from './../../public/UPSA.png'
import PUC from './../../public/Pentecost-University-College 1.png'
import Header from './../components/HeaderProps'
import { useNavigate } from 'react-router-dom';


function Amount() {

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContinue = () => {
    navigate('/MobileMoney'); 
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection : 'column',
        gap: isMobile ?  "4%" : '10%'
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
      gap : 4,
      width : isMobile ?  380 : 313,
      justifyContent : 'space-between',
      height : isMobile ? '100%' : 0,
      marginBottom : isMobile ? 30 : 0
      }}>
      <div

        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start',
          width : '100%'
        }}
      >
        <h1
          style={{
                fontSize : 28,
                fontWeight : '700'
          }}
        >
          Amount
        </h1>
          
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start',
          width : '100%',
          gap : 12,
      }}>
        
        <div style={{
          gap : 12,
          display : 'flex',
          flexDirection : 'column',
          width : '100%',
        
        }}>
            <p>Enter Amount You Want To Buy</p>
            <input style={{
            backgroundColor : '#FAFAFA',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : '100%'
          }}/>
        </div> 
      </div>
      </div>


      <div style={{
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        gap : 8,
        backgroundColor : '#FAFAFA',
        padding : 12,
        borderRadius : 24,
        border : '1px solid rgba(0,0,0,0.2)',
        paddingTop : 16,
        marginTop : 64
      }}>
        <p style={{
          fontSize : 16,
          fontWeight : '700'
        }}>Cost Summary</p>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between'
        }}>
          <p style={{
            fontSize : 14,
            color : 'rgba(0, 0, 0, 0.50)'
          }}>Regular Offer</p>
          <p style={{
            fontSize : 14
          }}>Regular Offer</p>
        </div>
        
        <div style={{
          display : 'flex',
          justifyContent : 'space-between'
        }}>
          <p style={{
            fontSize : 14,
            color : 'rgba(0, 0, 0, 0.50)'
          }}>Cylinder Size</p>
          <p style={{
            fontSize : 14
          }}>GH 3.00</p>
        </div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between'
        }}>
          <p style={{
            fontSize : 14,
            color : 'rgba(0, 0, 0, 0.50)'
          }}>Amount You Want To Buy</p>
          <p style={{
            fontSize : 14
          }}>n/a</p>
        </div>

        <div style={{
          width : '100%',
          height : 1,
          backgroundColor : 'rgba(0,0,0,0.2)'
        }}></div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between'
        }}>
          <p style={{
            fontSize : 14,
            color : 'rgba(0, 0, 0, 0.50)'
          }}>Total Cost</p>
          <p style={{
            fontSize : 14
          }}>GH65.00</p>
        </div>
        <PrimaryButtom title='Continue' onClick={handleContinue}/>
      </div>

      </div>

    </div>
  );
}

export default Amount;