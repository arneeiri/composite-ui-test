var express = require('express');
var fs = require('fs');
var server = express(); // better instead
server.configure(function(){
    server.use(express.bodyParser());

    server.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    });

    server.post('/trip/trip', function(req, res) {
        var save = function() {
            fs.readFile('trip.txt', function(err, trips) {
                if (err){
                    res.send(500);
                    return;
                }
                var parsedTrips = JSON.parse(trips);
                parsedTrips.push(req.body);
                fs.writeFile("trip.txt", JSON.stringify(parsedTrips), function() {
                    res.send(201);
                })
            });
        };
        fs.exists('trip.txt', function (exists) {
            if (!exists){
                fs.writeFile('trip.txt', JSON.stringify([]), function() {
                    save();
                })
            }else {
                save();
            }
        });
    })

    server.get('/trip/trip', function(req, res) {
        res.set('Content-Type', 'text/json');
        fs.exists('trip.txt', function (exists) {
            if (exists) {
                fs.readFile('trip.txt', function(err, trips) {
                    if (err) {
                        res.send(500);
                    } else {
                        res.send(200, trips);
                    }
               });
            } else {
                res.send(200, {});
            }
        });
    });

    server.use('/trip', express.static(__dirname + '/trip'));
    server.use('/expense', express.static(__dirname + '/expense'));
    server.use(express.static(__dirname + '/frontend'));
});

server.listen(3000);