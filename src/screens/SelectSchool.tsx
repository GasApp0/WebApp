import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


interface SchoolOptionProps {
  name: string;
  location: string;
  imageSrc: string;
  isSelected: boolean; 
  onClick: () => void;
}

interface LocationState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber : string;
}


const SchoolOption: React.FC<SchoolOptionProps> = ({ name, location, imageSrc, isSelected, onClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: 12,
        borderRadius: 16,
        border: isSelected ? '2px solid black' : '1px solid rgba(0,0,0,0.1)', // Black border when selected
        backgroundColor: isSelected ? 'black' : 'white', // Black background when selected
        width: '100%',
        cursor: 'pointer',
        transition: 'background-color 0.3s, border 0.3s',
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSelected ? 'black' : 'white')}
    >
      <img src={imageSrc} alt={name} style={{ width: 24, height: 24 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: isSelected ? 'white' : 'black' }}>{name}</p> {/* Change text color when selected */}
        <p style={{ color: isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: 14 }}>
          {location}
        </p>
      </div>
    </div>
  );
};

const SelectSchool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email, phoneNumber } = location.state as LocationState;
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const schools = [
    {
      name: 'Pentecost University',
      location: 'Sowutuom, Greater Accra Region',
      imageSrc: '/UPSA.png',
    },
    {
      name: 'The University of Professional Studies (UPSA)',
      location: 'Sowutuom, Greater Accra Region',
      imageSrc: '/Pentecost-University-College 1.png',
    },
    {
      name: 'Kwame Nkrumah University Of Science And Technology',
      location: 'Kumasi',
      imageSrc: '/Pentecost-University-College 1.png',
    },
  ];


  const handleSchoolSelect = (schoolName: string) => {
    setSelectedSchool(schoolName); 
  };


  const handleContinue = () => {
    if (selectedSchool) {
      navigate('/SelectHostel', { state: { 
        schoolName: selectedSchool,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber : phoneNumber,
      } });
     
      // console.log(phoneNumber)
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listener for screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        overflowY: 'auto', // Allow scrolling on small screens
        
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          width : isMobile ?  380 : 323,
          marginTop : isMobile ? '20%' : '20vh',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{ fontSize: 28, fontWeight: '700' }}>Select School</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: 12 }}>
          {schools.map((school, index) => (
            <SchoolOption
              key={index}
              name={school.name}
              location={school.location}
              imageSrc={school.imageSrc}
              isSelected={selectedSchool === school.name} // Pass isSelected prop
              onClick={() => handleSchoolSelect(school.name)} // Update the selected school on click
            />
          ))}
        </div>

        {/* Continue Button */}
        <PrimaryButton
          title="Continue"
          onClick={handleContinue}
          disabled={!selectedSchool} // Disable if no school is selected
        />
      </div>
    </div>
  );
};

export default SelectSchool;