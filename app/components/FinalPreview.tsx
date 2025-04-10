import React from "react";
import { FaPlus } from "react-icons/fa";
import ContainerBox from "./ContainerBox";

interface FinalPreviewProps {
  croppedImage?: string;
  skinTone: string;
  setStep: (step: number) => void;
  step: number;
}

const FinalPreview: React.FC<FinalPreviewProps> = ({
  croppedImage,
  skinTone,
  setStep,
  step,
}) => {
  const handleAddNewFace = () => {
    setStep(0);

  };
  const handleEdit = () => {
    setStep(4);

  };
  return (
    <div
      className={`w-[50%]  max-sm:w-full flex justify-between   flex-col  min-h-[90vh]   px-2  `}
    >
     <ContainerBox>
      <div className="grid grid-cols-3 gap-3 justify-center items-center max-w-lg max-sm:w-full">

      
     {croppedImage && (
        <div className="flex justify-start max-sm:justify-center items-center gap-3 max-sm:flex-col max-sm:gap-1">
          <p className="text-blue-500 text-lg max-sm:text-sm text-start max-sm:mt-3">Face</p>
          <button className="cursor-pointer hover:outline-1" onClick={handleEdit}><img className="w-20 h-auto max-sm:w-10 " src={croppedImage} alt="Cropped face" /></button>
        </div>
      )}
      <div className="flex justify-start max-sm:justify-center items-center gap-3 max-sm:flex-col max-sm:gap-1">
        <p className="text-blue-500 text-lg max-sm:text-sm text-start">
          Skin Tone
        </p>
        <div
          className="w-10 h-10 bg-black rounded-full"
          style={{ filter: skinTone }}
        ></div>
      </div>
      <button
        onClick={handleAddNewFace}
        className="inline-flex border  border-blue-500 bg-blue-200 bg-opacity-50 text-sm px-4 py-1 text-blue-500 hover:text-white max-sm:text-sm hover:bg-blue-500 transition-all duration-200 rounded-md justify-center items-center gap-2"
      >
        <FaPlus /> Add face
      </button>
      </div>
     </ContainerBox>
    
    </div>
  );
};

export default FinalPreview;
