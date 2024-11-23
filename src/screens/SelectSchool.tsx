import React, { useState, useContext } from 'react';
import { HostelContext } from './HostelContext';
import { useHistory } from 'react-router-dom'; // For navigation in web
import './styles.css'; // Assuming you have a separate stylesheet for styling

const schools = [
  { id: '1', name: 'Pentecost University College (PUC)', location: 'Sowutuom, Greater Accra Region', img: '/assets/PUC.jpg' },
  { id: '2', name: 'The University of Professional Studies (UPSA)', location: 'Madina, Greater Accra Region', img: '/assets/UPSA.jpg' },
];

export default function SelectSchool() {
  const history = useHistory(); // Use history for navigation on web
  const { setSelectedHostel } = useContext(HostelContext);
  const [selectedHostelId, setSelectedHostelId] = useState('');
  const [selectedSchoolName, setSelectedSchoolName] = useState('');

  // Handle the selection of a school
  const handleSelectHostel = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      setSelectedHostel(school);
      setSelectedHostelId(schoolId);
      setSelectedSchoolName(school.name);
    }
  };

  // Handle the continue action
  const handleContinue = () => {
    if (selectedHostelId) {
      history.push('/select-hostel', { schoolId: selectedHostelId, selectedSchoolName });
    } else {
      alert('Please select a school first!');
    }
  };

  const isButtonDisabled = !selectedHostelId;

  return (
    <div className="main">
      <div className="header">
        <button className="back-button" onClick={() => history.goBack()}>Back</button>
        <h2 className="header-title">Select School</h2>
      </div>

      <div className="school-list">
        {schools.map(school => (
          <div
            key={school.id}
            className={`school-item ${selectedHostelId === school.id ? 'selected' : ''}`}
            onClick={() => handleSelectHostel(school.id)}
          >
            <img src={school.img} alt={school.name} className="school-image" />
            <div>
              <h3 className={`school-name ${selectedHostelId === school.id ? 'selected-name' : ''}`}>{school.name}</h3>
              <p className={`school-location ${selectedHostelId === school.id ? 'selected-location' : ''}`}>{school.location}</p>
            </div>
            {selectedHostelId === school.id && <span className="checkmark">✔</span>}
          </div>
        ))}
      </div>

      <div className="footer">
        <button className="continue-button" onClick={handleContinue} disabled={isButtonDisabled}>Continue</button>
      </div>
    </div>
  );
}
