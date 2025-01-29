import React, { useEffect, useState } from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import ProgressBar from '../components/ProgressBar';
import Header from './../components/HeaderProps'
import { useNavigate } from 'react-router-dom';


function Tracker() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [status, setStatus] =useState("")

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() =>{
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const currentOrders = userData?.orders || []
  
    // console.log(status)

    setStatus(currentOrders[0]?.orderStatus)
  }, [])

  

  

  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        height: isMobile ? '80vh' : '100vh',
        flexDirection : 'column',
        gap: "4%"
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
           gap : 24,
           width : isMobile ?  380 : 313,
           alignItems: 'center',
           marginTop : isMobile ? '30%' : "10%",
      }}>
        
        <div style={{
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'space-between',
          width : '100%', 
        }}>
          <div style={{
            display : 'flex',
            gap : 12,
            alignItems : 'center',

          }}>
      
              <div>
                  <p style={{
                    fontSize : 14,
                    fontWeight : '700'
                  }}>Hello Chris 👋</p>
                  <p style={{
                    fontSize : 10,
                  }}>Let’s fill your LPG for you in less that 5 minutes</p>
              </div>
          </div>
          <div>
       
          </div>
          
        </div>

        <div style={{
           width : '100%',
           
        }}>
          <p style={{
            fontSize : 18,
            fontWeight : '700'
          }}>Track All Activities Here (Order #3)</p>
           <p style={{
            fontSize : 12,
            color : 'rgba(0,0,0,0.6)'
          }}>Enjoy real time track system as your Gas cylinder get filled</p>
        </div>

        <div style={{
           display: 'flex',
           flexDirection: 'column',
           alignItems : 'flex-start',
           gap : 24,
       
           width : '100%'
        }}>
          
        <div style={{
          display : 'flex'
        }}>
        <div style={{
          display: 'flex',
          gap : 12,
        
        }}>
            <div style={{
                display : 'flex',
                border : '1px solid rgba(0,0,0,0.1)',
                borderRadius : 24,
                borderStyle : 'dashed',
                height : 50,
                width : 50,
                alignItems : 'center',
                justifyContent : 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.0933 5.08008H4.57997C3.33997 5.08008 3.05997 5.70009 2.90664 6.46676L2.33997 9.16675H10.34L9.77331 6.46676C9.60664 5.70009 9.3333 5.08008 8.0933 5.08008Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3267 13.5735C11.38 14.1602 10.9133 14.6668 10.3133 14.6668H9.37333C8.83333 14.6668 8.76 14.4335 8.66 14.1535L8.56 13.8535C8.42 13.4468 8.32667 13.1668 7.60667 13.1668H5.04667C4.32667 13.1668 4.22 13.4802 4.09333 13.8535L3.99334 14.1535C3.9 14.4402 3.82667 14.6668 3.28 14.6668H2.34C1.74 14.6668 1.26667 14.1602 1.32667 13.5735L1.60667 10.5268C1.68 9.77348 1.82 9.16016 3.13333 9.16016H9.51334C10.8267 9.16016 10.9667 9.77348 11.04 10.5268L11.3267 13.5735Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.33331 7.66699H1.83331" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.8333 7.66699H10.3333" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.33331 11.167H4.83331" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.83331 11.167H9.33331" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.4733 5.82677C12.66 5.39344 12.5933 4.80678 12.2467 4.29345C11.9067 3.78012 11.3867 3.49345 10.9133 3.50011" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.5467 6.48682C14.8267 5.48015 14.6267 4.24684 13.9133 3.18018C13.2 2.11351 12.1333 1.46016 11.0933 1.3335" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div style={{
              display : 'flex',
              flexDirection : 'column',
            }}> 

                <p style={{
                  fontSize : 14
                }}>Rider will arrive at your location soon</p>
                 <p style={{
                  fontSize : 12,
                  color : 'rgba(0,0,0,0.6)'
                }}>Arriving in 15 to 30 minutes</p>
               <ProgressBar progress={ status === "pending" ? 0 : 0}/>
            </div>
            
        </div>
        
        </div>
          
        <div style={{
              width : 2,
              height : 20,
              border : '1px dashed rgba(0,0,0,0.2)',
              marginLeft : '7%'
            }}></div> 

          
        <div style={{
          display: 'flex',
          gap : 16,
          width : '100%',
        }}>
            <div style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                marginLeft : '4%',
               
                
            }}>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.33331 14.6663V3.33301C2.33331 1.99967 3.22665 1.33301 4.33331 1.33301H9.66665C10.7733 1.33301 11.6666 1.99967 11.6666 3.33301V14.6663H2.33331Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.33331 14.667H12.6666" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.59331 6.66714H8.41331C9.10665 6.66714 9.67331 6.33381 9.67331 5.40715V4.58715C9.67331 3.66048 9.10665 3.32715 8.41331 3.32715H5.59331C4.89998 3.32715 4.33331 3.66048 4.33331 4.58715V5.40715C4.33331 6.33381 4.89998 6.66714 5.59331 6.66714Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.33331 8.66699H6.33331" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.6667 10.6733L14.6667 10.6667V6.66667L13.3334 6" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>

            <div style={{
              display : 'flex',
              flexDirection : 'row',
              gap : 24
            }}> 

                <p style={{
                  fontSize : 14,
                    color : 'rgba(0,0,0,0.6)'
                }}>Filling Process</p>

                <p style={{
                  fontSize : 14,
                  color : 'rgba(0,0,0,0.5)'
                }}>Waiting</p>
        
            </div>
            
        </div>

        <div style={{
              width : 2,
              height : 20,
              border : '1px dashed rgba(0,0,0,0.2)',
              marginLeft : '7%'
            }}></div> 

        <div style={{
          display: 'flex',
          gap : 12,
          width : '100%',
        }}>
            <div style={{
                display : 'flex',
                border : '1px solid rgba(0,0,0,0.1)',
                borderRadius : 24,
                borderStyle : 'dashed',
                height : 50,
                width : 50,
                alignItems : 'center',
                justifyContent : 'center'
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14.3733 7.15988L13.4667 6.10654C13.2933 5.90654 13.1533 5.53321 13.1533 5.26654V4.13321C13.1533 3.42654 12.5733 2.84654 11.8667 2.84654H10.7333C10.4733 2.84654 10.0933 2.70654 9.89333 2.53321L8.84 1.62654C8.38 1.23321 7.62667 1.23321 7.16 1.62654L6.11333 2.53988C5.91333 2.70654 5.53333 2.84654 5.27333 2.84654H4.12C3.41333 2.84654 2.83333 3.42654 2.83333 4.13321V5.27321C2.83333 5.53321 2.69333 5.90654 2.52667 6.10654L1.62667 7.16654C1.24 7.62654 1.24 8.37321 1.62667 8.83321L2.52667 9.89321C2.69333 10.0932 2.83333 10.4665 2.83333 10.7265V11.8665C2.83333 12.5732 3.41333 13.1532 4.12 13.1532H5.27333C5.53333 13.1532 5.91333 13.2932 6.11333 13.4665L7.16667 14.3732C7.62667 14.7665 8.38 14.7665 8.84667 14.3732L9.9 13.4665C10.1 13.2932 10.4733 13.1532 10.74 13.1532H11.8733C12.58 13.1532 13.16 12.5732 13.16 11.8665V10.7332C13.16 10.4732 13.3 10.0932 13.4733 9.89321L14.38 8.83988C14.7667 8.37988 14.7667 7.61988 14.3733 7.15988ZM10.7733 6.73988L7.55333 9.95988C7.46 10.0532 7.33333 10.1065 7.2 10.1065C7.06667 10.1065 6.94 10.0532 6.84667 9.95988L5.23333 8.34654C5.04 8.15321 5.04 7.83321 5.23333 7.63988C5.42667 7.44654 5.74667 7.44654 5.94 7.63988L7.2 8.89988L10.0667 6.03321C10.26 5.83988 10.58 5.83988 10.7733 6.03321C10.9667 6.22654 10.9667 6.54654 10.7733 6.73988Z" fill="black" fill-opacity="0.6"/>
            </svg>
            </div>

            <div style={{
              display : 'flex',
              flexDirection : 'column',
            
            }}> 

               <p style={{
                  fontSize : 14
                }}>Refill Completion</p>
                 <p style={{
                  fontSize : 12,
                  color : 'rgba(0,0,0,0.6)'
                }}>n/a</p>
               <ProgressBar progress={status === "pending" ? 0 : 0}/>
            </div>
            
        </div> 
        </div>

      </div>

    </div>
  );
}

export default Tracker;
