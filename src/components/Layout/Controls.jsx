import './Controls.css';

const Controls = ({ onSendSuccess, onSendFail, processingSpeed, setProcessingSpeed }) => {
  const handleSpeedChange = (e) => {
    setProcessingSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="controls">
      <button onClick={onSendSuccess} className="btn success">
        Send Success Event
      </button>
      <button onClick={onSendFail} className="btn fail">
        Send Fail Event
      </button>
      <div className="speed-control">
        <label htmlFor="processingSpeed">Processing Speed:</label>
        <input
          type="range"
          id="processingSpeed"
          min="0.5"
          max="3"
          step="0.5"
          value={processingSpeed}
          onChange={handleSpeedChange}
        />
        <span id="speedValue">{processingSpeed}x</span>
      </div>
    </div>
  );
};

export default Controls;
