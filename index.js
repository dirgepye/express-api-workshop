var express = require('express');
var bodyParser = require('body-parser');

var db = require('mysql');
var connection = db.createConnection({
    user: 'dirgepye',
    host: '127.0.0.1',
    database: 'addressbook'
});

var app = express();
app.use(bodyParser.json());

app.use(function(request, response, next) {
    request.accountId = 1;
    next();
});


app.get('/AddressBook/:id', function(request, response) {

    connection.query('SELECT * FROM AddressBook WHERE id =' + request.params.id + ' and accountId =' + request.accountId, function(err, res) {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else if (res.length === 0 ) {
             response.send("404 Not Authorized");
        }
        else {
            response.send(res);
        }
    });
    //connection.end();
    //res.send("afewafwe");
});




// app.get('...


var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
