import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import FaceCutterApp from "~/components/FaceCutterApp";
import { IoClose } from "react-icons/io5";

import ImageCropper from "~/components/ImageCroper";
import ImageEditor2 from "~/components/ImageEditor2";
import ImagePreview from "~/components/ImagePreview";

import CameraComponent from "~/components/Camera";
import FinalPreview from "~/components/FinalPreview";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { convertNumberToImageLink } from "~/lib/server.utlis";
import { LoaderFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "Product Customization" },
    { name: "description", content: "Snugzy" },
  ];
};

import { json } from "@remix-run/node";
import { Buffer } from "buffer";
import SkinTone from "~/components/SkinTone";
import Position from "~/components/Position";

// Type for product meta data
interface ProductMetaData {
  key: string;
  value: any;
}

// Type for WooCommerce product
interface WooCommerceProduct {
  meta_data: ProductMetaData[];
  [key: string]: any;
}

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { id: productId } = params;

    if (!productId) {
      throw new Response("Product ID is required", { status: 400 });
    }

    // Get environment variables
    const CONSUMER_KEY = process.env.CONSUMER_KEY_TEST;
    const CONSUMER_SECRET = process.env.CONSUMER_SECRET_TEST;

    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("Missing WooCommerce API credentials");
      throw new Response("Server configuration error", { status: 500 });
    }

    // Fetch product from WooCommerce
    const product = await fetchWooCommerceProduct(
      productId,
      CONSUMER_KEY,
      CONSUMER_SECRET
    );

    // Process product frame images
    const { imageUrl, headImageUrl, skinToneImage } =
      await processProductFrameImage(product);

    return json(
      {
        imageUrl,
        productId,
        headImageUrl,
        skinToneImage,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      }
    );
  } catch (error) {
    console.error("Loader error:", error);

    if (error instanceof Response) {
      return error;
    }

    return new Response("Internal Server Error", {
      status: 500,
      statusText: "An unexpected error occurred",
    });
  }
};

// Helper function to fetch WooCommerce product
async function fetchWooCommerceProduct(
  productId: string,
  consumerKey: string,
  consumerSecret: string
): Promise<WooCommerceProduct> {
  const apiUrl = `https://makeminime.com/wp-json/wc/v3/products/${productId}`;
  const basicAuth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Response(`Failed to fetch product: ${response.statusText}`, {
      status: response.status,
    });
  }

  return await response.json();
}

// Helper function to process product frame images
async function processProductFrameImage(
  product: WooCommerceProduct
): Promise<{ imageUrl: string; headImageUrl: string; skinToneImage: string }> {
  const getImage = async (key: string): Promise<string> => {
    const metaDataItem = product.meta_data?.find((item) => item.key === key);
    if (!metaDataItem?.value) {
      return "";
    }

    const imageUrl = await convertNumberToImageLink(metaDataItem.value);
    if (!imageUrl) {
      return "";
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return "";
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const contentType =
      imageResponse.headers.get("Content-Type") || "image/jpeg";

    return `data:${contentType};base64,${base64Image}`;
  };

  // Fetch required images
  const [imageUrl, headImageUrl, skinToneImage] = await Promise.all([
    getImage("product_frame"),
    getImage("head_image"),
    getImage("skin_tone_image"),
  ]);

  return { imageUrl, headImageUrl, skinToneImage };
}

export default function ProductIdCustomize() {
  const [images, setImages] = useState<string[]>([]);
  const { imageUrl, headImageUrl, productId } = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState<boolean>(true);
  const [bodyImage, setBodyImage] = useState<string>("");
  const [headBackImage, setHeadBackImage] = useState<string>("");
  const [skinToneImage, setSkinToneImage] = useState<string>("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string>("");
  const [croppedImage, setCropedImage] = useState<string>("");
  const [faceImage, setFaceImage] = useState<string>("");
  const [skinTone, setSkinTone] = useState<string>(
    "invert(71%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)"
  );
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState(0.7);
  const [step, setStep] = useState<number>(0);
  const [transform, setTransform] = useState({
    x: 80,
    y: 50,
    width: 400,
    height: 400,
    rotation: 0,
    aspectRatio: 1,
    zoom: 1,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedImages = localStorage.getItem("finalImage");
      if (savedImages) {
        setImages(JSON.parse(savedImages));
      } else {
        setImages([]);
      }
    }
  }, []);

  const handleClearPhotos = () => {
    // Clear images from state and localStorage
    setImages([]);
    if (typeof window !== "undefined") {
      localStorage.setItem("finalImage", JSON.stringify([])); // Clear the localStorage
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);

      // Update localStorage with the new images array after removal
      if (typeof window !== "undefined") {
        localStorage.setItem("finalImage", JSON.stringify(updatedImages));
      }

      return updatedImages;
    });
  };

  const handleUploadPhoto = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const objectURL = URL.createObjectURL(file);
      setUploadedPhoto(objectURL);
      setStep(1);
      localStorage.setItem("uploadImage", objectURL);
    }
  };
  const handleTakePhoto = (e: any) => {
    setStep(6);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadImage");

    if (storedImage) {
      setUploadedPhoto(storedImage);
    }
  }, []);

  // image frame load from loader
  useEffect(() => {
    if (imageUrl) {
      setBodyImage(imageUrl);
    }
    if (headImageUrl) {
      setHeadBackImage(headImageUrl);
    }
    if (skinToneImage) {
      setSkinToneImage(skinToneImage);
    }
  }, [imageUrl, headImageUrl, skinToneImage]);

  //  edit photo
  const handleEdit = (index) => {
    setStep(3);
    const storedImage = localStorage.getItem("finalImage");
    const imageArray = storedImage ? JSON.parse(storedImage) : [];
    setCropedImage(imageArray[index]);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("finalImage");
    setImages(storedImage ? JSON.parse(storedImage) : []);
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirmExit = (confirm: boolean) => {
    if (confirm) {
      window.location.href = "https://makeminime.com";
    } else {
      setShowPopup(false);
    }
  };

  const handleBeforeUnload = () => {
    if (unsavedChanges) {
      const message =
        "You have unsaved changes. Do you want to leave without saving?";
      e.returnValue = message;
      return message;
    }
  };

  useEffect(() => {
    if (unsavedChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);
  console.log(step);
  return (
    <div className="h-screen w-screen max-sm:w-full  top-0 left-0 text-black min-h-[80vh] relative max-sm:h-[97vh]">
      {/* Exit Link */}
      {loading ? (
        <div className="loader w-full h-screen flex gap-3 flex-col justify-center items-center">
          <img src="/images/happiness.png" alt="" />
          <p>Let's get this Started...</p>
          <p className="font-bold text-blue-500">Personalisation Tool is Loading</p>
        </div>
      ) : (
        <>
          {showPopup && (
            <div className="popup bg-gray-900 fixed inset-0 bg-opacity-80 flex justify-center items-center z-20">
              <div className=" bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                  Are you sure you want to exit?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  your design will be lost
                </p>
                <div className="flex justify-around gap-4">
                  <button
                    onClick={() => handleConfirmExit(true)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                  >
                    Yes, Leave
                  </button>
                  <button
                    onClick={() => handleConfirmExit(false)}
                    className="px-4 py-2 text-sm bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-all"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="w-full h-12 px-10 flex justify-start items-center border-b border-gray-300 max-sm:sticky top-0 bg-white z-10 ">
            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-1 font-normal"
            >
              <IoIosArrowBack />
              Exit
            </button>
          </div>

          {/* Main Section */}
          <div className="w-full flex gap-2 max-sm:flex-col justify-between items-center ">
            {/* Left Section - Image Preview */}
            <ImageEditor2
              faceImage={faceImage}
              bodyImage={bodyImage}
              skinTone={skinTone}
              headBackImage={headBackImage}
              skinToneImage={skinToneImage}
              step={step}
              setStep={setStep}
              productId={productId}
              setImagePosition={setImagePosition}
              imagePosition={imagePosition}
              rotation={rotation}
              setRotation={setRotation}
              setScale={setScale}
              scale={scale}
              transform={transform}
              setTransform={setTransform}
            />

            {/* Right Section - Upload/Take Photo */}
            {croppedImage && step == 3 && (
              <ImagePreview
                croppedImage={croppedImage}
                setUploadedPhoto={setUploadedPhoto}
                setCropedImage={setCropedImage}
                setFaceImage={setFaceImage}
                step={step}
                setStep={setStep}
              />
            )}

            {uploadedPhoto && step == 1 && 
              

                  <ImageCropper
                    src={uploadedPhoto}
                    setUploadedPhoto={setUploadedPhoto}
                    setCropedImage={setCropedImage}
                    setStep={setStep}
                    step={step}
                  />
                
              
            }
            {step === 0 && (
              <div
                className={`w-[50%]   max-sm:w-full flex flex-col  items-center justify-center max-sm:min-h-[50vh]`}
              >
                <div className="w-full flex flex-col items-center justify-center">
                  <label
                    htmlFor="uploadphoto"
                    className="mt-10 max-sm:mt-3 text-blue-500 font-semibold min-w-[200px] px-10 py-6 bg-blue-200 bg-opacity-50 border border-blue-500  hover:text-white hover:bg-blue-600 rounded-md shadow-sm cursor-pointer flex justify-center max-sm:scale-75 items-center"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    onChange={handleUploadPhoto}
                    className="hidden"
                    name="uploadphoto"
                    id="uploadphoto"
                  />
                  <button
                    onClick={handleTakePhoto}
                    className="mt-3 max-sm:mt-0 min-w-[200px] px-10 py-6 bg-green-200 font-semibold hover:bg-green-600 rounded-md shadow-sm  cursor-pointer text-green-500 bg-opacity-50 border border-green-500  flex justify-center items-center hover:text-white  max-sm:scale-75"
                  >
                    Take Photo
                  </button>
                </div>

                <div className="w-full  flex flex-col items-center justify-center text-[#646464]">
                  <span className="mt-5 text-sm font-light ">
                    For any tips follow our guide{" "}
                    <a className="hover:underline text-blue-900" href="/here">
                      here
                    </a>
                  </span>

                  <p className="mt-10 max-sm:mt-2 text-sm text-[#696969]">
                    You have {images.length} uploaded{" "}
                    {images.length === 1 ? "image" : "images"}
                  </p>

                  {/* Uploaded Images Section */}
                  <div className="w-full px-5 mt-10 max-sm:mt-3">
                    {images.length > 0 && (
                      <div className="flex justify-between items-center">
                        <h6 className="font-semibold text-[#000000]">Uploaded Images</h6>
                        {images.length > 0 && (
                          <button
                            className="text-[#007ee5] underline font-semibold"
                            onClick={handleClearPhotos}
                          >
                            Clear photos
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mt-5 mb-5 flex gap-3 flex-wrap ">
                      {images.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col items-center"
                        >
                          <button
                            className="absolute top-[-8px] right-[-8px] bg-blue-500 text-white rounded-full p-1   w-5 h-5 flex justify-center items-center"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <IoClose className="text-sm" />
                          </button>
                          <img
                            className="w-20 h-20 max-sm:w-10 max-sm:h-10 object-contain rounded"
                            src={item}
                            alt={`Uploaded ${index + 1}`}
                          />
                          <button
                            onClick={() => handleEdit(index)}
                            className="underline text-sm font-bold  mt-2  hover:text-blue-500"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 8 && skinTone && (
              <SkinTone
                step={step}
                setStep={setStep}
                skinTone={skinTone}
                setSkinTone={setSkinTone}
              />
            )}

            {step === 5 && croppedImage && (
              <FaceCutterApp
                faceImage={croppedImage}
                setStep={setStep}
                setCropedImage={setCropedImage}
                step={step}
              />
            )}

            {step === 6 && (
              <CameraComponent
                setStep={setStep}
                setCropedImage={setCropedImage}
                setUploadedPhoto={setUploadedPhoto}
                step={step}
              />
            )}
            {step === 7 && (
              <FinalPreview
                setStep={setStep}
                croppedImage={croppedImage}
                skinTone={skinTone}
                step={step}
              />
            )}
            {step === 4 && (
              <Position
                step={step}
                setStep={setStep}
                setImagePosition={setImagePosition}
                imagePosition={imagePosition}
                rotation={rotation}
                setRotation={setRotation}
                setScale={setScale}
                transform={transform}
                setTransform={setTransform}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
