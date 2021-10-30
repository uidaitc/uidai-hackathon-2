const uuid=require('uuid')
const exp=require('express');
const axios=require('axios')
const mongoose = require('mongoose');

var OtpSVRoute=exp.Router();



OtpSVRoute.post('/send',(req,res)=>{
    const txn=uuid.v4();
    req.app.locals.TXN=txn;
    reqBody={
        "uid":req.body.uid,
        "txnId":txn
    }
    console.log(req.body);
    url='https://stage1.uidai.gov.in/onlineekyc/getOtp/';
    console.log(reqBody);
    axios.post(url,reqBody)
        .then(body=>{
            console.log(body.data)
            res.send('sent')
        })
        .catch(err=>{
            console.log(err);
        })
})

OtpSVRoute.post('/verify',(req,res)=>{
    const rtxn=req.app.locals.TXN
    const reqBody={
        "uid":req.body.uid,
        "txnId":rtxn,
        "otp":req.body.otp
    }
    console.log(reqBody);
    url='https://stage1.uidai.gov.in/onlineekyc/getAuth/'
    axios.post(url,reqBody)
        .then(body=>{
            console.log(body.data);
            res.send('authorized');
        })
        .catch(err=>{
            console.log(err);
        })
})


module.exports = OtpSVRoute;

