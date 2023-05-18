import { SQSEvent, SQSRecord } from 'aws-lambda';

export const processSQSMessages = async (event: SQSEvent): Promise<void> => {
  try {
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      const product = messageBody.data;

      // Process the product details
      console.log('Product:', product);
    }
  } catch (error) {
    console.error('Error processing SQS messages:', error);
    throw error;
  }
};
