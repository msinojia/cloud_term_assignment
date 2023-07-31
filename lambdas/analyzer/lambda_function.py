import boto3

import rekognition_utils
import sns_utils
import dynamodb_utils

# frontend_url = "http://localhost:3000"
sns_topic_name = "ImageModerationAlerts"


def lambda_handler(event, context):
    for record in event['Records']:
        message = record['body']
        image_id = message

        # Fetch the record from DynamoDB using image_id
        image_record = dynamodb_utils.get_dynamodb_entry(image_id)
        if not image_record:
            print(f"No DynamoDB entry found for image_id {image_id}")
            continue
        s3_url = image_record['s3_url']

        # Extract bucket and key from s3_url
        s3_url_parts = s3_url.split('/')
        bucket = s3_url_parts[2].split('.')[0]
        filename = s3_url_parts[3]

        nsfw_response = rekognition_utils.check_image_safety(bucket, filename)

        if nsfw_response['ModerationLabels']:
            subject = "Image needs moderation"
            moderation_url = get_frontend_url() + "/moderate/" + image_id
            message = "Please click the following link to view the image and take action: " + moderation_url
            sns_utils.send_email_notification(sns_topic_name, subject, message)

        status = 'PENDING_MODERATION' if nsfw_response['ModerationLabels'] else 'SAFE_AUTOMATED'
        dynamodb_utils.update_dynamodb_entry(
            image_id, nsfw_response['ModerationLabels'], status)

    return 'Analysis completed.'


def get_frontend_url():
    ssm = boto3.client('ssm', region_name='us-east-1')
    parameter = ssm.get_parameter(Name='FrontendIP', WithDecryption=True)
    return "https://" + parameter['Parameter']['Value'] + ":3000"
