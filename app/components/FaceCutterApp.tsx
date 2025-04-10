import  { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LiaCutSolid } from "react-icons/lia";
import { IoArrowBackOutline } from "react-icons/io5"
import ContainerBox from "./ContainerBox";
const FaceCutterApp = ({ faceImage, setStep, setCropedImage, step }) => {
  const [removeBG, setRemoveBG] = useState(null);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const imageRef = useRef(null);
  const [removeLoader, setRemoveLoader] = useState(false);

  // useEffect(() => {
  //   const loadImage = () => {
  //     if (removeBG instanceof Blob || removeBG instanceof File) {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         let imageElement = document.createElement("img");
  //         imageElement.src = reader.result;

  //         imageElement.onload = function () {
  //           let image = new fabric.Image(imageElement);
  //           image.scaleToWidth(canvasInstance.current.width);
  //           image.scaleToHeight(canvasInstance.current.height);
  //           imageRef.current = image;
  //           canvasInstance.current.add(image);
  //           canvasInstance.current.centerObject(image);
  //           canvasInstance.current.setActiveObject(image);
  //         };
  //       };

  //       reader.readAsDataURL(removeBG);
  //     } else if (typeof removeBG === "string") {
  //       let imageElement = document.createElement("img");
  //       imageElement.src = removeBG;

  //       imageElement.onload = function () {
  //         let image = new fabric.Image(imageElement);
  //         image.scaleToWidth(canvasInstance.current.width);
  //         image.scaleToHeight(canvasInstance.current.height);
  //         imageRef.current = image;
  //         canvasInstance.current.add(image);
  //         canvasInstance.current.centerObject(image);
  //         canvasInstance.current.setActiveObject(image);
  //       };
  //     }
  //   };

  //   loadImage();
  // }, [removeBG]);

  // face cut handler
  const handleFaceCut = async () => {
    try {
      setRemoveLoader(true);
      // Step 1: Upload the image (base64) to get a public URL
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: faceImage }),
      });

      if (!uploadResponse.ok) {
        setRemoveLoader(false);
        throw new Error("Image upload failed. Please provide a valid image.");
      }

      const { result: uploadedUrl }: { result: string } =
        await uploadResponse.json();

      if (!uploadedUrl) {
        setRemoveLoader(false);
        throw new Error("Upload did not return a valid URL.");
      }

      // Step 2: Send uploaded URL to FaceCut API for processing
      const facecutResponse = await fetch("/api/facecut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: uploadedUrl }),
      });

      if (!facecutResponse.ok) {
        const errorData = await facecutResponse.json();
        setRemoveLoader(false);
        throw new Error(errorData.error || "FaceCut processing failed.");
      }

      const data = await facecutResponse.json();

      if (data.error) {
        setRemoveLoader(false);
        throw new Error(data.error || "FaceCut processing failed.");
      }
      if (data.imageUrl) {
        const parts = uploadedUrl.split("/");
        const folder = parts[parts.length - 2];
        const filenameWithExt = parts[parts.length - 1];
        const filename = filenameWithExt.split(".")[0]; // remove extension
        const public_id = `${folder}/${filename}`;

        const result = await fetch("/api/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id }),
        });
        console.log(result);
      }
      setStep(3);
      setRemoveBG(data.imageUrl);
      setCropedImage(data.imageUrl);
      setRemoveLoader(false);
      // createCanvas();
    } catch (error: any) {
      console.error("FaceCut error:", error.message || error);
      setError(error.message || "An unexpected error occurred during FaceCut.");
    }
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  return (
    <div
      className={`w-[50%]   max-sm:w-full flex space-y-10  min-h-[90vh]  flex-col items-center justify-between border-gray-300 lg:border-r md:border-r max-sm:border-none px-2 bg-white max-sm:space-y-6   rounded-lg relative ${
        step !== 7 ? "" : ""
      }`}
    >
      <h2 className="text-xl font-semibold text-center text-blue-500 mb-6">
        Cutout
      </h2>
      <ContainerBox>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {removeLoader && <p className="text-blue-500 text-lg max-sm:text-sm">We're Cutting Out Your Face...
        </p>}
      {!removeBG && (
        <div className="relative  h-[35vh] max-sm:h-[300px] max-sm:min-w-[90%] flex justify-center items-center w-[50%]">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-[6px] border-l-[6px] border-blue-500"></div>

          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-10 h-10 border-t-[6px] border-r-[6px] border-blue-500"></div>

          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[6px] border-l-[6px] border-blue-500"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[6px] border-r-[6px] border-blue-500"></div>
          {removeLoader && (
            <div className="absolute bottom-0 left-0 w-full h-7 animate-slide bg-red-800"></div>
          )}
          <img
            src={faceImage}
            className="w-auto h-auto  max-h-[300px] p-3"
            alt="faceImage"
          />
        </div>
      )}
      </ContainerBox>

      <div className="flex justify-center  gap-4 mb-6 mt-20 max-sm:mt-0 max-sm:sticky bottom-0 left-0 w-full">
        <button
          onClick={handleBack}
          className="px-10 py-3 text-sm  rounded-md bg-blue-100  hover:bg-blue-700 text-blue-500 bg-opacity-50 border hover:text-white border-blue-500 font-medium flex items-center justify-center "
        >
           Back
        </button>

        {!removeBG && (
          <button
            // onClick={handleRemoveBg}
            onClick={handleFaceCut}
            className="px-20 max-sm:px-8  py-3 bg-blue-500   text-white text-sm rounded hover:bg-blue-800 border flex justify-center items-center gap-2 max-sm:gap-1 w-full"
          >
            {removeLoader ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ):<LiaCutSolid />}
            {removeLoader ? "Wait less than 1 min" : "Cutout face"}
          </button>
        )}
      </div>

      {/* <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-md" />
      </div> */}
    </div>
  );
};

export default FaceCutterApp;
