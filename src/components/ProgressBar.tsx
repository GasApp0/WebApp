import React from 'react';

interface ProgressBarProps {
  progress: number; // Value between 0 and 100
  color?: string; // Default color for the progress bar
  style?: React.CSSProperties; // Additional styles for customization
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = '#52B922', style }) => {
  return (
    <div
      style={{
        width: 270,
        height: '10px',
        backgroundColor: '#e0e0df',
        borderRadius: '5px',
        overflow: 'hidden',
        ...style, 
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
