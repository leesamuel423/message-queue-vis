import './Controls.css';

interface ControlsProps {
  onSendSuccess: () => void;
  onSendFail: () => void;
  processingSpeed: number;
  setProcessingSpeed: (speed: number) => void;
}

const Controls = ({ onSendSuccess, onSendFail, processingSpeed, setProcessingSpeed }: ControlsProps) => {
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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