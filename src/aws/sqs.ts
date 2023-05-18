// Load the AWS SDK for Node.js
import config from '../config/config';
import * as AWS from 'aws-sdk';

// Set up AWS configuration
AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
});

// Create an instance of the SQS service
const sqs = new AWS.SQS();

// Create an SQS queue
export async function createQueue(queueName: string): Promise<void> {
  const params: AWS.SQS.CreateQueueRequest = {
    QueueName: queueName
  };

  try {
    const createQueueResponse = await sqs.createQueue(params).promise();
    console.log('Queue created:', createQueueResponse.QueueUrl);
  } catch (error) {
    console.error('Error creating queue:', error);
  }
}

// Send a message to the SQS queue
export async function sendMessage(queueUrl: string, messageBody: string): Promise<void> {
  const params: AWS.SQS.SendMessageRequest = {
    MessageBody: messageBody,
    QueueUrl: queueUrl
  };

  try {
    const sendMessageResponse = await sqs.sendMessage(params).promise();
    console.log('Message sent:', sendMessageResponse.MessageId);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Receive messages from the SQS queue
export async function receiveMessages(
  queueUrl: string,
  maxNumberOfMessages: number
): Promise<void> {
  const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: maxNumberOfMessages
  };

  try {
    const receiveMessageResponse = await sqs.receiveMessage(params).promise();
    const messages = receiveMessageResponse.Messages;
    if (messages && messages.length > 0) {
      console.log('Received messages:');
      messages.forEach((message) => {
        console.log('Message:', message.Body);
        // Delete the message from the queue
        // deleteMessage(queueUrl, message.ReceiptHandle!);
      });
    } else {
      console.log('No messages received.');
    }
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
}

// Delete a message from the SQS queue
export async function deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
  const params: AWS.SQS.DeleteMessageRequest = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle
  };

  try {
    const deleteMessageResponse = await sqs.deleteMessage(params).promise();
    console.log('Message deleted:', deleteMessageResponse);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}

// Usage
// async function main(): Promise<void> {
//   const queueName = 'FirstQueue';
//   const messageBody = 'Hello, SQS!';
//   const maxNumberOfMessages = 10;

//   // Create the SQS queue
//   await createQueue(queueName);

//   // Send a message to the SQS queue
//   const queueUrl = `https://sqs.${config.aws.region}.amazonaws.com/${config.aws.accountId}/${queueName}`;
//   await sendMessage(queueUrl, messageBody);

//   // Receive messages from the SQS queue
//   await receiveMessages(queueUrl, maxNumberOfMessages);
// }

// // Run the script
// main();
