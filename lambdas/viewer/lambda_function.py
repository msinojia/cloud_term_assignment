import json
import boto3
from boto3.dynamodb.conditions import Key

s3_bucket_name = 'photo-hoster-images'
s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ImageModerationDetails')


def lambda_handler(event, context):
    try:
        # Query DynamoDB for all items where the moderation_status is "SAFE_AUTOMATED" or "SAFE_MANUAL"
        response = table.scan(
            FilterExpression=Key('moderation_status').eq(
                'SAFE_AUTOMATED') | Key('moderation_status').eq('SAFE_MANUAL')
        )

        # Initialize list to hold image data
        images = []

        # Check if the scan returned any items
        if 'Items' in response:
            for item in response['Items']:
                # Generate a presigned URL for the object
                presigned_url = s3_client.generate_presigned_url('get_object',
                                                                 Params={'Bucket': s3_bucket_name,
                                                                         'Key': item['s3_url'].split('/')[-1]},
                                                                 ExpiresIn=3600)

                # Add the object data to the images list
                images.append({
                    'url': presigned_url,
                })

        print("No. of images:", len(images))

        return {
            'statusCode': 200,
            'body': json.dumps(images),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e)),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
        }
