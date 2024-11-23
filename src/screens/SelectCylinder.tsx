import React from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import UPSA from './../../public/UPSA.png'
import PUC from './../../public/Pentecost-University-College 1.png'
import SecondaryButton from './../components/SecondaryButton'
import Header from './../components/HeaderProps'

function SelectCylinder() {
  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection : 'column',
        gap: "10%",
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

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start',
          width : '100%',
          gap : 12,
        
      }}>

        <p style={{
          fontWeight : '700'
        }}>
        Select LPG Cylinder Size
        </p>

        <div style={{
          overflow : 'hidden',
          display : 'flex',
          gap : 24,
        }}>
          <div style={{
            display : 'flex',
            gap : 12,
            flexDirection : 'column',
            padding : 8,
            border : '1px solid rgba(0,0,0,0.1)',
            borderRadius : 24
          }}>
              <div style={{
                display : 'flex',
                height : 188,
                width : 310,
                backgroundColor : '#FAFAFA',
                borderRadius : 18,
                alignItems : 'center',
                justifyContent : 'center'
              }}>
                <img src="/small.png" alt="" />
              </div>
              <div style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-between'
              }}>
                <p>Small Size</p>
                <p style={{
                  color : 'rgba(0,0,0,0.5)'
                }}>GH 3.00</p>
              </div>
                <SecondaryButton title='Select' />
          </div>
          <div style={{
            display : 'flex',
            gap : 12,
            flexDirection : 'column',
            padding : 8,
            border : '1px solid rgba(0,0,0,0.1)',
            borderRadius : 24
          }}>
              <div style={{
                display : 'flex',
                height : 188,
                width : 310,
                backgroundColor : '#FAFAFA',
                borderRadius : 18,
                alignItems : 'center',
                justifyContent : 'center'
              }}>
                <img src="/medium.png" alt="" />
              </div>
              <div style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-between'
              }}>
                <p>Medium Size</p>
                <p style={{
                  color : 'rgba(0,0,0,0.5)'
                }}>GH 6.00</p>
              </div>
                <SecondaryButton title='Select' />
          </div>

        </div>

      </div>
  

      </div>

    </div>
  );
}

export default SelectCylinder;
