# -*- coding: utf-8 -*-

from boto3.dynamodb.conditions import Key, Attr
import boto3
import logging
import os

logger = logging.getLogger(__name__)
TABLE_NAME = os.environ.get('TABLE_NAME')

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(TABLE_NAME)
    for i in xrange(100):
        ret = table.query(
            KeyConditionExpression = Key('person_id').eq(1001),
        )
    return {'Status': 'Success'}
