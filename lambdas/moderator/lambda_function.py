import json
from http import HTTPStatus

import get_image
import mark_status


def lambda_handler(event, context):
    method = event['httpMethod']
    resource = event['resource']

    if method == 'GET' and resource == '/moderate/{image_id}':
        return get_image.handle(event)
    elif method == 'POST' and (resource == '/moderate/safe' or resource == '/moderate/unsafe'):
        return mark_status.handle(event)
    else:
        return {
            'statusCode': HTTPStatus.BAD_REQUEST,
            'body': json.dumps('Invalid path or method')
        }
