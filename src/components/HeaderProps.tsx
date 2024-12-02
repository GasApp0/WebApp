import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  logoText?: string;
  menuItems?: string[];
  userInitials?: string;
  userName?: string;
  onMenuClick?: (item: string) => void;
  onNotificationClick?: (item: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  logoText = "APP",
  menuItems = [],
  userName = "User Name",
  userInitials = "UN",
  onMenuClick = () => {},
  onNotificationClick = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (item: string) => {
    if (item === "Home") {
      navigate("/Home");
    } else {
      onMenuClick(item);
    }
  };

  const isLandingPage = location.pathname === "/"; // Check if the current route is the landing page

  // Filter out "Home" and "Orders" links on the landing page
  const filteredMenuItems = isLandingPage
    ? menuItems.filter((item) => item !== "Home" && item !== "Orders")
    : menuItems;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "black",
        paddingInline: "5%",
        paddingBlock: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position : 'fixed'
      }}
    >
      {/* Left Section: Logo and Navigation */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          flexDirection: isMobile ? "row-reverse" : "row",
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          GAS<span style={{ color: "#ffffff60" }}>{logoText}</span>
        </p>

        {isMobile && (
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ cursor: "pointer" }}
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {filteredMenuItems.map((item, index) => (
              <p
                key={index}
                style={{ color: "#ffffff70", cursor: "pointer" }}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        {isLandingPage ? (
          <button
            style={{
              padding: "10px 20px",
              borderRadius: 24,
              backgroundColor: "white",
              color: "black",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => navigate("/PhoneNumber")} // Navigate to the Sign Up page
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff60")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff")
            }
          >
            Sign Up
          </button>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ cursor: "pointer" }}
            >
              <path
                d="M12.02 2.90997C8.71003 2.90997 6.02003 5.59997 6.02003 8.90997V11.8C6.02003 12.41 5.76003 13.34 5.45003 13.86L4.30003 15.77C3.59003 16.95 4.08003 18.26 5.38003 18.7C9.69003 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.90997C18.02 5.60997 15.32 2.90997 12.02 2.90997Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.89999 21.18C9.35999 20.64 9.01999 19.88 9.01999 19.06"
                stroke="#ffffff"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </svg>

            {isMobile && (
              <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: 10,
                borderRadius: 12,
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: 12,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "white",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {userInitials}
              </p>
            </div>
            )}

            {!isMobile && (<div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: 10,
                borderRadius: 12,
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: 12,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "white",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {userInitials}
              </p>
              <p style={{ color: "black", fontWeight: "500" }}>{userName}</p>
            </div>)}

            
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
