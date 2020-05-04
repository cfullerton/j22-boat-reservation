const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: USERS_TABLE
  }
function deleteAll(){
    dynamoDb.scan(params, (error, result) => {
        for(var i = 0;i < result.Items.length; i++){
          var delParams = {
              TableName: USERS_TABLE,
              Key: {
                "userId": result.Items[i].userId
              },
            };
            dynamoDb.delete(delParams,function(res) {
                console.log(res)
              })
        }
    })
}


  module.exports.handler = deleteAll