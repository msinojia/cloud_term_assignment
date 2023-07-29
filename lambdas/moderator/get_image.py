import json
from http import HTTPStatus
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ImageModerationDetails')
s3_bucket_name = 'photo-hoster-images'
s3_client = boto3.client('s3')


def handle(event):
    image_id = event['pathParameters']['image_id']
    response = table.get_item(Key={'image_id': image_id})

    if 'Item' in response:
        presigned_url = s3_client.generate_presigned_url('get_object',
                                                         Params={'Bucket': s3_bucket_name,
                                                                 'Key': response['Item']['s3_url'].split('/')[-1]},
                                                         ExpiresIn=3600)
        response['Item']['s3_url'] = presigned_url
        return {
            'statusCode': HTTPStatus.OK,
            'body': json.dumps(response['Item']),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
        }
    else:
        return {
            'statusCode': HTTPStatus.NOT_FOUND,
            'body': json.dumps('Image not found'),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
        }


def create_presigned_url(bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return None

    # The response contains the presigned URL
    return response
