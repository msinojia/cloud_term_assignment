import boto3
import json


# def send_email_notification(sns_topic_arn, subject, message):
#     sns = boto3.client('sns', region_name='us-east-1')
#     response = sns.publish(
#         TopicArn=sns_topic_arn,
#         Subject=subject,
#         Message=message,
#     )
#     return response


def send_email_notification(sns_topic_name, subject, message):
    sns = boto3.client('sns', region_name='us-east-1')
    sns_response = sns.create_topic(Name=sns_topic_name)
    sns_topic_arn = sns_response['TopicArn']
    response = sns.publish(
        TopicArn=sns_topic_arn,
        Subject=subject,
        Message=message,
    )
    return response
