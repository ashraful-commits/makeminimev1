import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaArrowUp,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import ButtonBox from "./buttonBox";
import ContainerBox from "./ContainerBox";

const Position = ({ setStep, setTransform }) => {
  const rotateRight = () => {
    setTransform((prev) => ({
      ...prev,
      rotation: (prev.rotation + 2) % 360, // Rotate right by 2 degrees
    }));
  };

  const rotateLeft = () => {
    setTransform((prev) => ({
      ...prev,
      rotation: (prev.rotation - 2 + 360) % 360, // Rotate left by 2 degrees
    }));
  };
  const zoomIn = () => {
    setTransform((prev) => ({
      ...prev,
      zoom: prev.zoom + 0.1, // Removed the maximum limit
    }));
  };

  const zoomOut = () => {
    setTransform((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 0.1, 0.1), // Prevents going below a certain threshold
    }));
  };

  // Function to move div in specific direction
  const moveUp = (e) => {
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      y: Math.max(prev.y - 10, 0), // Prevent moving out of bounds
    }));
  };

  const moveDown = (e) => {
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      y: prev.y + 10, // You may want to limit maximum movement here
    }));
  };

  const moveLeft = (e) => {
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      x: prev.x - 10, // Prevent moving out of bounds
    }));
  };

  const moveRight = (e) => {
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      x: prev.x + 10, // You may want to limit maximum movement here
    }));
  };
  const handleConfirm = () => {
    setStep(8);
  };
  const handleBack = () => {
    setStep(3);
  };
  return (
    <div className="controls  max-sm:w-full w-[50%] flex flex-col justify-between min-h-[90vh] items-center">
      <h1 className="text-bule-500 text-lg font-bold my-5 text-center text-blue-500">
        Position Face
      </h1>
      <ContainerBox>
        <h2 className="text-center max-sm:my-5 my-10 text-lg max-sm:text-sm font-bold w-full max-sm:hidden">
          Useing the tools below position the face on the items correctly
        </h2>
        <div className="flex gap-10 justify-center items-center max-sm:gap-1 w-full  max-sm:justify-center max-sm:hidden">
          <div className="flex flex-col justify-center items-center gap-y-3 order-2">
            <span className="text-blue-500 max-sm:text-sm">Rotate</span>
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={rotateRight}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2 max-sm:flex-col max-sm:scale-50 scale-110  "
              >
                <FaRotateRight className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
              <button
                onClick={rotateLeft}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaRotateLeft className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3 order-1  max-sm:col-span-1">
            <span className="text-blue-500 max-sm:text-sm">Position</span>
            <div className="flex gap-1 justify-center items-center">
              <button
                onClick={moveUp}
                className="text-gray-600  px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowUp className="inline-block text-lg font-light max-sm:text-2xl" />
              </button>
              <button
                onClick={moveDown}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowDown className="inline-block text-lg font-light max-sm:text-2xl" />
              </button>
              <button
                onClick={moveLeft}
                className="text-gray-600  px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowLeft className="inline-block text-lg font-light max-sm:text-2xl " />
              </button>
              <button
                onClick={moveRight}
                className="text-gray-600 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowRight className="inline-block text-lg font-light max-sm:text-2xl " />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-3 order-3">
            <span className="text-blue-500 max-sm:text-sm">Zoom</span>
            <div className="flex">
              <button
                onClick={zoomIn}
                className=" text-gray-500 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2 max-sm:flex-col max-sm:scale-50"
              >
                <FaPlus className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
              <button
                onClick={zoomOut}
                className=" text-gray-500 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2 max-sm:flex-col max-sm:scale-50"
              >
                <FaMinus className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </ContainerBox>
      <div className="flex flex-col justify-center items-center w-full">
        <div className=" gap-10 justify-center items-center max-sm:gap-1 hidden max-sm:flex max-sm:justify-center">
          <div className="flex flex-col justify-center items-center gap-y-3 order-2">
            <span className="text-blue-500 max-sm:text-sm">Rotate</span>
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={rotateRight}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2 max-sm:flex-col max-sm:scale-50 scale-110  "
              >
                <FaRotateRight className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
              <button
                onClick={rotateLeft}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaRotateLeft className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3 order-1  max-sm:col-span-1">
            <span className="text-blue-500 max-sm:text-sm">Position</span>
            <div className="flex gap-1 justify-center items-center">
              <button
                onClick={moveUp}
                className="text-gray-600  px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowUp className="inline-block text-lg font-light max-sm:text-2xl" />
              </button>
              <button
                onClick={moveDown}
                className="text-gray-600  px-2 py-1 text-xl rounded-md  flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowDown className="inline-block text-lg font-light max-sm:text-2xl" />
              </button>
              <button
                onClick={moveLeft}
                className="text-gray-600  px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowLeft className="inline-block text-lg font-light max-sm:text-2xl " />
              </button>
              <button
                onClick={moveRight}
                className="text-gray-600 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2  max-sm:flex-col max-sm:scale-50 scale-110 "
              >
                <FaArrowRight className="inline-block text-lg font-light max-sm:text-2xl " />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-3 order-3">
            <span className="text-blue-500 max-sm:text-sm">Zoom</span>
            <div className="flex">
              <button
                onClick={zoomIn}
                className=" text-gray-500 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2 max-sm:flex-col max-sm:scale-50"
              >
                <FaPlus className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
              <button
                onClick={zoomOut}
                className=" text-gray-500 px-2 py-1 text-xl rounded-md hover:text-gray-700 flex items-center gap-2 max-sm:flex-col max-sm:scale-50"
              >
                <FaMinus className="inline-block text-lg font-light max-sm:text-2xl text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <ButtonBox>
          <button
            className="px-10 text-sm py-3 bg-blue-200 bg-opacity-50 text-blue-700 rounded-lg border border-blue-800 focus:outline-none focus:ring-2 hover:bg-blue-700 focus:ring-blue-500 hover:text-white flex justify-center items-center gap-2"
            onClick={handleBack}
          >
            {" "}
            <span className="inline-block">Back</span>
          </button>
          <button
            className="px-20 max-sm:px-8 max-sm:w-full  py-3 bg-blue-500   text-white text-sm rounded hover:bg-blue-800 border flex justify-center items-center gap-2 max-sm:gap-1 w-full"
            onClick={handleConfirm}
          >
            <FaCheck /> Confirm
          </button>
        </ButtonBox>
      </div>
    </div>
  );
};

export default Position;
