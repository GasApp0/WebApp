import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const BASE_CUSTOMER_URL = "https://backend-node-0kx8.onrender.com";
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { requestId, prefix, phoneNumber, userExists } = location.state || {};
  console.log(userExists);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isButtonDisabled = otp.length !== 4;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOtpChange = (value: string) => {
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_CUSTOMER_URL}/api/auth/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: otp,
          requestId: requestId,
          prefix: prefix,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful verification
        console.log("OTP verified successfully:", data);

        // redirect to dashboard or signup page based on userExists
        if (userExists) {
          const login = await fetch(`${BASE_CUSTOMER_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber,
            }),
          });

          const loginData = await login.json();
          if (login.ok) {
            console.log("Login successful:", loginData);
            navigate("/home");
          } else {
            setError(loginData.message || "Login failed.");
            return;
          }
        } else {
          navigate("/GeneralDetails", {
            state: {
              phoneNumber,
            },
          });
        }
      } else {
        setError(data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError((error as Error).message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflowY: "auto", // Allow scrolling on small screens
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 16,
          width: isMobile ? 380 : 323,
          marginTop: "20vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            Enter OTP
          </h1>
          <p
            style={{
              color: "rgba(0,0,0,0.6)",
            }}
          >
            An OTP code was sent to your number for verification
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            gap: 4,
          }}
        >
          <input
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            style={{
              backgroundColor: "#D9D9D9",
              alignSelf: "stretch",
              padding: 8,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.1)",
              width: "100%",
              textAlign: "center",
              fontSize: 24,
              letterSpacing: 8,
            }}
            maxLength={4}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <PrimaryButton
          title={loading ? "Verifying..." : "Continue"}
          onClick={handleContinue}
          disabled={isButtonDisabled || loading}
        />

        <p className="w-[313px] text-center text-black/60 text-sm">
          An OTP code will be sent to your number for verification
        </p>
      </div>
    </div>
  );
}

export default App;
