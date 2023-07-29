import boto3
import json

table_name = "ImageModerationDetails"

def get_dynamodb_entry(image_id):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(table_name)
    response = table.get_item(Key={'image_id': image_id})
    return response.get('Item')


def update_dynamodb_entry(image_id, moderation_labels, status):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(table_name)

    table.update_item(
        Key={
            'image_id': image_id
        },
        UpdateExpression='SET moderation_labels = :val1, moderation_status = :val2',
        ExpressionAttributeValues={
            ':val1': json.dumps(moderation_labels) if moderation_labels else None,
            ':val2': status
        }
    )
