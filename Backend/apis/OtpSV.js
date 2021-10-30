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
            if(body.status.status=="Y"){
                res.send('Otp Sent');
            }
            else{
                res.send('please enter valid aadhar number!')
            }
        })
        .catch(err=>{
            res.send('there was some error please try again later');
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
            if(body.data.status=='y'){
                res.send('otp verified successfully');
            }
            else{
                res.send('otp verification failed!')
            }
        })
        .catch(err=>{
            res.send('there was some error please try again later');
        })
})


module.exports = OtpSVRoute;

