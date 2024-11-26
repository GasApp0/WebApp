import React, { createContext, useContext, useState } from 'react';

// Define the context types
interface HostelContextProps {
  selectedSchool: string | null;
  setSelectedSchool: (school: string | null) => void;
  hostels: { name: string; school: string; location: string }[];
}

// Define default hostels
const defaultHostels = [
  { name: 'Hostel A', school: 'Pentecost University', location: 'Sowutuom' },
  { name: 'Hostel B', school: 'Pentecost University', location: 'Sowutuom' },
  { name: 'Hostel C', school: 'The University of Professional Studies (UPSA)', location: 'Madina' },
  { name: 'Hostel D', school: 'The University of Professional Studies (UPSA)', location: 'Madina' },
];

// Create the context
const HostelContext = createContext<HostelContextProps>({
  selectedSchool: null,
  setSelectedSchool: () => {},
  hostels: defaultHostels,
});

// Create the context provider
export const HostelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  return (
    <HostelContext.Provider value={{ selectedSchool, setSelectedSchool, hostels: defaultHostels }}>
      {children}
    </HostelContext.Provider>
  );
};

// Custom hook to use the context
export const useHostelContext = () => useContext(HostelContext);
