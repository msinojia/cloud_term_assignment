import json
from http import HTTPStatus
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ModerationLabels')


def handle(event):
    image_id = json.loads(event['body'])['image_id']
    resource = event['resource']

    if resource == '/moderate/safe':
        status = 'SAFE_MANUAL'
    elif resource == '/moderate/unsafe':
        status = 'UNSAFE_MANUAL'
    else:
        return {
            'statusCode': HTTPStatus.BAD_REQUEST,
            'body': json.dumps('Invalid path'),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
        }

    response = table.update_item(
        Key={'image_id': image_id},
        UpdateExpression='SET moderation_status = :val',
        ExpressionAttributeValues={':val': status},
    )

    return {
        'statusCode': HTTPStatus.OK,
        'body': json.dumps(f'Image marked as {status}'),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
    }
