
const mongoose = require("mongoose");
const mongood = require('mongodb').MongoClient;
const uri = 'mongodb://darshantest:darshantest123@ac-yp0ldsx-shard-00-00.pcogn2d.mongodb.net:27017,ac-yp0ldsx-shard-00-01.pcogn2d.mongodb.net:27017,ac-yp0ldsx-shard-00-02.pcogn2d.mongodb.net:27017/?ssl=true&replicaSet=atlas-bm48q2-shard-0&authSource=admin&retryWrites=true&w=majority';
const databasename = "db_food";

mongood.connect(uri).then((client) => {
   console.log("Connected to MongoDB");
   /* const connect = client.db(databasename);
  
    // Connect to collection
    const collection = connect
        .collection("fooditems");
  
    collection.find({}).toArray().then((ans) => {
        console.log(ans);
    });*/
}).catch((err) => {
  
    // Printing the error message
    console.log(err.Message);
})


module.exports = mongood;