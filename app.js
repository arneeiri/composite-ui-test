var express = require('express');
var server = express(); // better instead
server.configure(function(){
    server.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", req.get('Origin'));
        return next();
    });
    server.use('/trip', express.static(__dirname + '/trip'));
    server.use('/expense', express.static(__dirname + '/expense'));
    server.use(express.static(__dirname + '/frontend'));

});

server.listen(3000);