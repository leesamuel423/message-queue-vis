import Producer from '../Producer';
import Queue from '../Queue';
import Consumer from '../Consumer';
import { Message, AckStatus } from '../../types';
import './SystemContainer.css';

interface SystemContainerProps {
  queue: Message[];
  processing: Message | null;
  ackStatus: AckStatus | null;
  producerAnimating: boolean;
  maxRetries: number;
}

const SystemContainer = ({ queue, processing, ackStatus, producerAnimating, maxRetries }: SystemContainerProps) => {
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