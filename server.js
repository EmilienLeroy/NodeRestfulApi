//Load Module
let app = require('express')();
let mongoose = require('mongoose');
let Movie = require('./models/Movie');
let bodyParser = require('body-parser');
const port = 7777;

//Configure bodyParser and Mongoose
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/Movie');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Get all the Movie
app.get('/api/Movie',(req,res)=>{
    Movie.getMovie((err,result)=>{
        res.json(result);
    });
});

//post a movie 
app.post('/api/Movie',(req,res)=>{
    var body_movie = req.body;
    Movie.addMovie(body_movie, (err,result)=>{
        res.json(result);
    })
});

//Listen the port 7777
app.listen(port);
