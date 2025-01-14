import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "./../components/SecondaryButton";
import Header from "./../components/HeaderProps";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SelectCylinder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedCylinder, setSelectedCylinder] = useState({
    size: "",
    price: "",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCylinderSelect = (cylinder: any) => {
    setSelectedCylinder(cylinder);
    navigate("/ConfirmLocation", {
      state: { size: cylinder.name, price: cylinder.price },
    });
    console.log(
      `Selected Cylinder Size: ${cylinder.name}, Price: ${cylinder.price}`
    );
  };

  return (
    <div
      style={{
        flex: 1,
        alignItems: "center",
        display: "flex",
        height: isMobile ? "120vh" : "100vh",
        flexDirection: "column",
        gap: isMobile ? "5%" : "10%",
        overflowY: isMobile ? "auto" : "hidden",
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
          gap: 16,
          marginTop: isMobile ? "30%" : "10%",
          overflowY: isMobile ? "auto" : "hidden",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: "700" }}>Regular Offer</h1>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 24,
            width: "100%",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {[
            {
              size: "Small Size",
              name: "small",
              price: 3.0,
              imgSrc: "/small.png",
            },
            {
              size: "Medium Size",
              name: "medium",
              price: 6.0,
              imgSrc: "/medium.png",
            },
          ].map((cylinder, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 12,
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 24,
                alignItems: "flex-start",
                width: isMobile ? 360 : 330,
                gap: 8,
              }}
            >
              <div
                style={{
                  height: 188,
                  width: "100%",
                  backgroundColor: "#FAFAFA",
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={cylinder.imgSrc} alt={`${cylinder.size} image`} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p>{cylinder.size}</p>
                <p style={{ color: "rgba(0,0,0,0.5)" }}>GHC {cylinder.price}</p>
              </div>
              <SecondaryButton
                title="Select"
                onClick={() => handleCylinderSelect(cylinder)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectCylinder;
