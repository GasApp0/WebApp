import React, { useEffect, useState } from "react";
import PrimaryButtom from "../components/PrimaryButton";
import Header from "./../components/HeaderProps";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MobileMoney() {
  const location = useLocation();
  const { size, price = 50, amount, total } = location.state || {};

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [userData, setUserData] = useState<{
    name: string;
    hostel: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState("");
  const [userName, setUserName] = useState("");
  const [school, setSchoolName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const BASE_CUSTOMER_URL = "https://backend-node-0kx8.onrender.com";


  useEffect(() => {
    const userData_ = JSON.parse(localStorage.getItem("userData") || "{}");
    const userData = userData_.data || null;
    if (
      userData &&
      userData.hostelName &&
      userData.firstName &&
      userData.lastName &&
      userData.schoolName &&
      userData.phoneNumber
    ) {
      setUserName(`${userData.firstName} ${userData.lastName}`);
      setHostel(`${userData.hostelName}`);
      setSchoolName(`${userData.schoolName}`);
      setPhoneNumber(`${userData.phoneNumber}`);
      // setSize(`${userData.size}`)

      // console.log(hostel)
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  // sending orders
  const handleContinue = async () => {
    if (selectedNetwork) {
      try {
        const payload = {
          customerName: userName,
          schoolName: school,
          orderAmount: amount,
          size: size,
          hostelName: hostel,
          phoneNumber: phoneNumber,
          riderCommision: 10,
          profit: 20,
          orderStatus: "pending"
        };
        console.log("Request Payload:", payload);

        const response = await fetch(`${BASE_CUSTOMER_URL}/api/orders/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);

        const userData = JSON.parse(localStorage.getItem("userData") || "{}")
        const currentOrders = userData?.orders || []

        const newOrder = {
          orderID : responseData.data._id,
          network : selectedNetwork,
          ...payload
        }

        const updatedUserData = {
          ...userData,
          orders : [...currentOrders,newOrder]
        }

        localStorage.setItem("userData", JSON.stringify(updatedUserData))

        // If successful, navigate to tracker
        navigate("/Tracker", {
          state: {
            selectedNetwork,
            orderId: responseData.data._id,
            ...responseData,
          },
        });
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  const handleNetworkSelect = (network: any) => {
    setSelectedNetwork(network);
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems: "center",
        display: "flex",
        height: isMobile ? "80vh" : "100vh",
        flexDirection: "column",
        gap: isMobile ? "4%" : "10%",
      }}
    >
      <Header
        logoText="APP"
        menuItems={["Home", "Orders", "Contact Us"]}
        userName="Christine Austin"
        userInitials="CA"
        onMenuClick={(item) => alert(`Clicked on ${item}`)}
        onNotificationClick={() => alert("Notifications clicked")}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          width: isMobile ? 380 : 313,
          justifyContent: "space-between",
          height: isMobile ? "100%" : 0,
          marginBottom: isMobile ? 30 : 0,
          marginTop: isMobile ? "30%" : "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            Mobile Money Number
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: 12,
            }}
          >
            <div
              style={{
                gap: 4,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <p>Select Mobile Money Network</p>

              <div
                style={{
                  flex: "flex",
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  justifyContent: "space-between",
                }}
              >
                {["MTN", "Vodafone", "Airtel / Tigo"].map((network) => (
                  <div
                    key={network}
                    onClick={() => handleNetworkSelect(network)}
                    style={{
                      paddingInline: 24,
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderRadius: 24,
                      backgroundColor:
                        selectedNetwork === network ? "#d1e7dd" : "#FAFAFA",
                      cursor: "pointer",
                      border:
                        selectedNetwork === network
                          ? "2px solid #0f5132"
                          : "1px solid rgba(0,0,0,0.2)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {network}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "#FAFAFA",
            padding: 12,
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.2)",
            paddingTop: 16,
            marginTop: 64,
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Cost Summary
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.50)",
              }}
            >
              Regular Offer
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC 10
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.50)",
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.50)",
              }}
            >
              Amount You Want To Buy
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC {amount}
            </p>
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.50)",
              }}
            >
              Total Cost
            </p>
            <p
              style={{
                fontSize: 14,
              }}
            >
              GHC {total}
            </p>
          </div>
          <PrimaryButtom
            title="Continue"
            onClick={handleContinue}
            disabled={!selectedNetwork} // Button is disabled if no network is selected
          />
        </div>
      </div>
    </div>
  );
}

export default MobileMoney;
