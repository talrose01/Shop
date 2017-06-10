        /**
         * Created by TAL on 05/06/2017.
         */
        var express = require('express');
        var moment = require('moment');
        var app = express();
        var router = express.Router();
        var Connection= require('tedious').Connection;
        var Request = require('tedious').Request;
        var TYPES = require('tedious').TYPES;
        var config={
            userName:'tal',
            password:'HilaHila1',
            server:'talhila.database.windows.net',
            requestTimeout:30000,
            options:{encrypt: true, database:'talHila' }
        }
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if(err){

                console.error('error connecting: '+ err.stack);
                return;
            }
            console.log('connected azure')
        });


        exports.InsertClient= function(object, callback){
            var req= new Request("INSERT INTO dbo.Clients  VALUES (@UserName,@password,@firstName,@lastName,@adress,@city,@country,@phone,@Mail,@creditCardNumber,@LastLogin,@isAdmin)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            req.addParameter('UserName',TYPES.VarChar,object.UserName);
            req.addParameter('password',TYPES.VarChar,object.password);
             req.addParameter('firstName',TYPES.VarChar,object.firstName);
            req.addParameter('lastName',TYPES.VarChar,object.lastName);
            req.addParameter('adress',TYPES.VarChar,object.adress);
            req.addParameter('city',TYPES.VarChar,object.city);
            req.addParameter('country',TYPES.VarChar,object.country);
            req.addParameter('phone',TYPES.VarChar,object.phone);
            req.addParameter('Mail',TYPES.VarChar,object.Mail);
            req.addParameter('creditCardNumber',TYPES.VarChar,object.creditCardNumber);
            req.addParameter('LastLogin',TYPES.VarChar,object.LastLogin);
            req.addParameter('isAdmin',TYPES.Int,object.isAdmin);



            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };

        exports.login= function(object, callback){
            var quer="Select UserName from  dbo.Clients WHERE UserName=\'"+object.UserName+"\' AND password=\'"+object.password +"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
         columns.forEach(function(column){
             if(column.colName!= null)
                 properties.push(column.colName)
         });
            });

            req.on('row', function (row) {
                var item={};
        for(i=0;i<row.length;i++){
            item[properties[i]]=row[i].value;
        }
        res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
               callback(res);

            });
            connection.execSql(req);
        };
        exports.getMovieId= function(object, callback){
            var quer="Select movieId from  dbo.Movies WHERE movieName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        exports.InsertMovie= function(object, callback){
            var req= new Request("INSERT INTO dbo.Movies  VALUES (@movieName,@directorId,@description,@price,@stockAmount, @publishedYear,@language,@picturePath,@addedDate)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
           /* req.addParameter('movieId',TYPES.Int,object.movieId);*/
             req.addParameter('movieName',TYPES.VarChar,object.movieName);
            req.addParameter('directorId',TYPES.Int,object.directorId);
            req.addParameter('description',TYPES.VarChar,object.description);
            req.addParameter('price',TYPES.Float,object.price);
            req.addParameter('stockAmount',TYPES.Int,object.stockAmount);
            req.addParameter('publishedYear',TYPES.VarChar,object.publishedYear);
            req.addParameter('language',TYPES.VarChar,object.language);
            req.addParameter('picturePath',TYPES.VarChar,object.picturePath);
            req.addParameter('addedDate',TYPES.DateTime2,object.addedDate);

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };

        exports.InsertToCart= function(object, callback){
            var quer="Select from  dbo.MoviesInCarts WHERE UserName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };
        exports.InsertToCart= function(object, callback){
            var quer="Select from  dbo.MoviesInCarts WHERE UserName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };

        exports.InsertOrder= function(object, callback){
            var req= new Request("INSERT INTO dbo.Orders  VALUES (@UserName,@orderDate,@shipmentDate,@Dollar,@totalPrice)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            /* req.addParameter('orderId',TYPES.Int,object.orderId);*/
            req.addParameter('UserName',TYPES.VarChar,object.UserName);
            var orderDate= moment().format('YYYY-MM-DD');
            req.addParameter('orderDate',TYPES.DateTime2,object.orderDate);
            var shipmentDate= moment().format('YYYY-MM-DD');
            req.addParameter('shipmentDate',TYPES.DateTime2,object.shipmentDate);
            req.addParameter('Dollar',TYPES.Float,object.Dollar);
            req.addParameter('totalPrice',TYPES.Float,object.totalPrice);
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };


        exports.InsertCategory= function(object, callback){
            var req= new Request("INSERT INTO dbo.Categories  VALUES (@categoryName)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
           /* req.addParameter('categoryId',TYPES.Int,object.categoryId);*/
            req.addParameter('categoryName',TYPES.VarChar,object.categoryName);
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };

        exports.InsertQandA= function(object, callback){
            var req= new Request("INSERT INTO dbo.QAndA  VALUES (@UserName,@question1,@question2,@answer1,@answer2)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            /* req.addParameter('categoryId',TYPES.Int,object.categoryId);*/
            req.addParameter('UserName',TYPES.VarChar,object.UserName);
            req.addParameter('question1',TYPES.VarChar,object.question1);
            req.addParameter('question2',TYPES.VarChar,object.question2);
            req.addParameter('answer1',TYPES.VarChar,object.answer1);
            req.addParameter('answer2',TYPES.VarChar,object.answer2);


            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };


        exports.InsertDirector= function(object, callback){
            var req= new Request("INSERT INTO dbo.Directors  VALUES (@firstName,@lastName)",function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
/*            req.addParameter('directorId',TYPES.NvarChar,object.directorId);*/
            req.addParameter('firstName',TYPES.VarChar,object.firstName);
            req.addParameter('lastName',TYPES.VarChar,object.lastName);

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };


        exports.getAllMovies= function(callback){
            var quer="Select * from  dbo.Movies";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        exports.getTopFive= function(callback){
            var quer="Select Top 5 M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath From Movies AS M, MoviesInOrders AS MIO, Orders AS O Where O.orderDate BETWEEN CURRENT_TIMESTAMP-7 AND CURRENT_TIMESTAMP AND M.movieId=MIO.movieId AND MIO.orderId = O.orderId Group By M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath Order by sum(MIO.amount) desc";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };

        exports.getMoviesByCategory= function(object, callback){
            var quer="Select from  dbo.MoviesInCarts WHERE category=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };

        exports.InsertMovieCategory= function(categoryId,object, callback){
            var quer="INSERT INTO dbo.MoviesCategories  VALUES (@movieId,@categoryId)";
            var req= new Request(quer,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
             req.addParameter('movieId',TYPES.Int,object);
            req.addParameter('categoryId',TYPES.Int,categoryId);

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };


        exports.getCategoryId= function(object, callback){
            var quer="Select categoryId from  dbo.Categories WHERE categoryName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res[0].categoryId);
                callback(res[0].categoryId);

            });
            connection.execSql(req);
        };

        exports.getMoviesInCategories= function(object, callback){

            var quer="Select * From MoviesCategories AS MC, Movies AS M Where MC.CategoryID="+object+"AND MC.MovieID=M.MovieID";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };





        exports.returnMoviesOfCat= function(object, callback){
            var quer="Select from  dbo.MoviesCategories WHERE categoryId=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };


        exports.getAllMovies= function(callback){
            var quer="Select * from  dbo.Movies";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };


        exports.deleteClient= function(object, callback){
            var quer="Delete from  dbo.Clients WHERE UserName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });


            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                 });
            connection.execSql(req);
        };

//getOrderId
        /*SELECT TOP 1 *
        FROM table
        ORDER
        BY Id DESC;*/
        exports.getOrderId= function( callback){
            var quer="Select top 1 orderId from  dbo.Orders order by orderId desc";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };

        exports.insertListOfMovies= function(object, callback){
            var quer="INSERT INTO dbo.MoviesInOrders (orderId,movieId,amount) VALUES "+ object;
            var req= new Request(quer,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };

        exports.getMovieAmount= function(object, callback){
            var quer="Select stockAmount from  dbo.Movies WHERE movieId=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //updateStockAmount
        exports.updateStockAmount= function(object, callback){
                      var req= new Request(object ,function(err,rowCount){
                          if(err){
                              console.log(err);
                              callback('false')
                          }
                          else{
                              callback('true')
                          }
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);

            });
            connection.execSql(req);
        };

        exports.getQuestions= function(object, callback){
            var quer="Select question1, question2, answer1, answer2 From QAndA where UserName='ya'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                callback(res);

            });
            connection.execSql(req);
        };

        exports.searchMovieByCategory= function(object, callback){

            var quer="Select * From Movies Where "+object.categoryName+"='"+object.categoryValue+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //getNewestMovies
        exports.getNewestMovies= function(callback){

            var quer="Select * From Movies Where Movies.addedDate BETWEEN CURRENT_TIMESTAMP-30 AND CURRENT_TIMESTAMP";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        exports.getInventory= function(callback){

            var quer="Select movieID,movieName,stockAmount From Movies";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //InsertClientCategory
        exports.InsertClientCategory= function(object,callback){
            // (UserName,category1,category2,category3)
            var quer="INSERT INTO dbo.ClientsCategories VALUES "+ object;
            var req= new Request(quer,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };
        //
        //
/*        exports.deleteUser= function(object,callback){
            // (UserName,category1,category2,category3)
            var quer="Delete From Clients Where Clients.UserName='"+object+"\'" ;
            var req= new Request(quer,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };*/
        exports.deleteMovie= function(object,callback){
            // (UserName,category1,category2,category3)
            var quer="Delete From Movies Where Movies.movieId='"+object+"\'" ;
            var req= new Request(quer,function(err,rowCount){
                if(err){
                    console.log(err);
                    callback('false')
                }
                else{
                    callback('true')
                }
            });
            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
            });
            connection.execSql(req);
        };



        exports.getLastOrder= function(callback){
            var quer="SELECT TOP 1 * FROM dbo.Orders  ORDER BY orderId DESC";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };


        exports.getPreviousOrders= function(object,callback){
            var quer="SELECT * FROM dbo.Orders Where UserName='"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //getRecommendedProduct
        exports.getRecommendedMovies= function(object,callback){
            var quer="Select top 2 MC.movieId, SUM(MIO.amount)  From  ClientsCategories AS CC, MoviesCategories AS MC, MoviesInOrders AS MIO Where MIO.movieId = MC.movieId AND CC.UserName = '"+object+"' AND (CC.category1 = MC.categoryId OR CC.category2 = MC.categoryId OR CC.category3 = MC.categoryId) AND MC.movieId NOT IN (Select MIO.movieId From Orders AS O, MoviesInOrders AS MIO, MoviesCategories AS MC Where O.UserName ='"+object+"' AND O.orderId = MIO.orderId) Group By MC.movieId Having SUM(MIO.amount) >= ALL(SELECT SUM(MIO.amount) From MoviesInOrders AS MIO Where MIO.movieId = MC.movieId Group By MIO.movieId)";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        exports.getMovie= function(object,callback){
            var quer="Select * from  dbo.Movies WHERE movieId=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //getOrder
        exports.getOrder= function(object,callback){
            var quer="Select * from  dbo.Orders WHERE orderId=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        exports.getOrdersOfUser= function(object,callback){
            var quer="Select * from  dbo.Orders WHERE UserName=\'"+object+"\'";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //getAllClients
        exports.getAllClients= function(callback){
            var quer="Select * from  dbo.Clients";
            var req= new Request(quer ,function(err,rowCount){
            });
            var res= [];
            var properties=[];

            req.on('columnMetadata', function (columns) {
                columns.forEach(function(column){
                    if(column.colName!= null)
                        properties.push(column.colName)
                });
            });

            req.on('row', function (row) {
                var item={};
                for(i=0;i<row.length;i++){
                    item[properties[i]]=row[i].value;
                }
                res.push(item);
            });

            req.on('requestCompleted', function () {
                console.log('requestCompleted with' + req.rowCount +' rows ');
                console.log(res);
                callback(res);

            });
            connection.execSql(req);
        };
        //isAdmin