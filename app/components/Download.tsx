import React, { useRef, useState } from 'react';

const layers = [
  {
    name: 'base',
    url: '/images/Snugzy_Shape_preview.png', // Replace with real layer
    filter: "invert(5%) sepia(51%) saturate(280%) hue-rotate(340deg) brightness(86%) contrast(88%)"
  }
  
];

const CompositeCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawComposite = async () => {
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = 300;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    for (const layer of layers) {
      await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          ctx.filter = layer.filter || 'none';
          ctx.drawImage(img, 0, 0, width, height);
          ctx.restore();
          resolve();
        };
        img.src = layer.url;
      });
    }

    setIsDrawing(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'composite-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="p-6">
      <div className="space-x-4 mb-4">
        <button
          onClick={drawComposite}
          disabled={isDrawing}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {isDrawing ? 'Rendering...' : 'Render Image'}
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download PNG
        </button>
      </div>

      <canvas ref={canvasRef} className="border shadow-lg" />
    </div>
  );
};

export default CompositeCanvas;
