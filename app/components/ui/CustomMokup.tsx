import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const CustomMockup = () => {
  const canvasRef = useRef(null);
  const [skinColor, setSkinColor] = useState("#f5c6a5"); // Default skin tone
  const [uploadedFace, setUploadedFace] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 300, // Adjust size as needed
      height: 400,
      backgroundColor: "white",
    });

    // Load Mockup Image
    fabric.Image.fromURL(
      "https://snugzy-production.s3.amazonaws.com/template/image/d7340803-9a5f-47aa-a823-6606c399c420/Snugzy_Shape_preview.png",
      (img) => {
        img.scaleToWidth(300); // Scale image
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      }
    );

    // Add Skin Tone Layer
    const skinLayer = new fabric.Rect({
      left: 50,
      top: 80,
      width: 200,
      height: 200,
      fill: skinColor,
      selectable: false, // Prevent accidental movement
    });

    canvas.add(skinLayer);

    // Store in ref for later updates
    canvas.skinLayer = skinLayer;
    canvasRef.current.canvasInstance = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  // Function to update skin color
  const updateSkinTone = (color) => {
    setSkinColor(color);
    const canvas = canvasRef.current.canvasInstance;
    if (canvas && canvas.skinLayer) {
      canvas.skinLayer.set("fill", color);
      canvas.renderAll();
    }
  };

  // Handle Face Image Upload
  const handleFaceUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgURL = e.target.result;
        fabric.Image.fromURL(imgURL, (img) => {
          img.scaleToWidth(100);
          img.set({
            left: 100,
            top: 120,
            selectable: true,
            cornerSize: 10,
            borderColor: "red",
          });

          const canvas = canvasRef.current.canvasInstance;
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border border-gray-400"></canvas>

      {/* Skin Tone Picker */}
      <div className="mt-4 flex gap-2">
        {["#f5c6a5", "#e0ac69", "#c68642", "#8d5524"].map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded-full border"
            style={{ backgroundColor: color }}
            onClick={() => updateSkinTone(color)}
          ></button>
        ))}
      </div>

      {/* Upload Face Image */}
      <input type="file" accept="image/*" onChange={handleFaceUpload} className="mt-4" />
    </div>
  );
};

export default CustomMockup;
