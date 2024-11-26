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
      className={`bg-[#FAFAFA] border text-black py-2 px-3 rounded-3xl hover:bg-black/80 transition  ${width}`}
      onClick={onClick}  // Attach the onClick handler
      disabled={disabled}
    >
      {title}
   
    </button>
  );
};

export default CustomButton;
