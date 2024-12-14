import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import Controls from "./Controls";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f3f3f3",
    });

    setCanvas(fabricCanvas);

    // Handle selection events
    const updateSelection = (event) => setSelectedObject(event?.target || null);
    fabricCanvas.on("selection:created", updateSelection);
    fabricCanvas.on("selection:updated", updateSelection);
    fabricCanvas.on("selection:cleared", () => setSelectedObject(null));

    return () => fabricCanvas.dispose();
  }, []);

  // Add Image to Canvas
  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
          opacity: 1,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  // Export Canvas as Image
  const exportCanvas = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.download = "composition.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div>
      <Controls
        onFileUpload={(e) => handleFileUpload(e.target.files[0])}
        onExport={exportCanvas}
        selectedObject={selectedObject}
        updateSelectedObject={(key, value) => {
          if (selectedObject) {
            selectedObject.set(key, value);
            canvas.renderAll();
          }
        }}
      />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
