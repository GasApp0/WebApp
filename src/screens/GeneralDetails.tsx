import React from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import { useNavigate } from 'react-router-dom';

function GeneralDetails() {

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/SelectSchool'); 
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection : 'column',
      }}
    >
      <div style={{
           display: 'flex',
           flexDirection: 'column',
           alignItems : 'flex-start',
           gap : 16,
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
                fontSize : 28,
                fontWeight : '700'
          }}
        >
          General Details
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
          width : '100%'
         }}>
         <p>First name</p>
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
          width : '100%'
         }}>
         <p>Last  name</p>
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
          width : '100%'
         }}>
         <p>Email</p>
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

      <PrimaryButtom title='Continue' onClick={handleContinue}/>

      </div>

    </div>
  );
}

export default GeneralDetails;
