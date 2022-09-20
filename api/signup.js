const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const signup = express.Router();
const connection=require('../dbconnection')

signup.use(flash());
signup.use(bodyParser.json());
signup.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


signup.post('/insert', function(req, res) {
console.log('working')
    var FirstName= req.body.FirstName;
    var LastName=req.body.LastName;
    var Age=req.body.Age;
    var Gender=req.body.Gender;
    var Location=req.body.Location;
    var PhoneNo=req.body.PhoneNo;
    var Email=req.body.Email;
    var Eac=req.body.Eac;
    var Pincode=req.body.Pincode;
    var Subject=req.body.Subject;
    var Data=req.body.Data;
    var Type=req.body.Type;
    var Password=req.body.Password;
    var About=req.body.About;

    var sql = `INSERT INTO  bliluserprofile.blilusersignupdata (FirstName,LastName,Age,Gender,Location,PhoneNo,Email,Eac,Pincode,Subject,Data,Type,Password,About) VALUES 
     ("${FirstName}","${LastName}","${Age}","${Gender}","${Location}","${PhoneNo}","${Email}","${Eac}","${Pincode}","${Subject}","${Data}","${Type}","${Password}","${About}")`;
   // console.log(sql)
   connection.query(sql, function(err, result){
    if(!err) { 
      var data=JSON.parse(JSON.stringify(result));
      console.log(data)
      res.status(200).json({ data:data, 
        message:"Data posted" })
       console.log('Post is working');
     }else{
      res.status(400).json({
        message:err
       })
     }
    });
    });


//Read

signup.get('/read',  (req, res)=> {
  console.log('working')
    connection.query('SELECT * FROM bliluserprofile.blilusersignupdata;', function (err, results, fields) {
     if(!err) { 
      var data=JSON.parse(JSON.stringify(results));
      var obtaindata =data
      console.log(obtaindata)
      res.status(200).json({data:obtaindata ,
       message :" All Data" })
       console.log('Get is working');
     }else{
      res.status(400).json({
        message:err
       })
     }
   });
  });

  //update

  signup.put('/put',  (req, res)=> {
    connection.query('UPDATE `blilusersignupdata` SET `FirstName`=?,`LastName`=?,`Age`=?,`Gender`=?,`Location`=?,`PhoneNo`=?,`Eac`=?,`Pincode`=?,`Subject`=?,`Data`=?,`Type`=?,`Password`=?,`About`=? where `Email`=?',
     [ req.body.FirstName,req.body.LastName,req.body.Age,req.body.Gender,req.body.Location,req.body.PhoneNo,req.body.Eac,req.body.Pincode,req.body.Subject,req.body.Data,req.body.Type,req.body.Password,req.body.About,req.body.Email], 
     (err, results, fields) =>{
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var updatedata =data
        console.log(updatedata)
        res.status(200).json({data:updatedata ,
           message:"Data Updated" })
         console.log('Data is updated');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
  });
  
  //Delete

  signup.delete('/delete', (req, res)=> {
    connection.query('DELETE FROM `blilusersignupdata` WHERE `Email`=?', [req.body.Email], function (err, results, fields) {
       if (!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var deletedata =data
        console.log(deletedata)
        res.status(200).json({data:deletedata ,
           message:"Data Deleted"})
         console.log('Data is Deleted');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
  });



//login post api

signup.post('/verify',  (req, res)=> {

    var mail=req.body.Email;
    var password=req.body.Password;

    var sql="SELECT Password FROM blilusersignupdata WHERE Email='"+mail+"'" ;

    connection.query(sql, function(err, result){
     if(!err){
       var data=JSON.parse(JSON.stringify(result));
       var obtainPassword=data[0].Password
       console.log(obtainPassword)
       if(password === obtainPassword ){
         console.log('Logged in successfully');
         res.status(200).json({
          message:" login successfull"
        })
       }else{
        res.status(400).json({
         message:"Login failed, Incorrect Password",
        })
        console.log('Login failed, Incorrect Password');
       }
       }
    });
  });

//filter data by type=blilmanager

  signup.get('/getbytype',  (req, res)=> {
    console.log('working')
      connection.query('SELECT * FROM bliluserprofile.blilusersignupdata WHERE Type ="blilmanager";', function (err, results, fields) {
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var obtaindata =data
        console.log(obtaindata)
        res.status(200).json({data:obtaindata ,
         message :" Type Data" })
         console.log('Get is working');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
    });



module.exports=signup