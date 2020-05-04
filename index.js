const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');


const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ strict: false }));
const baseURL = 'http://j22.connerfullerton.com.s3-website-us-east-1.amazonaws.com/'
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get User endpoint
app.get('/users', function (req, res) {
  const params = {
    TableName: USERS_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true,
    //   }
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(result)
  });
})

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json(req.body);
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.redirect(baseURL);
  });
})

module.exports.handler = serverless(app);