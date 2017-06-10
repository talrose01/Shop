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
    DButilsAzure.getAllMovies(function (result) {
        res.send(result);
    })
});

let categoryIdByName=function(catName){
    return new Promise(function(resolve,reject){
        DButilsAzure.getCategoryId(catName, function (result) {
            resolve(result);
        })
    });
}


let getMoviesInCategories=function(categoryId){
    return new Promise(function(resolve,reject){
        DButilsAzure.getMoviesInCategories(categoryId, function (result) {
            resolve(result);
        })
    });
}
router.post('/getMovieAmount', function(req, res) {
    DButilsAzure.getMovieAmount(req.body.movieId, function (result) {
        res.send(result);
    })
});

router.get('/getTopFive', function(req, res) {
    DButilsAzure.getTopFive( function (result) {
        res.send(result);
    })
});
router.post('/searchMovieByCategory', function(req, res) {
    searching= new Object();
    searching.categoryName=req.body.categoryName;
    searching.categoryValue=req.body.categoryValue;
    DButilsAzure.searchMovieByCategory(searching, function (result) {
        res.send(result);
    })
});

router.post('/getMoviesByCategory', function(req, res) {
    DButilsAzure.getMoviesInCategories(req.body.categoryId, function (result) {
        res.send(result);
    })
});
router.get('/getNewestMovies', function(req, res) {
    DButilsAzure.getNewestMovies(function (result) {
        res.send(result);
    })
});
router.get('/getInventory', function(req, res) {
    DButilsAzure.getInventory(function (result) {
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
    MovieDetails.addedDate=req.body.addedDate;
//add movie to movies
    insertMovie(MovieDetails)
    //get movie id by name
        .then(function(movieIn){
            return new Promise(function(resolve,reject){
                DButilsAzure.getMovieId(MovieDetails.movieName, function (result) {
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
    DButilsAzure.deleteMovie( req.body.movieId, function (result) {
        res.send(result);
    });
});

router.post('/getRecommendedMovies', function(req, res) {
    DButilsAzure.getRecommendedMovies(req.body.UserName, function (result) {
        res.send(result);
    })
});
router.post('/getMovie', function(req, res) {
    DButilsAzure.getMovie(req.body.movieId, function (result) {
        res.send(result);
    })
});
module.exports = router;
