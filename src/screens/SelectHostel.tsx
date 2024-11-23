import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HostelContext } from './HostelContext';
import PrimaryButton from './../components/PrimaryButton';


const hostels = [
  { id: '10', schoolId: '2', name: 'Anodams Hostel', schoolName: 'UPSA' },
  // Add all other hostels here...
];

export default function SelectHostel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedHostel } = useContext(HostelContext);
  const [selectedHostelId, setSelectedHostelId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHostelName, setSelectedHostelName] = useState('');
  const BASE_CUSTOMER_URL = 'http://34.222.42.84/v1/customers';
  const { schoolId, firstName, lastName, email, selectedSchoolName, user, user_id } = location.state;

  const filteredHostels = hostels.filter(
    (hostel) =>
      hostel.schoolId === schoolId && hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectHostel = (hostelId) => {
    const hostel = hostels.find((h) => h.id === hostelId);
    setSelectedHostel(hostel);
    setSelectedHostelId(hostelId);
    setSelectedHostelName(hostel.name);
  };

  const handleContinue = async () => {
    const customerData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      school: selectedSchoolName,
      hostel: selectedHostelName,
      user: user_id,
    };

    try {
      const response = await fetch(`${BASE_CUSTOMER_URL}/customerprofile/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        // Handle success
        navigate('/confirmation');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div className="main">
      <div className="header">
      
        <h2>Select Hostel</h2>
      </div>
      <input
        type="text"
        placeholder="Search hostels"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="hostelWrapper">
        {filteredHostels.map((hostel) => (
          <div
            key={hostel.id}
            className={`hostelContainer ${selectedHostelId === hostel.id ? 'selected' : ''}`}
            onClick={() => handleSelectHostel(hostel.id)}
          >
            <div className="hostelName">{hostel.name}</div>
            {selectedHostelId === hostel.id && <span className="selectedIcon">&#10003;</span>}
          </div>
        ))}
      </div>
      <div className="footer">
        <PrimaryButton title="Continue" onClick={handleContinue} disabled={!selectedHostelId} />
      </div>
    </div>
  );
}
