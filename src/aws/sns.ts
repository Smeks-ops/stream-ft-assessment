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
