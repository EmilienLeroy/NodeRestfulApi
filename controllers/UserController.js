let route = require('express').Router();
let User = require('../models/User');
let bodyParser = require('body-parser');

route.use(bodyParser.json());

//post a user 
route.post('/login',(req,res)=>{
    let body_user = req.body;
    User.getUser(body_user, (result)=>{
        res.json(result);
    });
});

//post a user 
route.post('/register',(req,res)=>{
    let body_user = req.body;
    User.addUser(body_user, (err,result)=>{
        res.json(result);
    });
});

module.exports = route;