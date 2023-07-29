import boto3
import uuid


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    sqs = boto3.client('sqs', region_name='us-east-1')

    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        s3_url = f"https://{bucket}.s3.amazonaws.com/{key}"
        image_id = str(uuid.uuid4())

        table = dynamodb.Table('ModerationLabels')
        try:
            table.put_item(
                Item={
                    'image_id': image_id,
                    's3_url': s3_url,
                    'moderation_labels': None,
                    'moderation_status': 'PENDING_REKOGNITION',
                }
            )
            print("DynamoDB entry created")

            queue_name = 'ImageAnalyze'
            response = sqs.get_queue_url(QueueName=queue_name)
            sqs_url = response['QueueUrl']
            sqs.send_message(
                QueueUrl=sqs_url,
                MessageBody=image_id
            )

        except Exception as e:
            print(e)
