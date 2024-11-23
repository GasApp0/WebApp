import React from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import UPSA from './../../public/UPSA.png'
import PUC from './../../public/Pentecost-University-College 1.png'
import Header from './../components/HeaderProps'

function ConfirmLocation() {
  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection : 'column',
        gap: "2%"
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
           width : 313
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
                fontSize : 24,
                fontWeight : '700'
          }}
        >
          Confirm Location
        </h1>
   
      </div>

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start',
          width : '100%',
          gap : 12,
        
      }}>
        
        <div style={{
          gap : 4,
          display : 'flex',
          flexDirection : 'column',
          width : '100%',
          
        }}>
            <p>Select New Hostel</p>
            <input style={{
            backgroundColor : '#FAFAFA',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : '100%'
          }}/>
        </div> 

        <div style={{
          display : 'flex',
          flexDirection : 'column',
          width : '100%',
          gap : 12
        }}>
          <div style={{
            display : 'flex',
            flexDirection : 'column'
          }}>
            <p style={{
              fontWeight : '700',
              fontSize : 16
            }}>Selected Hostel</p>
            <p style={{
              color : 'rgba(0,0,0,0.6)'
            }}>Confirm your hostel to continue</p>
          </div>

          <div style={{
              backgroundColor : '#FAFAFA',
              padding : 8,
              borderRadius : 12,
              border: "1px solid rgba(0,0,0,0.1)" ,
              width : '100%',
              display : 'flex',
              justifyContent : 'space-between'
          }}>
            <p style={{
              fontSize : 14
            }}>Suncity Hostel</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#52B922"/>
            </svg>
          </div>

          <div style={{
            display : 'flex',
            gap : 12,
            padding : 12,
            borderRadius : 12,
            backgroundColor : '#FAFAFA'
          }}>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14.3733 7.16012L13.4667 6.10679C13.2933 5.90679 13.1533 5.53345 13.1533 5.26679V4.13345C13.1533 3.42679 12.5733 2.84679 11.8667 2.84679H10.7333C10.4733 2.84679 10.0933 2.70679 9.89333 2.53345L8.84 1.62679C8.38 1.23345 7.62667 1.23345 7.16 1.62679L6.11333 2.54012C5.91333 2.70679 5.53333 2.84679 5.27333 2.84679H4.12C3.41333 2.84679 2.83333 3.42679 2.83333 4.13345V5.27345C2.83333 5.53345 2.69333 5.90679 2.52667 6.10679L1.62667 7.16679C1.24 7.62679 1.24 8.37345 1.62667 8.83345L2.52667 9.89345C2.69333 10.0935 2.83333 10.4668 2.83333 10.7268V11.8668C2.83333 12.5735 3.41333 13.1535 4.12 13.1535H5.27333C5.53333 13.1535 5.91333 13.2935 6.11333 13.4668L7.16667 14.3735C7.62667 14.7668 8.38 14.7668 8.84667 14.3735L9.9 13.4668C10.1 13.2935 10.4733 13.1535 10.74 13.1535H11.8733C12.58 13.1535 13.16 12.5735 13.16 11.8668V10.7335C13.16 10.4735 13.3 10.0935 13.4733 9.89345L14.38 8.84012C14.7667 8.38012 14.7667 7.62012 14.3733 7.16012ZM10.7733 6.74012L7.55333 9.96012C7.46 10.0535 7.33333 10.1068 7.2 10.1068C7.06667 10.1068 6.94 10.0535 6.84667 9.96012L5.23333 8.34679C5.04 8.15345 5.04 7.83345 5.23333 7.64012C5.42667 7.44679 5.74667 7.44679 5.94 7.64012L7.2 8.90012L10.0667 6.03345C10.26 5.84012 10.58 5.84012 10.7733 6.03345C10.9667 6.22679 10.9667 6.54679 10.7733 6.74012Z" fill="black" fill-opacity="0.6"/>
            </svg>

            <p style={{
              fontSize : 12,
              color : 'rgba(0,0,0,0.6)'
            }}>The rider will come and pick up your cylinder between 2-3pm</p>

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
        paddingTop : 24
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
          }}>n/a</p>
        </div>
          <PrimaryButtom title='Continue'/>
      </div>


      </div>

    </div>
  );
}

export default ConfirmLocation;
