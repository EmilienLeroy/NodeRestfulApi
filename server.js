let app = require('express')();

app.get('/',(req,res)=>{
    res.send('hello');
})

app.listen(7777);
