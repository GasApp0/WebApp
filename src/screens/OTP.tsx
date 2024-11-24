import React from 'react';
import PrimaryButtom from '../components/PrimaryButton'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/GeneralDetails'); 
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
           gap : 24,
           
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
         OTP Verification
        </h1>
        <p  style={{
            color : 'rgba(0,0,0,0.6)',
            width : '313px'
        }}>
            Enter the verification code we just sent to your email address
        </p>
      </div>

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'flex-start',
          width : '100%',
          gap : 2
      }}>
          <div style={{
            gap : 4,
            display : 'flex'
          }}>
          <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
           <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
              <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
              <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
              <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
             <input style={{
            backgroundColor : '#D9D9D9',
            alignSelf : 'stretch',
            padding : 8,
            borderRadius : 12,
            border: "1px solid rgba(0,0,0,0.1)" ,
            width : 50
          }}/>
          </div>

      </div>

      <PrimaryButtom title='Continue' onClick={handleContinue}/>

      <p className='w-[313px] text-center text-black/60 text-smC'>An OTP code will be sent to your number for verification</p>
      </div>

    </div>
  );
}

export default App;
