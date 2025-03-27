import { useState, useEffect } from 'react'
import { Header, Controls, SystemContainer } from './components/Layout'
import { Dashboard } from './components/Stats'
import MessageQueueService from './services/MessageQueueService'
import './styles/App.css'

function App() {
  // Configuration
  const DEFAULT_PROCESSING_TIME = 1000; // in milliseconds
  const RETRY_DELAY = 1500; // in milliseconds
  const MAX_RETRIES = 2;

  // State
  const [processingSpeed, setProcessingSpeed] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    ack: 0,
    nack: 0
  });
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ackStatus, setAckStatus] = useState(null);
  const [producerAnimating, setProducerAnimating] = useState(false);
  
  // Unique ID for messages
  const [messageCounter, setMessageCounter] = useState(1);

  // Message Queue Service
  const queueService = new MessageQueueService({
    processingSpeed,
    defaultProcessingTime: DEFAULT_PROCESSING_TIME,
    retryDelay: RETRY_DELAY,
    maxRetries: MAX_RETRIES,
  });

  // Update statistics
  const updateStats = (type, success) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      
      if (type === 'add') {
        newStats.total += 1;
      } else if (type === 'process') {
        if (success) {
          newStats.success += 1;
          newStats.ack += 1;
        } else {
          newStats.failed += 1;
          newStats.nack += 1;
        }
      }
      
      return newStats;
    });
  };

  // Process next message in queue
  const processNext = () => {
    if (queue.length === 0 || isProcessing) {
      return;
    }
    
    // Start processing
    setIsProcessing(true);
    
    // Get the next message - but don't remove it from the queue yet
    const nextMessage = queue[0];
    
    // Mark the message as processing (update it in the queue)
    setQueue(prevQueue => prevQueue.map((msg, index) => 
      index === 0 ? { ...msg, status: 'processing' } : msg
    ));
    
    // Set the processing message
    setProcessing({
      ...nextMessage,
      status: 'processing'
    });
    
    // Simulate processing time
    const processingTime = DEFAULT_PROCESSING_TIME / processingSpeed;
    
    setTimeout(() => {
      // Determine if processing succeeds or fails
      const success = nextMessage.type === 'success' || 
                      (nextMessage.type === 'fail' && nextMessage.retries >= MAX_RETRIES);
      
      // Update processing status
      setProcessing(prev => ({
        ...prev,
        status: success ? 'success' : 'failed'
      }));
      
      // Show ACK/NACK
      setAckStatus({
        type: success ? 'ack' : 'nack',
        messageId: nextMessage.id
      });
      
      if (success) {
        // Handle success
        updateStats('process', true);
        
        // After a delay, remove the message from the queue and process the next one
        setTimeout(() => {
          setQueue(prevQueue => prevQueue.filter((_, index) => index !== 0));
          setProcessing(null);
          setIsProcessing(false);
          setAckStatus(null);
          // Process next message if any
        }, 800);
      } else {
        // Handle failure
        if (nextMessage.retries === 0) {
          updateStats('process', false);
        }
        
        // Schedule retry after delay
        setTimeout(() => {
          // Remove the message from its current position
          // and add it back with incremented retry count
          setQueue(prevQueue => {
            const newQueue = prevQueue.filter((_, index) => index !== 0);
            const updatedMessage = {
              ...nextMessage,
              retries: nextMessage.retries + 1,
              status: 'queued'
            };
            return [...newQueue, updatedMessage];
          });
          
          setProcessing(null);
          setIsProcessing(false);
          setAckStatus(null);
        }, RETRY_DELAY / processingSpeed);
      }
    }, processingTime);
  };

  // Trigger producer animation with a timeout that matches the animation duration
  const triggerProducerAnimation = () => {
    // First ensure it's off (in case of rapid clicks)
    setProducerAnimating(false);
    
    // Use setTimeout to ensure the state change is registered
    setTimeout(() => {
      setProducerAnimating(true);
      
      // Turn off after animation duration
      setTimeout(() => {
        setProducerAnimating(false);
      }, 1000); // Animation duration is 1s
    }, 10);
  };

  // Add a message to the queue
  const addMessage = (type) => {
    // Trigger producer animation
    triggerProducerAnimation();
    
    const newMessage = {
      id: messageCounter,
      type,
      retries: 0,
      status: 'queued',
      createdAt: new Date()
    };
    
    setMessageCounter(prev => prev + 1);
    setQueue(prevQueue => [...prevQueue, newMessage]);
    updateStats('add');
  };

  // Handle button clicks
  const handleSendSuccess = () => {
    addMessage('success');
  };

  const handleSendFail = () => {
    addMessage('fail');
  };

  // Process messages when queue changes
  useEffect(() => {
    if (queue.length > 0 && !isProcessing) {
      processNext();
    }
  }, [queue, isProcessing]);

  return (
    <div className="container">
      <Header />
      <Controls 
        onSendSuccess={handleSendSuccess} 
        onSendFail={handleSendFail} 
        processingSpeed={processingSpeed}
        setProcessingSpeed={setProcessingSpeed}
      />
      <SystemContainer 
        queue={queue} 
        processing={processing}
        ackStatus={ackStatus}
        producerAnimating={producerAnimating}
        maxRetries={MAX_RETRIES}
      />
      <Dashboard stats={stats} />
    </div>
  )
}

export default App