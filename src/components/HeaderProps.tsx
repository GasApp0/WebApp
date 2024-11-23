import React from 'react';

interface HeaderProps {
  logoText?: string;
  menuItems?: string[];
  userName?: string;
  userInitials?: string;
  onMenuClick?: (item: string) => void;
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logoText = "APP",
  menuItems = [],
  userName = "User Name",
  userInitials = "UN",
  onMenuClick = () => {},
  onNotificationClick = () => {},
}) => {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      backgroundColor: 'black',
      paddingInline: 50,
      paddingBlock: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Left Section: Logo and Navigation */}
      <div style={{
        display: 'flex',
        gap: 54,
        alignItems: 'center',
      }}>
        {/* Logo */}
        <p style={{
          fontSize: 18,
          fontWeight: '700',
          color: 'white',
        }}>
          GAS<span style={{ color: '#ffffff60' }}>{logoText}</span>
        </p>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: 24,
        }}>
          {menuItems.map((item, index) => (
            <p
              key={index}
              style={{ color: '#ffffff70', cursor: 'pointer' }}
              onClick={() => onMenuClick(item)}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Right Section: Notifications and User Info */}
      <div style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}>
        {/* Notification Icon */}
        <svg
          onClick={onNotificationClick}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ cursor: 'pointer' }}
        >
          <path d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z" 
            stroke='#ffffff' strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
          <path d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z" 
            stroke='#ffffff' strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.36 20.64 9.02 19.88 9.02 19.06" 
            stroke='#ffffff' strokeWidth="2" strokeMiterlimit="10" />
        </svg>

        {/* User Info */}
        <div style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          padding: 10,
          borderRadius: 12,
          backgroundColor: 'white',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}>
          {/* User Initials */}
          <p style={{
            fontWeight: '700',
            fontSize: 12,
            borderRadius: '50%',
            backgroundColor: 'black',
            color: 'white',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {userInitials}
          </p>
          {/* User Name */}
          <p style={{ color: 'black', fontWeight: '500' }}>{userName}</p>

          {/* Dropdown Icon */}
          <div style={{ paddingLeft: 12 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" 
                stroke="black" strokeOpacity="0.6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.333 9.087V7.913C1.333 7.22 1.9 6.647 2.6 6.647C3.806 6.647 4.3 5.793 3.693 4.747C3.346 4.147 3.553 3.367 4.16 3.02L5.313 2.36C5.84 2.047 6.52 2.233 6.833 2.76L6.906 2.887C7.506 3.933 8.493 3.933 9.1 2.887L9.173 2.76C9.486 2.233 10.166 2.047 10.693 2.36L11.846 3.02C12.453 3.367 12.66 4.147 12.313 4.747C11.706 5.793 12.2 6.647 13.406 6.647C14.1 6.647 14.673 7.213 14.673 7.913V9.087C14.673 9.78 14.106 10.354 13.406 10.354C12.2 10.354 11.706 11.207 12.313 12.254C12.66 12.86 12.453 13.634 11.846 13.98L10.693 14.64C10.166 14.954 9.486 14.767 9.173 14.24L9.1 14.114C8.5 13.067 7.513 13.067 6.906 14.114L6.833 14.24C6.52 14.767 5.84 14.954 5.313 14.64L4.16 13.98C3.553 13.634 3.346 12.854 3.693 12.254C4.3 11.207 3.806 10.354 2.6 10.354C1.9 10.354 1.333 9.78 1.333 9.087Z" 
                stroke="black" strokeOpacity="0.6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
