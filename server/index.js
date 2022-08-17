const  express = require('express');
const bodyParser = require('body-parser');
const {findObject, createObject, findObjectFromDb} = require('./controller/controller.js');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var path = require("path");
var dir = path.join(__dirname,"./public");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const url = "mongodb+srv://vishal:gAgQIVTrncRD288L@cluster0.vfyry.mongodb.net?retryWrites=true&w=majority";
async function init(){
try{
    const mongoclintInstance = await MongoClient.connect(url, {useNewUrlParser: true});
    console.log("DB connected successfully");
    global.UserDetails = mongoclintInstance.db("testDB").collection("user_details");
  
    let PORT = process.env.PORT || 5001;
    
    
    const  apiRoutes = require('./route/routes.js');
    const app = express();
    app.use(express.urlencoded({ extended: true}));
    app.use(express.json({limit: '50mb'}));
    

    app.use("/api", apiRoutes(app));
    app.use(express.static(dir));

    app.listen(PORT,() => {
        console.log(`Running on PORT ${PORT}`);
    })
}catch(error){
    console.log("error in index ",error);
}
  }
  init();