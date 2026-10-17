import React, { useEffect, useState } from 'react';
import PrimaryButtom from '../components/PrimaryButton';
import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Amount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { size, price = 50, hostel } = location.state || {};

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [amount, setAmount] = useState(50); // Default amount in GHC
  const [sliderValue, setSliderValue] = useState(0.5); // Default slider value (0 to 1)
  const [total, setTotal] = useState(amount + 10 + parseFloat(price) );

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleContinue = () => {
    navigate('/MobileMoney', { state: { size: size, price: price , amount : amount, total : total, hostel } });
  };

  const handleSliderChange = (value: any) => {
    const newAmount = Math.round(value * 100); // Scale to 100 as max GHC value
    setAmount(newAmount);
    setSliderValue(value);
    setTotal(newAmount + parseFloat(price) + 10); // Update total with defaulted price
  };
  
  const handleInputChange = (event: any) => {
    const input = event.target.value.replace(/[^\d]/g, ''); // Strip non-numeric characters
    const numericValue = parseInt(input, 10) || 0; // Ensure it's a number
    setAmount(numericValue);
    setSliderValue(numericValue / 100); // Scale to match slider range (0 to 1)
    setTotal(numericValue + parseFloat(price) + 10); // Update total with defaulted price
  };
  
  const isButtonDisabled = !amount
  

  // useEffect(() => {
  //   console.log('Price:', price, total);
  //   console.log (10 + parseFloat(price))
  // }, [price]);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '16px 0',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: isMobile ? 16 : '5%',
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} weight="bold" color="black" />
        </div>
        <p style={{ fontSize: 16, fontWeight: 700 }}>Amount</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flex: 1,
          width: isMobile ? 380 : 313,
          overflowY: 'auto',
          paddingTop: isMobile ? '6%' : '4%',
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              gap: 12,
            }}
          >
            <div
              style={{
                gap: 12,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <p>Enter Amount You Want To Buy</p>
              <input
                value={`GHC ${amount}`}
                onChange={handleInputChange}
                style={{
                  backgroundColor: '#FAFAFA',
                  alignSelf: 'stretch',
                  padding: 8,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.1)",
                  width: '100%',
                }}
              />
            </div>
            
            <div style={{
              display : 'flex',
              gap : 12,
              width : '100%',
              alignItems : 'center'
            }}>
              <div style={{
                height : 1,
                width : '44%',
                backgroundColor : '#00000010'
              }}></div>
              <p style={{
              }}>OR</p>
            <div style={{
                height : 1,
                width : '44%',
                backgroundColor : '#00000010'
              }}></div>
            </div>

            <div
            style={{
              padding: '12px',
              borderWidth: '1px',
              borderRadius: '12px',
              borderColor: 'rgba(0,0,0,0.1)',
              backgroundColor: '#fafafa',
              gap: 12,
              position: 'relative',
              width: "100%",
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
                    fontSize: 12,
                  }}
                >
                  10 Kg
                </span>

                <span style={{ fontSize: '16px', fontWeight: '700' }}>
                  GHC {amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={sliderValue}
              onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
              style={{ width: '100%', height: '40px' }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: 12 }}>Min (2Kg)</p>

              <p style={{ fontSize: 12 }}>Max (24Kg)</p>
            </div>

            <p
              style={{
                paddingTop: 8,
                fontSize: 14,
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              Use the slider below to select the amount you'd like to fill your gas cylinder
            </p>
          </div>

          </div>

         
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            backgroundColor: '#FAFAFA',
            padding: 12,
            borderRadius: 24,
            border: '1px solid rgba(0,0,0,0.2)',
            paddingTop: 16,
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            Cost Summary
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.50)',
              }}
            >
              Regular
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC 10.00
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.50)',
              }}
            >
              Cylinder Size
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC {price}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.50)',
              }}
            >
              Amount You Want To Buy
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC {amount.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          ></div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              Total
            </p>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                GHC {total.toFixed(2)}
              </p>
            </div>
          </div>
          <PrimaryButtom title="Make Payment" onClick={handleContinue} disabled={isButtonDisabled} />
        </div>

        
      </div>
    </div>
  );
}

export default Amount;
