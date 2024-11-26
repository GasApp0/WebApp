import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/HeaderProps';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HeroImage } from './../../public/hero.svg'

function LandingPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContinue = () => {
    navigate('/SelectCylinder');
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems:  isMobile ? 'flex-start': 'center',
        display: 'flex',
        // height: '100vh',
        flexDirection: 'column',
        gap: isMobile ? '5%' : '10%',
        // padding: isMobile ? '10px' : '0',
        // marginLeft : isMobile ? '12%' : '0'
      }}
    >

      <div style={{
        width : '100%',
        position : 'fixed'
      }}>

      <Header
        logoText="APP"
        menuItems={["Home", "Orders", "Contact Us"]}
        userName="Christine Austin"
        userInitials="CA"
        onMenuClick={(item) => alert(`Clicked on ${item}`)}
        onNotificationClick={() => alert('Notifications clicked')}
      />

      <div style={{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        gap: 12,
        paddingBlock : 4,
        backgroundColor : '#FAFAFA',
        borderBottom : '1px solid rgba(0,0,0,0.1)'
      }}>
        <p style={{
          color : 'rgba(0,0,0,0.7)'
        }}>Mobile App Coming Soon 🚀</p>
        <p>Gas Delivery Starts At 2pm</p>
      </div>

      </div>

      <div style={{
        backgroundColor : '#fafafa',
        width : '90%',
        height : 720,
        marginTop : "10%",
        borderRadius : 24,
        border : '1px solid rgba(0,0,0,0.1)',
        borderStyle : 'dashed',
        display : 'flex',
        paddingTop : '5%',
        flexDirection : 'column',
        alignItems : 'center',
        gap : 40,
        overflow : 'hidden'
      }}>

        <div style={{
          display : 'flex',
          flexDirection : 'column',
          alignItems : 'center',
          gap : 12
        }}>
          <p style={{
            fontSize : 32,
            textAlign : 'center',
            fontWeight : '700'
          }}>Your Hassle-Free Solution for <br /> <span style={{
            color : 'rgba(0,0,0,0.5)'
          }}>convenient LPG refills </span>🚀 </p>
           <button
            style={{
              padding: "12px 40px",
              borderRadius: 24,
              backgroundColor: "black",
              color: "White",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#333')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'black')
            }
            onClick={() => navigate("/PhoneNumber")} // Navigate to the Sign Up page
          >
            Get Started
          </button>
        </div>

        <div style={{
          display : 'flex',
          flexDirection : 'column',
          width : 380,
          borderRadius : 36,
          backgroundColor : 'white',
          paddingInline : 16,
          paddingBlock : 8,
          gap : 12,
          border: '1px solid rgba(0,0,0,0.06)',
          marginBottom : 54
        }}>
          <div style={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            justifyItems : 'center',
            
          }}>
            <p style={{
            fontWeight : '700'
          }}>9:41</p>
            <div style={{
              display : 'flex',
              gap : 8,
             
            }}>

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M10 3.5C10 2.94772 10.4477 2.5 11 2.5H12C12.5523 2.5 13 2.94772 13 3.5V11.5C13 12.0523 12.5523 12.5 12 12.5H11C10.4477 12.5 10 12.0523 10 11.5V3.5Z" fill="black"/>
              <path d="M15 1.5C15 0.947715 15.4477 0.5 16 0.5H17C17.5523 0.5 18 0.947715 18 1.5V11.5C18 12.0523 17.5523 12.5 17 12.5H16C15.4477 12.5 15 12.0523 15 11.5V1.5Z" fill="black"/>
              <path d="M5 7C5 6.44772 5.44772 6 6 6H7C7.55228 6 8 6.44772 8 7V11.5C8 12.0523 7.55228 12.5 7 12.5H6C5.44772 12.5 5 12.0523 5 11.5V7Z" fill="black"/>
              <path d="M0 9.5C0 8.94772 0.447715 8.5 1 8.5H2C2.55228 8.5 3 8.94772 3 9.5V11.5C3 12.0523 2.55228 12.5 2 12.5H1C0.447715 12.5 0 12.0523 0 11.5V9.5Z" fill="black"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50047 3.17053C10.967 3.17065 13.3393 4.13806 15.1269 5.87283C15.2615 6.00676 15.4766 6.00507 15.6092 5.86904L16.896 4.54346C16.9631 4.47446 17.0006 4.38101 17 4.28377C16.9994 4.18653 16.9609 4.09353 16.893 4.02535C12.2011 -0.564438 4.79908 -0.564438 0.107163 4.02535C0.0391973 4.09348 0.000634479 4.18646 7.75932e-06 4.28369C-0.00061896 4.38093 0.0367421 4.47441 0.103824 4.54346L1.39096 5.86904C1.52346 6.00527 1.73878 6.00696 1.87331 5.87283C3.66116 4.13795 6.03367 3.17053 8.50047 3.17053ZM8.53591 7.17238C9.89112 7.1723 11.198 7.68647 12.2025 8.61499C12.3384 8.74677 12.5524 8.74392 12.6849 8.60856L13.9702 7.28297C14.0379 7.21344 14.0754 7.11912 14.0744 7.0211C14.0735 6.92309 14.034 6.82956 13.965 6.76145C10.9059 3.85686 6.16853 3.85686 3.10945 6.76145C3.04035 6.82956 3.00092 6.92314 3.00002 7.02118C2.99911 7.11923 3.0368 7.21354 3.10462 7.28297L4.38954 8.60856C4.52199 8.74392 4.73602 8.74677 4.87189 8.61499C5.87578 7.68708 7.18159 7.17296 8.53591 7.17238ZM11.1496 9.75972C11.1515 9.85801 11.1137 9.95278 11.0449 10.0216L8.82165 12.3119C8.75648 12.3792 8.66762 12.4171 8.57491 12.4171C8.4822 12.4171 8.39334 12.3792 8.32817 12.3119L6.10452 10.0216C6.03583 9.95272 5.99804 9.85793 6.00008 9.75964C6.00212 9.66135 6.0438 9.56827 6.11528 9.50239C7.53515 8.27655 9.61467 8.27655 11.0345 9.50239C11.106 9.56833 11.1476 9.66143 11.1496 9.75972Z" fill="black"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="13" viewBox="0 0 28 13" fill="none">
              <path opacity="0.35" d="M4 0.527543H21C22.9178 0.527543 24.4725 2.08222 24.4725 4V9C24.4725 10.9178 22.9178 12.4725 21 12.4725H4C2.08222 12.4725 0.527543 10.9178 0.527543 9V4C0.527543 2.08221 2.08221 0.527543 4 0.527543Z" stroke="black" stroke-width="1.05509"/>
              <path opacity="0.4" d="M26 5V9.22034C26.8491 8.86291 27.4012 8.0314 27.4012 7.11017C27.4012 6.18894 26.8491 5.35744 26 5" fill="black"/>
              <path d="M2 4C2 2.89543 2.89543 2 4 2H21C22.1046 2 23 2.89543 23 4V9C23 10.1046 22.1046 11 21 11H4C2.89543 11 2 10.1046 2 9V4Z" fill="black"/>
            </svg>

            </div>
          </div>
            
          <p style={{
            fontWeight : '700'
          }}>Gas<span style={{
            color : 'rgba(0,0,0,0.6)'
          }}>App</span> </p>

          <div
            style={{
              width: '100%',
              padding: 16,
              gap: 24,
              backgroundColor: '#F4F4F4',
              borderRadius: 16,
              flexDirection: 'column',
              // alignItems: 'flex-start',
              justifyContent: 'center',
              display: 'flex',
              border: '1px solid rgba(0,0,0,0.06)',
              cursor: 'pointer',
              zIndex : 999
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
               <path d="M21.56 11.2401L20.2 9.66006C19.94 9.36006 19.73 8.80006 19.73 8.40006V6.70006C19.73 5.64006 18.86 4.77006 17.8 4.77006H16.1C15.71 4.77006 15.14 4.56006 14.84 4.30006L13.26 2.94006C12.57 2.35006 11.44 2.35006 10.74 2.94006L9.17 4.31006C8.87 4.56006 8.3 4.77006 7.91 4.77006H6.18C5.12 4.77006 4.25 5.64006 4.25 6.70006V8.41006C4.25 8.80006 4.04 9.36006 3.79 9.66006L2.44 11.2501C1.86 11.9401 1.86 13.0601 2.44 13.7501L3.79 15.3401C4.04 15.6401 4.25 16.2001 4.25 16.5901V18.3001C4.25 19.3601 5.12 20.2301 6.18 20.2301H7.91C8.3 20.2301 8.87 20.4401 9.17 20.7001L10.75 22.0601C11.44 22.6501 12.57 22.6501 13.27 22.0601L14.85 20.7001C15.15 20.4401 15.71 20.2301 16.11 20.2301H17.81C18.87 20.2301 19.74 19.3601 19.74 18.3001V16.6001C19.74 16.2101 19.95 15.6401 20.21 15.3401L21.57 13.7601C22.15 13.0701 22.15 11.9301 21.56 11.2401ZM16.16 10.6101L11.33 15.4401C11.19 15.5801 11 15.6601 10.8 15.6601C10.6 15.6601 10.41 15.5801 10.27 15.4401L7.85 13.0201C7.56 12.7301 7.56 12.2501 7.85 11.9601C8.14 11.6701 8.62 11.6701 8.91 11.9601L10.8 13.8501L15.1 9.55006C15.39 9.26006 15.87 9.26006 16.16 9.55006C16.45 9.84006 16.45 10.3201 16.16 10.6101Z" fill="#52B922"/>
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
                Affordable{' '}
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  Refill🚀
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
                Regular Offer (2pm to 4pm)
              </p>
                
                <div style={{
                  width : 230,
                  height : 10,
                  backgroundColor : '#D0D3DA',
                  borderRadius : 12,
                  marginBlock : 8
                }}></div>

                <div style={{
                  width : 270,
                  height : 10,
                  backgroundColor : '#D0D3DA',
                  borderRadius : 12,
                  marginBlock : 8
                }}></div>

            </div>
          </div>

          <div style={{
            display : 'flex',
            marginInline : 30,
            justifyContent : 'space-between',
            top : '-5%',
            position : 'relative'
          }}>

          <div style={{
            width : 1,
            height : 20,
            backgroundColor : 'rgba(0,0,0,0.2)'
          }}></div>
          <div style={{
            width : 1,
            height : 20,
            backgroundColor : 'black'
          }}></div>
          <div style={{
            width : 1,
            height : 20,
            backgroundColor : 'rgba(0,0,0,0.2)'
          }}></div>

          </div>

          <div
      style={{
        padding: '12px',
        borderWidth: '1px',
        borderRadius: '12px',
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#FAFAFA',
        gap: '12px',
        position : 'relative',
        top : "-8%"
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: '700' }}>Slider</span>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              color: 'rgba(0,0,0,0.5)',
              padding: '4px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              borderWidth: '1px',
              borderColor: 'rgba(0,0,0,0.1)',
              fontSize : 12
            }}
          >
            10 Kg
          </span>

          <span style={{ fontSize: '16px', fontWeight: '700' }}>
            GHC 50.00
          </span>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        style={{ width: '100%', height: '40px', }}
        min={0}
        max={1}
        step={0.01}
        value={0.6}
        // onChange={(e) => setSliderValue(parseFloat(e.target.value))}
        // style={{
        //   // background: `linear-gradient(to right, #000000 , rgba(0,0,0,0.1) `,
        // }}
      />

      {/* Slider Track */}
      <div
        style={{
          width: '279px',
          height: '13px',
          backgroundColor: '#D0D3DA',
          borderRadius: '12px',
          opacity: 0.7,
        }}
      ></div>
          </div>

          <div style={{
            display : 'flex',
            marginInline : 30,
            justifyContent : 'space-between',
            top : '-11%',
            position : 'relative',
           
          }}>

          <div style={{
            width : 1,
            height : 30,
            backgroundColor : 'rgba(0,0,0,0.2)'
          }}></div>

          <div style={{
            display : 'flex',
            gap : 24,
            bottom : '-50%',
            position : 'relative',
            left : '-14%',
             alignItems : 'center',
            justifyItems : 'center',
            marginBottom : 44
          }}> 

          <div style={{
            padding : 12,
            borderRadius : 24,
            backgroundColor : 'black'
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14.8933 6.21992L13.56 5.55325C13.3133 5.43325 13.0067 5.52659 12.8867 5.77325C12.76 6.02659 12.86 6.32659 13.1067 6.44659L14.1667 6.97325V10.1666L11.6667 10.1733V3.33325C11.6667 1.99992 10.7733 1.33325 9.66666 1.33325H4.33333C3.22666 1.33325 2.33333 1.99992 2.33333 3.33325V14.1666H1.33333C1.05999 14.1666 0.833328 14.3933 0.833328 14.6666C0.833328 14.9399 1.05999 15.1666 1.33333 15.1666H12.6667C12.94 15.1666 13.1667 14.9399 13.1667 14.6666C13.1667 14.3933 12.94 14.1666 12.6667 14.1666H11.6667V11.1733L14.6667 11.1666C14.9467 11.1666 15.1667 10.9399 15.1667 10.6666V6.66659C15.1667 6.47992 15.06 6.30659 14.8933 6.21992ZM4 4.59325C4 3.66659 4.56666 3.33325 5.25999 3.33325H8.74666C9.43333 3.33325 10 3.66659 10 4.59325V5.41325C10 6.33325 9.43333 6.66659 8.73999 6.66659H5.25999C4.56666 6.66659 4 6.33325 4 5.40659V4.59325ZM4.33333 8.16659H6.33333C6.60666 8.16659 6.83333 8.39325 6.83333 8.66659C6.83333 8.93992 6.60666 9.16659 6.33333 9.16659H4.33333C4.06 9.16659 3.83333 8.93992 3.83333 8.66659C3.83333 8.39325 4.06 8.16659 4.33333 8.16659Z" fill="white"/>
          </svg>
          </div>

          <p>Filling Process</p>

          <p style={{
            color : '#52B922'
          }}>Completed</p>

          </div>
        

          </div>

        </div>
        

      </div>

   

   
    </div>
  );
}

export default LandingPage;
