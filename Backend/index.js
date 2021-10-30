const express=require("express");
// const axios=require("axios")
const mongoose=require("mongoose")

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const OtpSV=require('./apis/OtpSV')

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

app.listen(3000,()=>{console.log('listening to port 3000');})