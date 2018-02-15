//Load Module
let app = require('express')();
let mongoose = require('mongoose');
const port = 7777;
let MovieController = require('./controllers/MovieController');

//Configure bodyParser and Mongoose
mongoose.connect('mongodb://localhost/Movie');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/Movie', MovieController);

//Listen the port 7777
app.listen(port);
