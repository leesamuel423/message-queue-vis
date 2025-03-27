import { Message } from '../../types';
import './Queue.css';

interface QueueProps {
  messages: Message[];
  maxRetries: number;
}

const Queue = ({ messages, maxRetries }: QueueProps) => {
  return (
    <div className="component queue" title="Stores messages until they can be processed">
      <h2>Message Queue <span id="queueCount">({messages.length})</span></h2>
      <div className="component-visual">
        <div className="queue-visual">
          {messages.map((message, index) => (
            <div 
              key={`${message.id}-${message.retries}`}
              className={`message ${message.type}-type${message.retries > 0 ? ' retry' : ''}${message.status === 'processing' ? ' processing' : ''}`}
            >
              <span>
                {message.retries > 0 
                  ? `Message ${message.id} (Retry ${message.retries}/${maxRetries})` 
                  : `Message ${message.id}`}
                {index === 0 && message.status === 'processing' && ' (Processing...)'}
              </span>
              <span>{message.type === 'success' ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queue;