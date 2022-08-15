import express from 'express';
import bodyParser from 'body-parser';

import {findObject, createObject, findObjectFromDb} from './controller/controller.js';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const url = "mongodb+srv://vishal:gAgQIVTrncRD288L@cluster0.vfyry.mongodb.net?retryWrites=true&w=majority";
//const url = "mongodb://localhost:27017"
async function init(){
try{
    const mongoclintInstance = await MongoClient.connect(url, {useNewUrlParser: true});
    console.log("DB connected successfully");
    global.UserDetails = mongoclintInstance.db("testDB").collection("user_details");
  
    let PORT = process.env.PORT || 5000;
    const app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.get('/',(req,res) => {
        res.send('GeeksforGeeks');
    })

    app.post('/createObject', createObject)

    app.post('/findObject', findObject);
    app.get('/findObjectFromDb', findObjectFromDb)

    app.listen(PORT,() => {
        console.log(`Running on PORT ${PORT}`);
    })
}catch(error){
    console.log("error in index ",error);
}
  }
  init();