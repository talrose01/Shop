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

router.get('/getAllMovies', function(req, res) {
    var quer="Select * from  dbo.Movies";

    DButilsAzure.select(quer,function (result) {
        res.send(result);
    })
});

let categoryIdByName=function(catName){
    return new Promise(function(resolve,reject){
        var quer="Select categoryId from  dbo.Categories WHERE categoryName=\'"+catName+"\'";
        DButilsAzure.getCategoryId(quer, function (result) {
            resolve(result[0].categoryId);
        })
    });
}


let getMoviesInCategories=function(categoryId){
    return new Promise(function(resolve,reject){
        var quer="Select * From MoviesCategories AS MC, Movies AS M Where MC.CategoryID="+categoryId+"AND MC.MovieID=M.MovieID";
        DButilsAzure.select(quer, function (result) {
            resolve(result);
        })
    });
}
router.post('/getMovieAmount', function(req, res) {
    var quer="Select stockAmount from  dbo.Movies WHERE movieId=\'"+req.body.movieId+"\'";
    DButilsAzure.select(quer, function (result) {
        res.send(result);
    })
});

router.get('/getTopFive', function(req, res) {
    var quer="Select Top 5 M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath From Movies AS M, MoviesInOrders AS MIO, Orders AS O Where O.orderDate BETWEEN CURRENT_TIMESTAMP-7 AND CURRENT_TIMESTAMP AND M.movieId=MIO.movieId AND MIO.orderId = O.orderId Group By M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath Order by sum(MIO.amount) desc";
    DButilsAzure.select( quer,function (result) {
        res.send(result);
    })
});
router.post('/searchMovieByCategory', function(req, res) {
    var quer="Select * From Movies Where "+req.body.categoryName+"='"+req.body.categoryValue+"\'";
    DButilsAzure.select(quer, function (result) {
        res.send(result);
    })
});

router.post('/getMoviesByCategory', function(req, res) {
    var quer="Select movieId from  dbo.MoviesCategories WHERE categoryId=\'"+req.body.categoryId+"\'";

    DButilsAzure.select(quer, function (result) {
        res.send(result);
    })
});
router.get('/getNewestMovies', function(req, res) {
     var quer="Select * From Movies Where DATEDIFF(day ,addedDate ,CONVERT (date, GETDATE())) <= 30";
 //   var quer="Select * From Movies Where Movies.addedDate BETWEEN CURRENT_TIMESTAMP-30 AND CURRENT_TIMESTAMP";
    DButilsAzure.select(quer,function (result) {
        res.send(result);
    })
});
router.get('/getInventory', function(req, res) {
    var quer="Select movieID,movieName,stockAmount From Movies";
    DButilsAzure.select(quer,function (result) {
        res.send(result);
    })
});

router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

let insertMovie=function(MovieDetails){
    return new Promise(function(resolve,reject){
        DButilsAzure.InsertMovie(MovieDetails, function (result) {
            resolve(result);
        })
    });
}

router.post('/addMovie', function (req,res) {
    var MovieDetails=new Object();
    MovieDetails.movieName=req.body.movieName;
    MovieDetails.directorId=req.body.directorId;
    MovieDetails.description=req.body.description;
    MovieDetails.price=req.body.price;
    MovieDetails.stockAmount=req.body.stockAmount;
    MovieDetails.publishedYear=req.body.publishedYear;
    MovieDetails.language=req.body.language;
    MovieDetails.picturePath=req.body.picturePath;
    var currentdate= new Date();
    var datetime = currentdate.getDate() + "-"
        + (currentdate.getMonth()+1)  + "-"
        + currentdate.getFullYear() + " 00:00:00.000";
    MovieDetails.addedDate=datetime;
//add movie to movies
    insertMovie(MovieDetails)
    //get movie id by name
        .then(function(movieIn){
            return new Promise(function(resolve,reject){
                var quer="Select movieId from  dbo.Movies WHERE movieName=\'"+MovieDetails.movieName+"\'";
                DButilsAzure.select(quer, function (result) {
                  /*  var rowDetails=new Object();
                    rowDetails.movieId=result[0].movieId;*/
                    resolve(result[0].movieId);
                })
            });
        })
        .then(function(movieId){
            DButilsAzure.InsertMovieCategory(req.body.categoryId,movieId, function (result) {
                res.send(result);
            });
        })
});

router.post('/deleteMovie', function (req,res){
    var quer="Delete From Movies Where Movies.movieId='"+req.body.movieId+"\'" ;
    DButilsAzure.delet( quer, function (result) {
        res.send(result);
    });
});

router.post('/getRecommendedMovies', function(req, res) {

var quer="Select top 3 M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath From  ClientsCategories AS CC, MoviesCategories AS MC, MoviesInOrders AS MIO, Movies AS M Where MIO.movieId = M.movieId AND MIO.movieId = MC.movieId AND M.movieId = MC.movieId AND CC.UserName ='"+req.body.UserName+"' AND (CC.category1 = MC.categoryId OR CC.category2 = MC.categoryId OR CC.category3 = MC.categoryId) AND M.movieId NOT IN (Select MIO.movieId From Orders AS O, MoviesInOrders AS MIO, MoviesCategories AS MC Where O.UserName ='"+req.body.UserName+"' AND O.orderId = MIO.orderId) Group By M.movieID,M.movieName,directorId,description,price,stockAmount,publishedYear,language,picturePath Having SUM(MIO.amount) >= ALL(SELECT SUM(MIO.amount) From MoviesInOrders AS MIO Where MIO.movieId = M.movieId Group By MIO.movieId)"
   DButilsAzure.select(quer, function (result) {
        res.send(result);
    })
});
router.post('/getMovie', function(req, res) {
    var quer="Select * from  dbo.Movies WHERE movieId=\'"+req.body.movieId+"\'";
    DButilsAzure.select(quer, function (result) {
        res.send(result);
    })
});
module.exports = router;
