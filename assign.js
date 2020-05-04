const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: USERS_TABLE
  }
  var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
var availableBoats = ["1","3","4","5","6","7","8","9","10"]
function assignBoats(){
    dynamoDb.scan(params, (error, result) => {
        if(result.Items.length > availableBoats.length){
            var addVals = availableBoats.length
            while(addVals < result.Items.length){
                availableBoats.push("drew out")
                addVals++
            }
        }
        shuffle(availableBoats)
        for(var i = 0;i < result.Items.length; i++){
            const params = {
                TableName: USERS_TABLE,
                Item: {
                  userId: result.Items[i].userId,
                  name: result.Items[i].name,
                  boat: availableBoats[i]
                },
              };
            
              dynamoDb.put(params, (error) => {
                if (error) {
                  console.log(error);
                  
                }
              });
        }
    })
}


  module.exports.handler = assignBoats