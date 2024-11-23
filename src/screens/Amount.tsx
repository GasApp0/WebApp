import React from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import UPSA from './../../public/UPSA.png'
import PUC from './../../public/Pentecost-University-College 1.png'
import Header from './../components/HeaderProps'

function Amount() {
  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection : 'column',
        gap: "10%"
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
           width : 313,
           
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
          <PrimaryButtom title='Continue'/>
      </div>

      </div>

    </div>
  );
}

export default Amount;
