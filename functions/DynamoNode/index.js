var AWS = require('aws-sdk');
var TABLE_NAME = process.env.TABLE_NAME;
console.log(TABLE_NAME)

exports.handler = (event, context) => {
  var dynamodb = new AWS.DynamoDB();
  var params = {
    TableName: TABLE_NAME,
    KeyConditions: {
      'person_id': {
        'ComparisonOperator': 'EQ',
        'AttributeValueList': [{N: '1001'}]
      }
    }
  };
  var ids = [];
  for(var i = 0; i < 100; i++) {
    ids.push(1001);
  }
  console.log(ids);
  Promise.all(ids.map(item => {
    return new Promise((resolve, reject) => {
        dynamodb.query(params, (err, data) => {
          if(err) {
            console.log(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  })).then(_ => {
    console.log('SUCCESS');
    context.done(null, {Status: 'Success'});
  }, err => {
    console.log('FAIL');
    context.fail(err);
  });
};
