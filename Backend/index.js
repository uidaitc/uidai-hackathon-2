const express=require("express");
// const axios=require("axios")
const mongoose=require("mongoose")
var cors = require('cors')
var allowedOrigins = ['http://localhost:4200','http://localhost:4200/sign-in'];

const app=express();
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const OtpSV=require('./apis/OtpSV')
const generateCaptcha=require('./apis/generateCaptcha')

const dburl='mongodb://localhost:27017/aadhar'

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(client=>{
        console.log('connected to db');
        db=mongoose.connection;
        db=db.collection('aadhar');
        app.locals.databaseObject=db;
    })
    .catch(err=>{
        console.log(err);
    })

app.use('/otp',OtpSV);
app.use('/ekyc',generateCaptcha)

app.listen(3000,()=>{console.log('listening to port 3000');})