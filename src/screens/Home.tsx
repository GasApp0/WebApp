import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import Header from './../components/HeaderProps';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContinue = () => {
    navigate('/SelectCylinder');
  };

  useEffect(() => {
    const userData_ = JSON.parse(localStorage.getItem("userData") || "{}");
    const userData = userData_.data || null;
    if (userData && userData.firstName && userData.lastName) {
      setUserName(`${userData.firstName} ${userData.lastName}`);
      setUserInitials(`${userData.firstName[0]}${userData.lastName[0]}`);
      // console.log(userName)
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        flex: 1,
        alignItems:  isMobile ? 'flex-start': 'center',
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        gap: isMobile ? '5%' : '0%',
        // padding: isMobile ? '10px' : '0',
        // marginLeft : isMobile ? '12%' : '0'
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: isMobile ? 'center' : 'flex-start',
          gap: 24,
          marginInline: isMobile ? '5%' : '0%',
          // backgroundColor : 'red',
          width : '50%',
          marginTop : isMobile ? '30%' : "10%"
        
        }}
      >
        <div>
          <p
            style={{
              fontSize: isMobile ? 16 : 20,
              fontWeight: '700',
            }}
          >
            Select Offer
          </p>
          <p
            style={{
              fontSize: isMobile ? 12 : 14,
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            Select your prefer gas filling offer
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 24,
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '160%' : '120%',
            // backgroundColor : 'red'
          }}
        >
          <div
            style={{
              width: isMobile ? '110%' : '50%',
              padding: 16,
              gap: 24,
              backgroundColor: 'black',
              borderRadius: 16,
              flexDirection: 'column',
              // alignItems: 'flex-start',
              justifyContent: 'center',
              display: 'flex',
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleContinue}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#333')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'black')
            }
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
               <path d="M21.56 11.2401L20.2 9.66006C19.94 9.36006 19.73 8.80006 19.73 8.40006V6.70006C19.73 5.64006 18.86 4.77006 17.8 4.77006H16.1C15.71 4.77006 15.14 4.56006 14.84 4.30006L13.26 2.94006C12.57 2.35006 11.44 2.35006 10.74 2.94006L9.17 4.31006C8.87 4.56006 8.3 4.77006 7.91 4.77006H6.18C5.12 4.77006 4.25 5.64006 4.25 6.70006V8.41006C4.25 8.80006 4.04 9.36006 3.79 9.66006L2.44 11.2501C1.86 11.9401 1.86 13.0601 2.44 13.7501L3.79 15.3401C4.04 15.6401 4.25 16.2001 4.25 16.5901V18.3001C4.25 19.3601 5.12 20.2301 6.18 20.2301H7.91C8.3 20.2301 8.87 20.4401 9.17 20.7001L10.75 22.0601C11.44 22.6501 12.57 22.6501 13.27 22.0601L14.85 20.7001C15.15 20.4401 15.71 20.2301 16.11 20.2301H17.81C18.87 20.2301 19.74 19.3601 19.74 18.3001V16.6001C19.74 16.2101 19.95 15.6401 20.21 15.3401L21.57 13.7601C22.15 13.0701 22.15 11.9301 21.56 11.2401ZM16.16 10.6101L11.33 15.4401C11.19 15.5801 11 15.6601 10.8 15.6601C10.6 15.6601 10.41 15.5801 10.27 15.4401L7.85 13.0201C7.56 12.7301 7.56 12.2501 7.85 11.9601C8.14 11.6701 8.62 11.6701 8.91 11.9601L10.8 13.8501L15.1 9.55006C15.39 9.26006 15.87 9.26006 16.16 9.55006C16.45 9.84006 16.45 10.3201 16.16 10.6101Z" fill="#52B922"/>
              </svg>
              <p
                style={{
                  fontSize: 12,
                  color: '#ffffff70',
                  padding: 4,
                  border: '1px solid #ffffff20',
                  borderRadius: 60,
                  backgroundColor: '#ffffff20',
                }}
              >
                Average{' '}
                <span
                  style={{
                    color: 'white',
                  }}
                >
                  GH10 /fill
                </span>
              </p>
            </div>
            <div style={{
              display : 'flex',
              flexDirection  :'column',
              gap : 8
            }}>
              <p
                style={{
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                Regular Offer (2pm to 4pm)
              </p>
              <p
                style={{
                  color: '#ffffff80',
                  fontSize: 14,
                }}
              >
                Enjoy the convenience of having your LPG cylinder delivered to
                your home from 2pm to 4pm! We ensure timely deliveries so you
                can plan your day without any disruptions.
              </p>
            </div>
          </div>

          <div
            style={{
              width: isMobile ? '110%' : '50%',
              padding: 16,
              gap: 24,
              backgroundColor: '#FAFAFA',
              borderRadius: 16,
              flexDirection: 'column',
              // alignItems: 'flex-start',
              justifyContent: 'center',
              display: 'flex',
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              opacity : '0.9'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
               <path d="M16.75 4.06V2.5C16.75 2.09 16.41 1.75 16 1.75C15.59 1.75 15.25 2.09 15.25 2.5V4H8.74999V2.5C8.74999 2.09 8.40999 1.75 7.99999 1.75C7.58999 1.75 7.24999 2.09 7.24999 2.5V4.06C4.54999 4.31 3.23999 5.92 3.03999 8.31C3.01999 8.6 3.25999 8.84 3.53999 8.84H20.46C20.75 8.84 20.99 8.59 20.96 8.31C20.76 5.92 19.45 4.31 16.75 4.06Z" fill="#FFC700"/>
               <path d="M20 10.34H4C3.45 10.34 3 10.79 3 11.34V17.5C3 20.5 4.5 22.5 8 22.5H16C19.5 22.5 21 20.5 21 17.5V11.34C21 10.79 20.55 10.34 20 10.34ZM9.21 18.71C9.11 18.8 9 18.87 8.88 18.92C8.76 18.97 8.63 19 8.5 19C8.37 19 8.24 18.97 8.12 18.92C8 18.87 7.89 18.8 7.79 18.71C7.61 18.52 7.5 18.26 7.5 18C7.5 17.74 7.61 17.48 7.79 17.29C7.89 17.2 8 17.13 8.12 17.08C8.36 16.98 8.64 16.98 8.88 17.08C9 17.13 9.11 17.2 9.21 17.29C9.39 17.48 9.5 17.74 9.5 18C9.5 18.26 9.39 18.52 9.21 18.71ZM9.42 14.88C9.37 15 9.3 15.11 9.21 15.21C9.11 15.3 9 15.37 8.88 15.42C8.76 15.47 8.63 15.5 8.5 15.5C8.37 15.5 8.24 15.47 8.12 15.42C8 15.37 7.89 15.3 7.79 15.21C7.7 15.11 7.63 15 7.58 14.88C7.53 14.76 7.5 14.63 7.5 14.5C7.5 14.37 7.53 14.24 7.58 14.12C7.63 14 7.7 13.89 7.79 13.79C7.89 13.7 8 13.63 8.12 13.58C8.36 13.48 8.64 13.48 8.88 13.58C9 13.63 9.11 13.7 9.21 13.79C9.3 13.89 9.37 14 9.42 14.12C9.47 14.24 9.5 14.37 9.5 14.5C9.5 14.63 9.47 14.76 9.42 14.88ZM12.71 15.21C12.61 15.3 12.5 15.37 12.38 15.42C12.26 15.47 12.13 15.5 12 15.5C11.87 15.5 11.74 15.47 11.62 15.42C11.5 15.37 11.39 15.3 11.29 15.21C11.11 15.02 11 14.76 11 14.5C11 14.24 11.11 13.98 11.29 13.79C11.39 13.7 11.5 13.63 11.62 13.58C11.86 13.47 12.14 13.47 12.38 13.58C12.5 13.63 12.61 13.7 12.71 13.79C12.89 13.98 13 14.24 13 14.5C13 14.76 12.89 15.02 12.71 15.21Z" fill="#FFC700"/>
             </svg>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.6)',
                  padding: 4,
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 60,
                  backgroundColor: 'white',
                }}
              >
                Average{' '}
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  GH10 /fill
                </span>
              </p>
            </div>
            <div>
              <p
                style={{
                  fontWeight: '700',
                  color: 'black',
                }}
              >
                Semester Offer (Coming Soon)
              </p>
              <p
                style={{
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: 12,
                }}
              >
            Eliminate the stress of managing gas refills with GasApp's Semester Subscription Offer! Pay once at the start of the semester and get enough LPG to last the entire term. Enjoy convenient refills delivered directly to your doorstep whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
