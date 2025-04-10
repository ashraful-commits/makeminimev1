import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import ButtonBox from "./buttonBox";
import ContainerBox from "./ContainerBox";

interface skinToneType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  skinTone: string;
  setSkinTone: React.Dispatch<React.SetStateAction<string>>;
}
const SkinTone = ({ step, setStep, skinTone, setSkinTone }: skinToneType) => {
  const skinTones = [
    {
      id: 1,
      filter:
        "invert(91%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 2,
      filter:
        "invert(95%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 3,
      filter:
        "invert(81%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 4,
      filter:
        "invert(85%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 5,
      filter:
        "invert(71%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 6,
      filter:
        "invert(75%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 7,
      filter:
        "invert(61%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 8,
      filter:
        "invert(65%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 9,
      filter:
        "invert(51%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 10,
      filter:
        "invert(55%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 11,
      filter:
        "invert(41%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },
    {
      id: 12,
      filter:
        "invert(45%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)", // Light Yellow
    },

    {
      id: 13,
      filter:
        "invert(78%) sepia(40%) saturate(369%) hue-rotate(347deg) brightness(94%) contrast(101%)", // Light Yellow
    },
    {
      id: 14,
      filter:
        "invert(89%) sepia(5%) saturate(3685%) hue-rotate(327deg) brightness(95%) contrast(90%)", // Light Yellow
    },
    {
      id: 15,
      filter:
        "invert(86%) sepia(44%) saturate(542%) hue-rotate(322deg) brightness(95%) contrast(95%)", // Light Yellow
    },
    {
      id: 16,
      filter:
        "invert(72%) sepia(7%) saturate(1885%) hue-rotate(341deg) brightness(92%) contrast(88%)", // Light Yellow
    },
    {
      id: 17,
      filter:
        "invert(65%) sepia(13%) saturate(1455%) hue-rotate(349deg) brightness(98%) contrast(80%)", // Light Yellow
    },
    {
      id: 18,
      filter:
        "invert(52%) sepia(46%) saturate(312%) hue-rotate(354deg) brightness(100%) contrast(87%)", // Light Yellow
    },
    {
      id: 19,
      filter:
        "invert(41%) sepia(14%) saturate(1618%) hue-rotate(343deg) brightness(97%) contrast(90%)", // Light Yellow
    },
    {
      id: 20,
      filter:
        "invert(35%) sepia(8%) saturate(2950%) hue-rotate(341deg) brightness(98%) contrast(88%)", // Light Yellow
    },
    {
      id: 21,
      filter:
        "invert(25%) sepia(81%) saturate(425%) hue-rotate(343deg) brightness(96%) contrast(93%)", // Light Yellow
    },
    {
      id: 22,
      filter:
        "invert(41%) sepia(65%) saturate(397%) hue-rotate(333deg) brightness(98%) contrast(88%)", // Light Yellow
    },
    {
      id: 23,
      filter:
        "invert(26%) sepia(82%) saturate(371%) hue-rotate(339deg) brightness(101%) contrast(94%)", // Light Yellow
    },
    {
      id: 24,
      filter:
        "invert(22%) sepia(25%) saturate(1379%) hue-rotate(346deg) brightness(96%) contrast(91%)", // Light Yellow
    },
    {
      id: 25,
      filter:
        "invert(8%) sepia(12%) saturate(3712%) hue-rotate(349deg) brightness(98%) contrast(89%)", // Light Yellow
    },
  ];
  const handleConfirm = () => {
    setStep(7);
  };
  return (
    <div className="max-sm:w-full  w-[50%]  mx-auto flex flex-col items-center justify-between  px-2 max-sm:px-2 min-h-[90vh] - ">
      {/* Section Title and Navigation Buttons */}
      <h1 className="text-blue-500 text-xl text-center font-bold">
        Choose colour
      </h1>
      <ContainerBox>
      <div className="w-full  p-4 max-sm:px-0 max-sm:hidden">
      <div className="flex gap-10 mb-5 max-sm:mb-0 justify-center items-center w-full max-sm:hidden">
        <button
          className="px-3 py-1 text-sm font-light   text-gray-50 bg-gray-500 rounded-md hover:bg-gray-600 "
          onClick={() => setStep(3)}
        >
          Adjust color
        </button>
        <button
          className="px-2 py-1 text-sm font-light text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => setStep(0)}
        >
          Change Face
        </button>
      </div>
        <div className="text-center text-sm font-medium mb-2 sm:hidden max-sm:mb-10 ">
          Select Skin Tone
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto justify-center items-center sm:grid  max-sm:overflow-x-auto max-sm:gap-3 max-sm:mx-3 ">
          {skinTones.map((tone) => (
            <button
              key={tone.id}
              className="w-10 h-10 rounded-full shrink-0 mx-auto"
              style={{
                backgroundColor: "black",
                filter: tone.filter,
              }}
              onClick={() => {
                setSkinTone(tone.filter);
                localStorage.setItem("skinTone", tone.filter);
              }}
              aria-label={`Select skin tone ${tone.id}`}
            />
          ))}
        </div>
      </div>
      </ContainerBox>
      
      {/* Skin Tone Selection Grid */}
      
      <div className="flex flex-col  justify-center items-center w-full ">
        <div className="max-sm:flex justify-center items-center my-2 overflow-x-auto max-w-[320px] p-2 gap-2 hidden ">
          {skinTones.map((tone) => (
            <button
              key={tone.id}
              className="w-6 h-6 min-h-6 min-w-6 rounded-full" // Adjusting size for better visibility and touchscreen interaction
              style={{
                backgroundColor: "black", // Use an appropriate color for your design
                filter: tone.filter, // Presuming 'tone.filter' gives a suitable CSS filter
              }}
              onClick={() => {
                setSkinTone(tone.filter);
                localStorage.setItem("skinTone", tone.filter);
              }}
              aria-label={`Select skin tone ${tone.id}`}
            />
          ))}
        </div>
        {/* Action Buttons */}
        <ButtonBox >
          <button
            onClick={() => setStep(3)}
            className="bg-blue-100 bg-opacity-50 border border-blue-500 text-blue-500 hover:text-white text-sm font-light  px-10 py-3 rounded-md  hover:bg-blue-500 focus:outline-none focus:ring-2 "
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-20 max-sm:px-8 w-full py-3 bg-blue-500   text-white text-sm rounded hover:bg-blue-800 border flex justify-center items-center gap-2 max-sm:gap-1"
          >
            <FaCheck className="inline-block mr-2" />
            Confirm
          </button>
        </ButtonBox>
      </div>
    </div>
  );
};

export default SkinTone;
