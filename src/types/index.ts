// Message types
export type MessageType = 'success' | 'fail';
export type MessageStatus = 'queued' | 'processing' | 'success' | 'failed';

export interface Message {
  id: number;
  type: MessageType;
  retries: number;
  status: MessageStatus;
  createdAt: Date;
}

// ACK/NACK status
export type AckType = 'ack' | 'nack';

export interface AckStatus {
  type: AckType;
  messageId: number;
}

// Stats for dashboard
export interface Stats {
  total: number;
  success: number;
  failed: number;
  ack: number;
  nack: number;
}

// Configuration for MessageQueueService
export interface MessageQueueConfig {
  processingSpeed: number;
  defaultProcessingTime: number;
  retryDelay: number;
  maxRetries: number;
}