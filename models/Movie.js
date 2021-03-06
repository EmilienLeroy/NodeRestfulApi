//Load Module
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create Movie Schema
var MovieSchema = new Schema({
    title : String,
    abstract : String
},
{
     collection : 'Movie' 
}); 

//Export the Movie model
let Movie = module.exports = mongoose.model('Movie', MovieSchema);

//Function for get all movies
module.exports.getMovie = (callback, limit) => {
	Movie.find(callback).limit(limit);
};
//Function to add a movie
module.exports.addMovie = (movie, callback) => {
	Movie.create(movie, callback);
};
//Function to update a movie
module.exports.updateMovie = (id, movie, options, callback) => {
    let query = {_id: id};
    let update = {
        title : movie.title
    };
    Movie.findOneAndUpdate(query,update,options,callback)
};

module.exports.removeMovie = (id, callback) => {
    let query = {_id: id};
    Movie.remove(query,callback);
};