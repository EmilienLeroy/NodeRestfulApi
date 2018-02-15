let route = require('express').Router();
let Movie = require('../models/Movie');
let bodyParser = require('body-parser');

route.use(bodyParser.json());

//Get all the Movie
route.get('/',(req,res)=>{
    Movie.getMovie((err,result)=>{
        res.json(result);
    });
});

//post a movie 
route.post('/',(req,res)=>{
    let body_movie = req.body;
    Movie.addMovie(body_movie, (err,result)=>{
        res.json(result);
    });
});

//put a movie
route.put('/:_id',(req,res)=>{
    let id = req.params._id;
    let body_movie = req.body;
    let options = {};
    Movie.updateMovie(id,body_movie,options,(err,result)=>{
        res.json(result);
    });
});

//delete a movie
route.delete('/:_id',(req,res)=>{
    let id = req.params._id;
    let body_movie = req.body;
    let options = {};
    Movie.removeMovie(id,(err,result)=>{
        res.json(result);
    });
});

module.exports = route;
