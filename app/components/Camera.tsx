import { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { FaArrowLeft } from "react-icons/fa";
import ContainerBox from "./ContainerBox";
import ButtonBox from "./ButtonBox";

interface CameraComponentProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUploadedPhoto: React.Dispatch<React.SetStateAction<string | null>>;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  setStep,
  setUploadedPhoto,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTakePhoto = async (dataUri: string) => {
    setIsLoading(true);
    setUploadedPhoto(dataUri);

    try {
      const uploadImage = async (imageData: string, imageType: string) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData,uuid:"main images" }),
        });

        if (!response.ok) {
          throw new Error(
            `${imageType} image upload failed (${response.status})`
          );
        }

        const { result }: { result: string } = await response.json();
        return encodeURIComponent(result);
      };

      const encodedResult = await uploadImage(dataUri, "capturedImage");
      localStorage.setItem("uploadImage", encodedResult);

      setStep(1);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <div className="w-[50%] max-sm:w-full flex flex-col items-center justify-between border-gray-300 lg:border-r md:border-r max-sm:border-b min-h-[85vh] max-h-[85vh] p-4 bg-white rounded-lg relative">
      <h2 className="text-lg font-bold text-blue-500 mb-4">
        Capture Your Photo
      </h2>
      <ContainerBox>
        <Camera
          onTakePhoto={handleTakePhoto}
          isImageMirror={false}
          imageType="jpg"
          imageCompression={0.9}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 text-white font-semibold">
            Processing...
          </div>
        )}
      </ContainerBox>
      <ButtonBox>
        <button
          onClick={handleBack}
          className="mt-4 px-10 py-3 flex items-center gap-2 bg-blue-500 border  text-white rounded-lg hover:bg-blue-600 transition duration-300 text-md font-bold"
        >
          Back to upload
        </button>
      </ButtonBox>
    </div>
  );
};

export default CameraComponent;
