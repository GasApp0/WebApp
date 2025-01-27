import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Define types for the hostel object
interface Hostel {
  id: string;
  schoolId: string;
  name: string;
  schoolName: string;
}

interface LocationState {
  firstName: string;
  lastName: string;
  email: string;
  schoolName: string;
  phoneNumber : string;
}


interface HostelListProps {
  searchQuery: string;
  onSelectHostel: (hostel: Hostel) => void;
  selectedHostel: Hostel | null; 
}

const BASE_CUSTOMER_URL = "https://backend-node-0kx8.onrender.com";
const HostelList: React.FC<HostelListProps> = ({ searchQuery, onSelectHostel, selectedHostel }) => {
  const hostels = [
    { id: '10', schoolId: '2', name: 'Anodams Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '15', schoolId: '2', name: 'Bendavid Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '9', schoolId: '2', name: 'Campus Annex Student Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '20', schoolId: '2', name: 'Chief’s Palace Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '12', schoolId: '2', name: 'Chika Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '26', schoolId: '2', name: 'Goodwill hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '16', schoolId: '2', name: 'Green Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '8', schoolId: '2', name: 'Heavens Gate Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '22', schoolId: '2', name: 'Henrich Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '7', schoolId: '2', name: 'Joy Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '2', schoolId: '2', name: 'Kitatsu Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '19', schoolId: '2', name: 'Lillypot Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '5', schoolId: '2', name: 'MB3 Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '4', schoolId: '2', name: 'Makasella Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '6', schoolId: '2', name: 'Makasella Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '11', schoolId: '2', name: 'New Century Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '13', schoolId: '2', name: 'Oasis Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '18', schoolId: '2', name: 'Paulino Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '17', schoolId: '2', name: 'Precious Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '3', schoolId: '2', name: 'Prestige Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '14', schoolId: '2', name: 'Student Hostel', schoolName: 'The University of Professional Studies (UPSA)' },
    { id: '21', schoolId: '2', name: 'Joe Hostel', schoolName: 'The University of Professional Studies (UPSA)' },

    { id: '23', schoolId: '1', name: 'Safo Hal', schoolName: 'Pentecost University' },
    { id: '24', schoolId: '1', name: '⁠Yeboah Hall', schoolName: 'Pentecost University' },
    { id: '25', schoolId: '1', name: '⁠Arnan Hall', schoolName: 'Pentecost University' },
    { id: '26', schoolId: '1', name: '⁠Shockers Hostel', schoolName: 'Pentecost University' },
    { id: '27', schoolId: '1', name: '⁠Choice Hostel', schoolName: 'Pentecost University' },
    { id: '28', schoolId: '1', name: '⁠Villagio Hostel', schoolName: 'Pentecost University' },
    { id: '29', schoolId: '3', name: 'St. Thersa', schoolName: 'KNUST' },
  ];

  // const { state } = useLocation();
  // const schoolName = state?.schoolName || '';

  const location = useLocation();
  const { firstName, lastName, email, schoolName } = location.state as LocationState;

  const filteredHostels = hostels.filter(
    (hostel) =>
      hostel.schoolName === schoolName && hostel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxHeight: '50vh',
        overflowY: 'auto',
        width: '100%',
        height: '100vh',
      }}
    >
      {filteredHostels.length === 0 ? (
        <p>No hostels found</p>
      ) : (
        filteredHostels.map((hostel) => (
          <div
            key={hostel.id}
            style={{
              padding: '12px',
              border: `2px solid ${
                selectedHostel?.id === hostel.id ? 'black' : 'rgba(0,0,0,0.1)'
              }`,
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: selectedHostel?.id === hostel.id ? '#fafafa' : 'white',
            }}
            onClick={() => onSelectHostel(hostel)}
          >
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              {hostel.name}
            </p>
          </div>
        ))
      )}
    </div>
  );
};



const SelectHostel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email, phoneNumber, schoolName } = location.state || {};

  const handleContinue = () => {
    if (selectedHostel) {
      console.log("Selected Hostel:", selectedHostel);
      const signup = fetch(`${BASE_CUSTOMER_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          schoolName: schoolName,
          hostelName: selectedHostel.name,
        }),
      });

      // console.log(
      //   "body",
      //   JSON.stringify({
      //     firstName: firstName,
      //     lastName: lastName,
      //     phoneNumber: phoneNumber,
      //     email: email,
      //     schoolName: schoolName,
      //     hostelName: selectedHostel.name,
      //   })
      // );

      signup
        .then((response) => {
          if (response.ok) {
            // send a fetch request to the backend to login using the new phone number and store the userdetails in local storage
            const login = fetch(`${BASE_CUSTOMER_URL}/api/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phoneNumber,
              }),
            });

            login
              .then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    console.log("Login response:", data);
                    localStorage.setItem("userData", JSON.stringify(data));
                  });
                  navigate("/Home");
                } else {
                  alert("Could not sign up. Please try again.");
                }
              })
              .catch((error) => {
                console.error("Error signing up:", error);
                alert((error as Error).message || "Could not sign up.");
              });
          } else {
            alert("Could not sign up. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          alert((error as Error).message || "Could not sign up.");
        });
    } else {
      alert("Please select a hostel before continuing");
    }
  };


  const handleSelectHostel = (hostel: Hostel) => {
    setSelectedHostel(hostel);
  
  };

 
  return (
  <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        overflowY: 'auto', 
        marginBottom : 20
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          maxWidth: 400,
          marginTop :  '10%',
          width : '90%',
          paddingLeft : 12,
          paddingRight : 12,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Select Hostel
        </h1>

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
              gap: 4,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <p>Search Hostel</p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search..."
              style={{
                backgroundColor: '#FAFAFA',
                alignSelf: 'stretch',
                padding: 8,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.1)',
                width: '100%',
              }}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Available Hostels
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              In case your hostel is not included, select the closest hostel
            </p>
          </div>

          <HostelList
            searchQuery={searchQuery}
            onSelectHostel={handleSelectHostel}
            selectedHostel={selectedHostel}
            
          />
        </div>

        <PrimaryButton
          title="Continue"
          onClick={handleContinue}
          disabled={!selectedHostel} // Disable button if no hostel is selected
          
        />
      </div>
    </div>
  );
};


export default SelectHostel;
