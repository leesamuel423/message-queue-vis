/**
 * Service that handles message queue operations
 */
class MessageQueueService {
  constructor(config) {
    this.processingSpeed = config.processingSpeed || 1;
    this.defaultProcessingTime = config.defaultProcessingTime || 1000;
    this.retryDelay = config.retryDelay || 1500;
    this.maxRetries = config.maxRetries || 2;
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Add a message to the queue
   * @param {Object} message - The message to add
   */
  enqueue(message) {
    this.queue.push(message);
    return this.queue.length;
  }

  /**
   * Remove a message from the queue
   * @returns {Object|null} - The next message or null if queue is empty
   */
  dequeue() {
    if (this.queue.length === 0) return null;
    return this.queue.shift();
  }

  /**
   * Get the current queue length
   * @returns {number} - The number of messages in the queue
   */
  getQueueLength() {
    return this.queue.length;
  }

  /**
   * Set the processing speed
   * @param {number} speed - The processing speed multiplier
   */
  setProcessingSpeed(speed) {
    this.processingSpeed = speed;
  }
}

export default MessageQueueService;
