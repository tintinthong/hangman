let PORT = process.env.PORT || 4000;
let express = require('express');
let app= express();

let http= require('http');
let server= http.Server(app);

app.use(express.static('client'));


app.get('/',function(req,res){

})


server.listen(PORT, function(){
    console.log('server is listening on port'+ PORT);
})

