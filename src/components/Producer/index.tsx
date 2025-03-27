import './Producer.css';

interface ProducerProps {
  isAnimating: boolean;
}

const Producer = ({ isAnimating }: ProducerProps) => {
  // This is deliberately simple - the animation is controlled by the parent's isAnimating prop
  return (
    <div className="component producer" title="Creates and sends messages to the queue">
      <h2>Producer</h2>
      <div className="component-visual">
        <div className="producer-animation">
          {/* Show the animation element only when isAnimating is true */}
          {isAnimating && <div className="sending-animation" />}
        </div>
      </div>
    </div>
  );
};

export default Producer;