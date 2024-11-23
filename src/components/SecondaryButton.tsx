import React from 'react';

interface SecondaryButton {
  title: string;
  width?: string; 
}

const CustomButton: React.FC<SecondaryButton> = ({ title, width = "w-full" }) => {
  return (
    <button
      className={`bg-[#FAFAFA] border text-black py-2 px-3 rounded-3xl hover:bg-black/80 transition  ${width}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
