import * as AWS from 'aws-sdk';
import config from '../config/config';

// Set up AWS configuration
AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
});

// Create an instance of the SNS service
const sns = new AWS.SNS();

// Create an SNS topic
async function createTopic(topicName: string): Promise<void> {
  const params: AWS.SNS.CreateTopicInput = {
    Name: topicName
  };

  try {
    const createTopicResponse = await sns.createTopic(params).promise();
    console.log('Topic created:', createTopicResponse.TopicArn);
  } catch (error) {
    console.error('Error creating topic:', error);
  }
}

// Subscribe an endpoint to the SNS topic
async function subscribeToTopic(
  topicArn: string,
  endpoint: string,
  protocol: string
): Promise<void> {
  const params: AWS.SNS.SubscribeInput = {
    TopicArn: topicArn,
    Protocol: protocol,
    Endpoint: endpoint
  };

  try {
    const subscribeResponse = await sns.subscribe(params).promise();
    console.log('Endpoint subscribed:', subscribeResponse.SubscriptionArn);
  } catch (error) {
    console.error('Error subscribing endpoint:', error);
  }
}

// Publish a message to the SNS topic
export async function publishMessage(
  productId: number,
  quantity: number,
  name: string
): Promise<void> {
  const params: AWS.SNS.PublishInput = {
    TopicArn: config.aws.topicArn,
    Message: `Product with name ${name} and id ${productId} quantity has fallen below the threshold. Current quantity: ${quantity}`
  };

  try {
    const publishResponse = await sns.publish(params).promise();
    console.log('Message published:', publishResponse.MessageId);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

// Usage example
// async function main(): Promise<void> {
//   const topicName = config.aws.topicName;
//   const endpoint = config.aws.email;
//   const protocol = 'email';
//   const message = 'Hello, SNS!';

//   // Create the SNS topic
//   const createTopicResponse = await createTopic(topicName);
//   const topicArn = config.aws.topicArn;

//   // Subscribe an endpoint to the SNS topic
//   await subscribeToTopic(topicArn, endpoint, protocol);

// Publish a message to the SNS topic
// await publishMessage(topicArn, message);
// }

// // Run the script
// main();
