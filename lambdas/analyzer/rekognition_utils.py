import boto3


def check_image_safety(bucket, key):
    client = boto3.client('rekognition', region_name='us-east-1')

    response = client.detect_moderation_labels(
        Image={
            'S3Object': {
                'Bucket': bucket,
                'Name': key,
            }
        },
        MinConfidence=50
    )

    return response
