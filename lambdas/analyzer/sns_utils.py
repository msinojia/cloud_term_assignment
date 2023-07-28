import boto3


def send_email_notification(sns_topic_arn, subject, message):
    sns = boto3.client('sns', region_name='us-east-1')
    response = sns.publish(
        TopicArn=sns_topic_arn,
        Subject=subject,
        Message=message,
    )
    return response
