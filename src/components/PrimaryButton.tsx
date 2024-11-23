import React from 'react';

interface CustomButtonProps {
  title: string;
  width?: string; // Optional prop for custom width
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Optional onClick handler
  disabled?: boolean; // New prop to conditionally disable the button
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, width = "w-full", onClick, disabled = false }) => {
  return (
    <button
      className={`bg-black text-white py-3 px-3 rounded-3xl hover:bg-black/80 transition ${width} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}  // Attach the onClick handler
      disabled={disabled} // Set the disabled attribute based on the prop
    >
      {title}
    </button>
  );
};

export default CustomButton;
