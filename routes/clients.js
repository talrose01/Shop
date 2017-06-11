    var express = require('express');
    var app = express();
    var router = express.Router();
    var Connection= require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    var DButilsAzure = require('../dbUtils');

    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });
    router.post('/', function(req, res, next) {
        res.send('respond with a resource');

    });


    let insertClient=function(registerDetails){
        return new Promise(function(resolve,reject){
            DButilsAzure.InsertClient(registerDetails, function (result) {
                resolve(result);
            })
        });
    }



    router.post('/register', function (req,res) {
        var registerDetails = new Object();
        registerDetails.UserName = req.body.UserName;
        registerDetails.password = req.body.password;
        registerDetails.firstName = req.body.firstName;
        registerDetails.lastName = req.body.lastName;
        registerDetails.adress = req.body.adress;
        registerDetails.city = req.body.city;
        registerDetails.country = req.body.country;
        registerDetails.phone = req.body.phone;
        registerDetails.Mail = req.body.Mail;
        registerDetails.creditCardNumber = req.body.creditCardNumber;
        registerDetails.LastLogin = req.body.LastLogin;
        registerDetails.isAdmin = req.body.isAdmin;
        var categoryDetails = "";


        insertClient(registerDetails)
        .then(function(clientIn){
            return new Promise(function(resolve,reject){
                var QandA = new Object()
                QandA.UserName = req.body.UserName;
                QandA.question1 = req.body.question1;
                QandA.question2 = req.body.question2;
                QandA.answer1 = req.body.answer1;
                QandA.answer2 = req.body.answer2;
                DButilsAzure.InsertQandA(QandA, function (result) {
                    resolve(result);
                });
            });

        })
            .then(function(category){
                categoryDetails =categoryDetails+"('"+req.body.UserName+"',"+req.body.categoryA+","+req.body.categoryB+","+req.body.categoryC+")";
                DButilsAzure.InsertClientCategory(categoryDetails, function (result) {
                    res.send(result);
                });
            })
    });
    router.post('/login', function (req,res){
        var quer="Select UserName from  dbo.Clients WHERE UserName=\'"+req.body.UserName+"\' AND password=\'"+req.body.password +"\'";

        DButilsAzure.select( quer, function (result) {
            res.send(result);
        });
    });
    router.post('/getQuestions', function (req,res){
        var quer="Select question1, question2, answer1, answer2 From QAndA where UserName='"+req.body.UserName+"\'";
        DButilsAzure.select(quer , function (result) {
            res.send(result);
        });
    });
    router.get('/getAllClients', function (req,res){
        var quer="Select * from  dbo.Clients";
        DButilsAzure.select( quer, function (result) {
            res.send(result);
        });
    });


    router.put('/deleteClient', function (req,res){
        var quer="Delete from  dbo.Clients WHERE UserName=\'"+req.body.UserName+"\'";
        DButilsAzure.delet(quer, function (result) {
            res.send(result);
        });
    });

    module.exports = router;


