const Controls = ({
  onFileUpload,
  onExport,
  selectedObject,
  updateSelectedObject,
}) => {
  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={onFileUpload} />
        <button onClick={onExport}>Export</button>
      </div>

      {selectedObject && (
        <div>
          <label>Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedObject.opacity}
            onChange={(e) =>
              updateSelectedObject("opacity", parseFloat(e.target.value))
            }
          />
        </div>
      )}
    </div>
  );
};

export default Controls;
