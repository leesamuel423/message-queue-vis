import Producer from '../Producer';
import Queue from '../Queue';
import Consumer from '../Consumer';
import './SystemContainer.css';

const SystemContainer = ({ queue, processing, ackStatus, producerAnimating, maxRetries }) => {
  return (
    <div className="system-container">
      <Producer isAnimating={producerAnimating} />
      <Queue messages={queue} maxRetries={maxRetries} />
      <Consumer 
        processing={processing} 
        ackStatus={ackStatus}
        maxRetries={maxRetries} 
      />
    </div>
  );
};

export default SystemContainer;