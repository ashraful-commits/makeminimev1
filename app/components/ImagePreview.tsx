import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai"; // Icon for the Confirm button
import ContainerBox from "./ContainerBox";
import ButtonBox from "./buttonBox";
interface imgePreviewType {
  croppedImage: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setCropedImage: React.Dispatch<React.SetStateAction<string | null>>;
  step: number;
  setFaceImage: React.Dispatch<React.SetStateAction<string | null>>;
}

function ImagePreview({
  croppedImage,
  setStep,
  setCropedImage,
  step,
  setFaceImage,
}: imgePreviewType) {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.src = croppedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Set up the filter string
      const filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Apply the filter and transformation
      context.filter = filter;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.translate(-canvas.width / 2, -canvas.height / 2);

      // Draw the image on the canvas with zoom and transformations applied
      context.drawImage(img, 0, 0, img.width, img.height);

      const dataUrl = canvas.toDataURL();
      setFaceImage(dataUrl);
      setCropedImage(dataUrl);
      setStep(4);
      const finalImages = localStorage.getItem("finalImage");
      finalImages
        ? localStorage.setItem(
            "finalImage",
            JSON.stringify([...JSON.parse(finalImages), dataUrl])
          )
        : localStorage.setItem("finalImage", JSON.stringify([dataUrl]));
    };

    img.onerror = () => {
      console.error("Error loading the image.");
    };
  };

  const handleBack = () => {
    setStep(5);
    setCropedImage(JSON.parse(localStorage.getItem("cropedImage") ?? '""'));
  };

  return (
    <div
      className={`flex w-[50%] max-sm:w-full flex-col items-center justify-between px-2 min-h-[90vh]`}
    >
      <h1 className="text-blue-500 text-xl font-bold">Edit Brightness</h1>
      <ContainerBox>
        {croppedImage && (
          <>
            <div
              className="relative max-w-xs max-h-xs flex justify-center items-center overflow-hidden max-sm:min-h-[200px]"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transition: "transform 0.2s, filter 0.2s",
              }}
            >
              <img
                className="object-contain w-[100%] h-full max-h-40 min-h-40  max-sm:w-full max-sm:h-full"
                src={croppedImage}
                alt="Cropped"
              />
            </div>
            <div className="w-full   max-w-md space-y-4  mb-10 ">
              <div>
                <label
                  htmlFor="brightness"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brightness
                </label>
                <input
                  id="brightness"
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value)}
                  className="w-full mt-2 h-1 border-none outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="contrast"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contrast
                </label>
                <input
                  id="contrast"
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-full mt-2 h-1 border-none outline-none"
                />
              </div>
            </div>
          </>
        )}
      </ContainerBox>
      <ButtonBox>
        <button
          onClick={handleBack}
          className="px-10 text-sm py-3 bg-blue-200 bg-opacity-50 text-blue-700 rounded-lg border border-blue-800 focus:outline-none focus:ring-2 hover:bg-blue-700 focus:ring-blue-500 hover:text-white"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="px-20 max-sm:px-8 w-full  py-3 bg-blue-500   text-white text-sm rounded hover:bg-blue-800 border flex justify-center items-center gap-2 max-sm:gap-1 "
        >
          <AiOutlineCheck className="inline-block mr-2" />
          Confirm
        </button>
      </ButtonBox>
    </div>
  );
}

export default ImagePreview;
