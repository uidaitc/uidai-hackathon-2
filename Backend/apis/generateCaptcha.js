const axios=require('axios');
const express=require('express');
const b642i=require('base64-to-image')
const uuid=require('uuid');
const fs=require('fs');
const unzipper=require('unzipper')
const parseString=require('xml2js').parseString

generateCaptchaRoute=express.Router();

generateCaptchaRoute.get('/generateCaptcha',(req,res)=>{
    const reqBody={
        "langCode": "en",
        "captchaLength": "3",
        "captchaType": "2"
    }
    url='https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha';
    axios.post(url,reqBody)
        .then(msg=>{
            // console.log(msg.data);
            b64s=msg.data.captchaBase64String;
            b64s='data:image/png;base64,'+b64s
            dest='temp/'
            imName=msg.data.captchaTxnId
            req.app.locals.CTXNID=imName
            opt={
                'fileName':imName,
                'type':'png'
            }
            info=b642i(b64s,dest,opt)
            res.send('sent')
        })
        .catch(err=>{
            console.log(err);
            res.send('err')
        })
       
})

generateCaptchaRoute.post('/verify',(req,res)=>{
    captchaTxnId=req.app.locals.CTXNID
    reqObj={
        "uidNumber":req.body.uid,
        "captchaTxnId":captchaTxnId,
        "captchaValue":req.body.captchaValue,
        "transactionId":'MYAADHAAR:'+uuid.v4()
    }
    url='https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp'
    axios.post(url,reqObj)
        .then(msg=>{
            console.log(msg.data);
            req.app.locals.txnId=msg.data.txnId;
        })
        .catch(err=>{
            console.log(err);
        })
    res.send('completed')
})

generateCaptchaRoute.post('/verifyOtp',(req,res)=>{
    txnId=req.app.locals.txnId;
    reqBody={
        "txnNumber": txnId,
        "otp":req.body.otp, 
        "shareCode": req.body.sharecode, 
        "uid": req.body.uid
    }
    console.log(reqBody);
    url='https://stage1.uidai.gov.in/eAadhaarService/api/downloadOfflineEkyc'
    axios.post(url,reqBody)
        .then(msg=>{
            console.log(msg.data);
            var b64=msg.data.eKycXML;
            fileName=msg.data.fileName
            req.app.locals.fileName=fileName
            let buff=new Buffer(b64,'base64');
            fs.writeFileSync('temp/zipFiles/'+fileName,buff);
        })
        .catch(err=>{
            console.log(err)
            res.send('err')
        })
        res.send('verification end')
})








module.exports=generateCaptchaRoute;