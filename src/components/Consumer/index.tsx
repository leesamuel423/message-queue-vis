import { Message, AckStatus } from '../../types';
import './Consumer.css';

interface ConsumerProps {
  processing: Message | null;
  ackStatus: AckStatus | null;
  maxRetries: number;
}

const Consumer = ({ processing, ackStatus, maxRetries }: ConsumerProps) => {
  let messageContent = null;
  
  if (processing) {
    if (processing.status === 'processing') {
      messageContent = (
        <div className="processing-message">
          Processing Message {processing.id}...
        </div>
      );
    } else if (processing.status === 'success') {
      messageContent = (
        <div className="processing-message processing-success">
          {processing.type === 'success' 
            ? 'Successfully processed!' 
            : `Success after ${processing.retries} ${processing.retries === 1 ? 'retry' : 'retries'}!`}
        </div>
      );
    } else if (processing.status === 'failed') {
      messageContent = (
        <div className="processing-message processing-fail">
          Failed! Retry {processing.retries + 1}/{maxRetries}
        </div>
      );
    }
  }

  // ACK/NACK visualization
  let ackContent = null;
  if (ackStatus) {
    ackContent = (
      <div className={`ack-message ${ackStatus.type}`}>
        {ackStatus.type === 'ack' ? 'ACK Sent' : 'NACK Sent'}
        <span className="ack-details">Message {ackStatus.messageId}</span>
      </div>
    );
  }

  return (
    <div className="component consumer" title="Processes messages from the queue and sends acknowledgments">
      <h2>Consumer</h2>
      <div className="component-visual">
        <div className="processing-area">
          {messageContent}
        </div>
        <div className="ack-area">
          {ackContent}
        </div>
      </div>
    </div>
  );
};

export default Consumer;