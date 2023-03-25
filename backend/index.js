const express = require('express')
const app = express()
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const port = 5000
const uri = "mongodb://darshantest:darshantest123@ac-yp0ldsx-shard-00-00.pcogn2d.mongodb.net:27017,ac-yp0ldsx-shard-00-01.pcogn2d.mongodb.net:27017,ac-yp0ldsx-shard-00-02.pcogn2d.mongodb.net:27017/db_food?ssl=true&replicaSet=atlas-bm48q2-shard-0&authSource=admin&retryWrites=true&w=majority"

// const uri = "mongodb+srv://darshantest:darshantest123@cluster0.pcogn2d.mongodb.net/db_food?retryWrites=true&w=majority"
// const databasename = "db_food";
//MongoClient.connect(uri).then((client) => {
//  console.log("Connected to MongoDB");
/* const connect = client.db(databasename);
 
 // Connect to collection
 const collection = connect
     .collection("fooditems");
 
 collection.find({}).toArray().then((ans) => {
     console.log(ans);
 });*/
//}).catch((err) => {

// Printing the error message
//  console.log(err.Message);
//})

mongoose.connect(uri, { useNewUrlParser: true }).then((client) => {
    console.log(`Connected to MongoDB`);
    const connect = mongoose.connection;
    const food_items_data = connect.collection("fooditems");
    const food_category_data = connect.collection("foodCategory");
    food_items_data.find({}).toArray().then((ans) => {
        food_category_data.find({}).toArray().then((ans1) => {
            global.fooditems = ans;
            global.food_category_data = ans1;
        })
    })
    /*function (err, data) {
         if (data)
         { 
            console.log(data);
         }
         else{ 
            console.log(err);
         }
     })
*/
}).catch((err) => {
    console.log(err)
})

// const mongoD = require('./db');
// mongoD();

/* async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
         const fetch_data = await mongoose.connection.db.collection("foodCategory");
        fetch_data.find({}).toArray( function (err, data) {
             if (err) console.log(err);
             else console.log(data);
         })
     }

     catch (err) {
         console.error(err)
     }
}

 connect();
 */



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
    res.send(`hello world`)
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

app.listen(port, () => {
    console.log(`example app listening port ${port}`)
})