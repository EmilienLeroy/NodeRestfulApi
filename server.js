//Load Module
let app = require('express')();
let mongoose = require('mongoose');
const port = 7777;
let MovieController = require('./controllers/MovieController');
let UserController = require('./controllers/UserController');

//Configure bodyParser and Mongoose
mongoose.connect('mongodb://localhost/Movie');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/Movie', MovieController);

app.use('/api/User', UserController);

//Listen the port 7777
app.listen(port);
